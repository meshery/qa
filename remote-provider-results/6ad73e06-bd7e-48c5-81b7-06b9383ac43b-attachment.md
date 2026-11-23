# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth/passkey-settings.spec.ts >> passkey settings — canonical host actions >> remove re-renders the list in place instead of landing on the profile
- Location: e2e/auth/passkey-settings.spec.ts:126:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.goto: Test timeout of 60000ms exceeded.
Call log:
  - navigating to "http://localhost:3000/security/passkeys?flow=flow-id-1", waiting until "networkidle"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e7]:
        - link [ref=e9] [cursor=pointer]:
          - /url: /
          - paragraph [ref=e10]:
            - img "logo" [ref=e12]
        - generic [ref=e15] [cursor=pointer]
        - button "Login" [ref=e27] [cursor=pointer]
    - generic [ref=e29]:
      - heading [level=1]
      - tablist "scrollable auto tabs example" [ref=e32]:
        - tab "Overview" [ref=e33] [cursor=pointer]
        - tab "Tokens" [disabled] [ref=e40]
        - tab "Sessions" [disabled] [ref=e43]
        - tab "Credentials" [disabled] [ref=e47]
        - tab "Keys" [ref=e50] [cursor=pointer]
        - tab "Keychains" [disabled] [ref=e53]
    - generic [ref=e58]:
      - heading "Passkeys" [level=2] [ref=e59]
      - paragraph [ref=e60]: Passkeys let you sign in with your device instead of typing a password. Your password still works — adding a passkey never removes it, and a passkey is an alternative way to sign in, not a replacement for your password.
      - form "Authentication form" [ref=e61]:
        - button "Register passkey" [ref=e62]
        - generic [ref=e65]:
          - text: MacBook Pro
          - generic [ref=e66]: Added Nov 10, 2026
          - button "Remove passkey" [ref=e67]
        - generic [ref=e68]:
          - text: iPhone
          - generic [ref=e69]: Added Nov 12, 2026
          - button "Remove passkey" [disabled] [ref=e70]
  - alert [ref=e71]
