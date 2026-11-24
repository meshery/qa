# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth/passkey-settings.spec.ts >> passkey settings — main domain >> lists passkeys with names and dates; one remove disabled
- Location: e2e/auth/passkey-settings.spec.ts:73:9

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
      - paragraph [ref=e59]: Passkeys let you sign in with your device instead of typing a password. Your password still works.
      - form "Authentication form" [ref=e60]:
        - button "Register passkey" [ref=e61]
        - generic [ref=e64]:
          - text: MacBook Pro
          - generic [ref=e65]: Added Nov 10, 2026
          - button "Remove passkey" [ref=e66]
        - generic [ref=e67]:
          - text: iPhone
          - generic [ref=e68]: Added Nov 12, 2026
          - button "Remove passkey" [disabled] [ref=e69]
  - alert [ref=e70]
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import {
  3   |   createAuthFlowHandlers,
  4   |   expectNoBrowserKratosRequest,
  5   |   mockAuthFlowResponse,
  6   |   passkeyRemoveNode,
  7   |   passkeySettingsNodes,
  8   |   stubPostAuthLanding,
  9   |   type AuthFlowNode,
  10  |   type SubmitLogEntry
  11  | } from "../helpers/auth-flow";
  12  | import { createFallbackHandlers, mockApi } from "../helpers/network";
  13  | 
  14  | // passkey-settings.spec.ts covers the /security/passkeys management page
  15  | // (issue #6478, spec §7.4 Tier A — mocked): the settings flow filtered
  16  | // to the `passkey` group lists registered passkeys (display name +
  17  | // added date), offers "Add a passkey", and removes via an in-place
  18  | // submit (`method=passkey` + `passkey_remove=<hex id>`).
  19  | //
  20  | // The custom-domain variant asserts the page's fallback (no list, no
  21  | // trigger) when `passkeysAvailable` is false. Every test asserts the
  22  | // topology invariant: no browser→Kratos request.
  23  | 
  24  | const stubCreate = () =>
  25  |   `
  26  |   const toBuffer = (bytes) => new Uint8Array(bytes).buffer;
  27  |   window.PublicKeyCredential = class {
  28  |     static async isConditionalMediationAvailable() { return false; }
  29  |   };
  30  |   Object.defineProperty(window.navigator, "credentials", {
  31  |     value: {
  32  |       get: async () => { throw new DOMException("Not implemented.", "NotSupportedError"); },
  33  |       create: async () => ({
  34  |         id: "test-credential-id",
  35  |         rawId: toBuffer([1, 2, 3]),
  36  |         type: "public-key",
  37  |         response: {
  38  |           clientDataJSON: toBuffer([4, 5]),
  39  |           attestationObject: toBuffer([6, 7, 8]),
  40  |           getTransports: () => ["internal"]
  41  |         }
  42  |       })
  43  |     },
  44  |     configurable: true
  45  |   });
  46  |   `;
  47  | 
  48  | const submitBodyParam = (body: string, name: string) =>
  49  |   new URLSearchParams(body).get(name);
  50  | 
  51  | // The CSRF node the settings flow carries (group "default", rescued
  52  | // through the filter by the hidden-node rule). Specs that hand-roll a
  53  | // post-submit flow via mockAuthFlowResponse({ nodes }) need it, since a
  54  | // custom node set replaces the defaults.
  55  | const csrfNode: AuthFlowNode = {
  56  |   type: "input",
  57  |   group: "default",
  58  |   attributes: {
  59  |     name: "csrf_token",
  60  |     type: "hidden",
  61  |     value: "test-csrf-token",
  62  |     required: true,
  63  |     disabled: false
  64  |   },
  65  |   messages: [],
  66  |   meta: {}
  67  | };
  68  | 
  69  | for (const variant of ["main domain", "custom-domain org"] as const) {
  70  |   const isCustom = variant === "custom-domain org";
  71  | 
  72  |   test.describe(`passkey settings — ${variant}`, () => {
  73  |     test("lists passkeys with names and dates; one remove disabled", async ({ page }) => {
  74  |       const stopCapture = expectNoBrowserKratosRequest(page);
  75  |       await stubPostAuthLanding(page);
  76  |       await mockApi(page, [
  77  |         ...createAuthFlowHandlers({
  78  |           type: "settings",
  79  |           customDomainOrg: isCustom,
  80  |           withPasskeys: true
  81  |         }),
  82  |         ...createFallbackHandlers()
  83  |       ]);
  84  | 
> 85  |       await page.goto("/security/passkeys?flow=flow-id-1", {
      |                  ^ Error: page.goto: Test timeout of 60000ms exceeded.
  86  |         waitUntil: "networkidle"
  87  |       });
  88  | 
  89  |       if (isCustom) {
  90  |         await expect(page.getByText("Manage your passkeys")).toBeVisible();
  91  |         const manageLink = page.getByRole("link", { name: "Manage passkeys" });
  92  |         await expect(manageLink).toHaveAttribute("href", /\/security\/passkeys$/);
  93  |         await expect(manageLink).not.toHaveAttribute("target", /.*/);
  94  |         await expect(page.locator("button.passkey-btn")).toHaveCount(0);
  95  |         await expect(page.locator("button.passkey-remove-btn")).toHaveCount(0);
  96  |       } else {
  97  |         await expect(page.getByRole("heading", { name: "Passkeys" })).toHaveCount(0);
  98  |         await expect(
  99  |           page.getByText("Passkeys let you sign in with your device")
  100 |         ).toBeVisible();
  101 |         await expect(page.locator(".passkey-row-name").first()).toHaveText("MacBook Pro");
  102 |         await expect(page.locator(".passkey-row")).toHaveCount(2);
  103 |         await expect(page.locator(".passkey-row-added").first()).toContainText("2026");
  104 |         const removeButtons = page.locator("button.passkey-remove-btn");
  105 |         await expect(removeButtons).toHaveCount(2);
  106 |         await expect(removeButtons.nth(0)).toBeEnabled();
  107 |         // The last remaining first-factor credential cannot be removed.
  108 |         await expect(removeButtons.nth(1)).toBeDisabled();
  109 |         await expect(page.locator("button.passkey-btn")).toHaveText(/Register passkey/);
  110 |       }
  111 | 
  112 |       // No password fields anywhere on this page, on either variant.
  113 |       await expect(page.locator("input[name='password']")).toHaveCount(0);
  114 |       await expect(page.getByText("Reset Password")).toHaveCount(0);
  115 | 
  116 |       stopCapture();
  117 |     });
  118 |   });
  119 | }
  120 | 
  121 | test.describe("passkey settings — canonical host actions", () => {
  122 |   test("remove re-renders the list in place instead of landing on the profile", async ({
  123 |     page
  124 |   }) => {
  125 |     const stopCapture = expectNoBrowserKratosRequest(page);
  126 |     const submitLog: SubmitLogEntry[] = [];
  127 |     let submitted = false;
  128 | 
  129 |     // Hand-rolled route (like email-login.spec.ts's error case): the
  130 |     // submit 303s to the settings return URL (…/account/profile), and
  131 |     // the flow Kratos then serves no longer lists the removed passkey.
  132 |     // The page must stay on the list and re-render it (spec §5.6
  133 |     // option b), not follow the profile landing.
  134 |     await stubPostAuthLanding(page);
  135 |     await mockApi(page, createFallbackHandlers());
  136 |     await page.route("**/api/auth/flow**", async route => {
  137 |       const url = new URL(route.request().url());
  138 |       if (url.pathname === "/api/auth/flow" && route.request().method() === "GET") {
  139 |         const body = submitted
  140 |           ? mockAuthFlowResponse({
  141 |               type: "settings",
  142 |               flowId: "flow-id-1",
  143 |               nodes: [
  144 |                 csrfNode,
  145 |                 ...passkeySettingsNodes().filter(
  146 |                   n =>
  147 |                     !(
  148 |                       n.attributes.name === "passkey_remove" &&
  149 |                       n.attributes.value === "a1b2c3d4e5f6"
  150 |                     )
  151 |                 )
  152 |               ]
  153 |             })
  154 |           : mockAuthFlowResponse({
  155 |               type: "settings",
  156 |               flowId: "flow-id-1",
  157 |               withPasskeys: true
  158 |             });
  159 |         return route.fulfill({
  160 |           status: 200,
  161 |           contentType: "application/json",
  162 |           body: JSON.stringify(body)
  163 |         });
  164 |       }
  165 |       if (
  166 |         url.pathname === "/api/auth/flow/submit" &&
  167 |         route.request().method() === "POST"
  168 |       ) {
  169 |         submitLog.push({
  170 |           url: route.request().url(),
  171 |           method: route.request().method(),
  172 |           postData: route.request().postData(),
  173 |           headers: route.request().headers()
  174 |         });
  175 |         submitted = true;
  176 |         return route.fulfill({
  177 |           status: 303,
  178 |           contentType: "text/html",
  179 |           headers: { Location: "/account/profile" },
  180 |           body: ""
  181 |         });
  182 |       }
  183 |       return route.fulfill({ status: 404, body: "" });
  184 |     });
  185 | 
```