```

# Test source

```ts
  90  | 
  91  |       if (isCustom) {
  92  |         await expect(
  93  |           page.getByText(/Passkeys aren't available here/)
  94  |         ).toBeVisible();
  95  |         await expect(page.locator("button.passkey-btn")).toHaveCount(0);
  96  |         await expect(page.locator("button.passkey-remove-btn")).toHaveCount(0);
  97  |       } else {
  98  |         await expect(page.getByRole("heading", { name: "Passkeys" })).toBeVisible();
  99  |         await expect(page.locator(".passkey-row-name").first()).toHaveText(
  100 |           "MacBook Pro"
  101 |         );
  102 |         await expect(page.locator(".passkey-row")).toHaveCount(2);
  103 |         await expect(page.locator(".passkey-row-added").first()).toContainText(
  104 |           "2026"
  105 |         );
  106 |         const removeButtons = page.locator("button.passkey-remove-btn");
  107 |         await expect(removeButtons).toHaveCount(2);
  108 |         await expect(removeButtons.nth(0)).toBeEnabled();
  109 |         // The last remaining first-factor credential cannot be removed.
  110 |         await expect(removeButtons.nth(1)).toBeDisabled();
  111 |         await expect(page.locator("button.passkey-btn")).toHaveText(
  112 |           /Register passkey/
  113 |         );
  114 |       }
  115 | 
  116 |       // No password fields anywhere on this page, on either variant.
  117 |       await expect(page.locator("input[name='password']")).toHaveCount(0);
  118 |       await expect(page.getByText("Reset Password")).toHaveCount(0);
  119 | 
  120 |       stopCapture();
  121 |     });
  122 |   });
  123 | }
  124 | 
  125 | test.describe("passkey settings — canonical host actions", () => {
  126 |   test("remove re-renders the list in place instead of landing on the profile", async ({
  127 |     page
  128 |   }) => {
  129 |     const stopCapture = expectNoBrowserKratosRequest(page);
  130 |     const submitLog: SubmitLogEntry[] = [];
  131 |     let submitted = false;
  132 | 
  133 |     // Hand-rolled route (like email-login.spec.ts's error case): the
  134 |     // submit 303s to the settings return URL (…/account/profile), and
  135 |     // the flow Kratos then serves no longer lists the removed passkey.
  136 |     // The page must stay on the list and re-render it (spec §5.6
  137 |     // option b), not follow the profile landing.
  138 |     await stubPostAuthLanding(page);
  139 |     await mockApi(page, createFallbackHandlers());
  140 |     await page.route("**/api/auth/flow**", async route => {
  141 |       const url = new URL(route.request().url());
  142 |       if (url.pathname === "/api/auth/flow" && route.request().method() === "GET") {
  143 |         const body = submitted
  144 |           ? mockAuthFlowResponse({
  145 |               type: "settings",
  146 |               flowId: "flow-id-1",
  147 |               nodes: [
  148 |                 csrfNode,
  149 |                 ...passkeySettingsNodes().filter(
  150 |                   n =>
  151 |                     !(
  152 |                       n.attributes.name === "passkey_remove" &&
  153 |                       n.attributes.value === "a1b2c3d4e5f6"
  154 |                     )
  155 |                 )
  156 |               ]
  157 |             })
  158 |           : mockAuthFlowResponse({
  159 |               type: "settings",
  160 |               flowId: "flow-id-1",
  161 |               withPasskeys: true
  162 |             });
  163 |         return route.fulfill({
  164 |           status: 200,
  165 |           contentType: "application/json",
  166 |           body: JSON.stringify(body)
  167 |         });
  168 |       }
  169 |       if (
  170 |         url.pathname === "/api/auth/flow/submit" &&
  171 |         route.request().method() === "POST"
  172 |       ) {
  173 |         submitLog.push({
  174 |           url: route.request().url(),
  175 |           method: route.request().method(),
  176 |           postData: route.request().postData(),
  177 |           headers: route.request().headers()
  178 |         });
  179 |         submitted = true;
  180 |         return route.fulfill({
  181 |           status: 303,
  182 |           contentType: "text/html",
  183 |           headers: { Location: "/account/profile" },
  184 |           body: ""
  185 |         });
  186 |       }
  187 |       return route.fulfill({ status: 404, body: "" });
  188 |     });
  189 | 
> 190 |     await page.goto("/security/passkeys?flow=flow-id-1", {
      |                ^ Error: page.goto: Test timeout of 60000ms exceeded.
  191 |       waitUntil: "networkidle"
  192 |     });
  193 | 
  194 |     await page.locator("button.passkey-remove-btn").first().click();
  195 | 
  196 |     // Still on the passkey list — not on /account/profile — with the
  197 |     // removed credential gone from the re-rendered list.
  198 |     await expect(page).toHaveURL(/\/security\/passkeys\?flow=flow-id-1$/);
  199 |     await expect(page.locator(".passkey-row")).toHaveCount(1);
  200 |     await expect(page.locator(".passkey-row-name")).toHaveText("iPhone");
  201 |     await expect(page.getByText("MacBook Pro")).toHaveCount(0);
  202 | 
  203 |     expect(submitLog).toHaveLength(1);
  204 |     const body = submitLog[0].postData ?? "";
  205 |     expect(body).toContain("method=passkey");
  206 |     expect(submitBodyParam(body, "passkey_remove")).toBe("a1b2c3d4e5f6");
  207 |     expect(body).toContain("csrf_token=test-csrf-token");
  208 |     expect(submitLog[0].url).toMatch(
  209 |       /\/api\/auth\/flow\/submit\?type=settings&id=flow-id-1$/
  210 |     );
  211 | 
  212 |     stopCapture();
  213 |   });
  214 | 
  215 |   test("a failed remove stays on the passkey list with the error", async ({
  216 |     page
  217 |   }) => {
  218 |     const stopCapture = expectNoBrowserKratosRequest(page);
  219 |     const submitLog: SubmitLogEntry[] = [];
  220 |     const errorMessage = "The passkey could not be removed.";
  221 | 
  222 |     await stubPostAuthLanding(page);
  223 |     await mockApi(page, [
  224 |       ...createAuthFlowHandlers({
  225 |         type: "settings",
  226 |         withPasskeys: true,
  227 |         submitLog,
  228 |         submitErrorFlow: mockAuthFlowResponse({
  229 |           type: "settings",
  230 |           withPasskeys: true,
  231 |           messages: [{ id: 4000001, text: errorMessage, type: "error" }]
  232 |         }),
  233 |         // Kratos's settings ui_url is /reset, not this page.
  234 |         submitErrorPath: "reset"
  235 |       }),
  236 |       ...createFallbackHandlers()
  237 |     ]);
  238 | 
  239 |     await page.goto("/security/passkeys?flow=flow-id-1", {
  240 |       waitUntil: "networkidle"
  241 |     });
  242 | 
  243 |     await page.locator("button.passkey-remove-btn").first().click();
  244 | 
  245 |     // Still on the passkey list — not bounced to /reset — with the
  246 |     // flow's error message rendered in place.
  247 |     await expect(page).toHaveURL(/\/security\/passkeys\?flow=flow-id-1$/);
  248 |     await expect(page.getByText(errorMessage)).toBeVisible();
  249 |     expect(submitLog).toHaveLength(1);
  250 | 
  251 |     stopCapture();
  252 |   });
  253 | 
  254 |   test("add-a-passkey re-renders the list in place with the new credential", async ({
  255 |     page
  256 |   }) => {
  257 |     const stopCapture = expectNoBrowserKratosRequest(page);
  258 |     const submitLog: SubmitLogEntry[] = [];
  259 |     let submitted = false;
  260 | 
  261 |     await page.addInitScript(stubCreate());
  262 |     await stubPostAuthLanding(page);
  263 |     await mockApi(page, createFallbackHandlers());
  264 |     await page.route("**/api/auth/flow**", async route => {
  265 |       const url = new URL(route.request().url());
  266 |       if (url.pathname === "/api/auth/flow" && route.request().method() === "GET") {
  267 |         const body = submitted
  268 |           ? mockAuthFlowResponse({
  269 |               type: "settings",
  270 |               flowId: "flow-id-1",
  271 |               nodes: [
  272 |                 csrfNode,
  273 |                 ...passkeySettingsNodes(),
  274 |                 passkeyRemoveNode(
  275 |                   "Security Key",
  276 |                   "2026-11-19T10:00:00Z",
  277 |                   "beefcafe1234",
  278 |                   false
  279 |                 )
  280 |               ]
  281 |             })
  282 |           : mockAuthFlowResponse({
  283 |               type: "settings",
  284 |               flowId: "flow-id-1",
  285 |               withPasskeys: true
  286 |             });
  287 |         return route.fulfill({
  288 |           status: 200,
  289 |           contentType: "application/json",
  290 |           body: JSON.stringify(body)
```