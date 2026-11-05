# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth/signup-quick-wins.spec.ts >> shorter sign-up >> tenant host: verification and check-email pages carry no Layer5 or Meshery text
- Location: e2e/auth/signup-quick-wins.spec.ts:258:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.goto: Test timeout of 60000ms exceeded.
Call log:
  - navigating to "http://localhost:3000/registered?signed_in=1", waiting until "networkidle"

```

# Page snapshot

```yaml
- generic [active] [ref=f2e1]:
  - main [ref=f2e3]:
    - generic [ref=f2e4]:
      - heading "Check your email" [level=2] [ref=f2e5]
      - paragraph [ref=f2e6]: We sent a verification link to the email address you signed up with. You're signed in. Open the link to verify your email, and we'll take you back to where you started.
      - generic [ref=f2e7]:
        - link "Resend email" [ref=f2e8] [cursor=pointer]:
          - /url: /verification
        - link "Sign out and use a different email" [ref=f2e10] [cursor=pointer]:
          - /url: /logout
    - generic [ref=f2e12]:
      - generic [ref=f2e13]:
        - img "Collaborative Design" [ref=f2e14]
        - heading "Collaborative Design" [level=3] [ref=f2e15]
        - paragraph [ref=f2e16]: GitOps with teammates is more fun (and productive). Merge, clone, deploy and publish your designs.
      - list [ref=f2e17]:
        - listitem [ref=f2e18]:
          - button "Go to slide 1" [ref=f2e19] [cursor=pointer]
        - listitem [ref=f2e20]:
          - button "Go to slide 2" [ref=f2e21] [cursor=pointer]
        - listitem [ref=f2e22]:
          - button "Go to slide 3" [ref=f2e23] [cursor=pointer]
  - alert [ref=f2e24]
```

# Test source

```ts
  179 |           nodes: [csrf()],
  180 |           continueTo: "/verified?return_to=%2Fcatalog%3Fx%3D1"
  181 |         })
  182 |       }),
  183 |       ...createFallbackHandlers()
  184 |     ]);
  185 | 
  186 |     await page.goto(`/verification?flow=${VERIFY_FLOW}`);
  187 | 
  188 |     await page.waitForURL("**/verified?return_to=%2Fcatalog%3Fx%3D1");
  189 |     await expect(page.getByTestId("verified-landing")).toBeVisible();
  190 | 
  191 |     expect(submitLog).toHaveLength(1);
  192 |     const body = submitLog[0].postData ?? "";
  193 |     expect(body).toContain(`code=${CODE}`);
  194 |     expect(body).toContain("method=code");
  195 |     expect(body).not.toContain("email=");
  196 |     expect(submitLog[0].url).toMatch(
  197 |       new RegExp(`/api/auth/flow/submit\\?type=verification&id=${VERIFY_FLOW}$`)
  198 |     );
  199 | 
  200 |     stopCapture();
  201 |   });
  202 | 
  203 |   test("a rejected code is shown, not resubmitted", async ({ page }) => {
  204 |     const submitLog: SubmitLogEntry[] = [];
  205 |     await mockApi(page, [
  206 |       ...createAuthFlowHandlers({
  207 |         type: "verification",
  208 |         flowId: VERIFY_FLOW,
  209 |         state: "sent_email",
  210 |         nodes: sentEmailNodes(CODE),
  211 |         messages: [
  212 |           {
  213 |             id: 4070006,
  214 |             text: "The verification code is invalid or has already been used.",
  215 |             type: "error"
  216 |           }
  217 |         ],
  218 |         submitLog
  219 |       }),
  220 |       ...createFallbackHandlers()
  221 |     ]);
  222 | 
  223 |     await page.goto(`/verification?flow=${VERIFY_FLOW}`, { waitUntil: "networkidle" });
  224 |     await expect(page.getByText(/invalid or has already been used/)).toBeVisible();
  225 |     await expect(page.locator("input[name='code']")).toBeVisible();
  226 |     expect(submitLog).toHaveLength(0);
  227 |   });
  228 | 
  229 |   test("a social sign-up arrives verified and lands in the product", async ({ page }) => {
  230 |     const submitLog: SubmitLogEntry[] = [];
  231 |     // Kratos lands the OIDC registration on /registered; the identity's
  232 |     // address is verified (the claim mapper's verified_addresses), so
  233 |     // HandleRegistered sends it straight on to the dashboard rather than
  234 |     // "check your email". The fixture collapses that server hop into the
  235 |     // submit's landing; the server half is pinned by
  236 |     // TestHandleRegistered_SignedInVerifiedGoesToDashboard and the mapper
  237 |     // drift test in install/environment.
  238 |     await mockApi(page, [
  239 |       ...createAuthFlowHandlers({
  240 |         type: "registration",
  241 |         submitLog,
  242 |         submitSuccessLocation: "/dashboard"
  243 |       }),
  244 |       ...createFallbackHandlers()
  245 |     ]);
  246 | 
  247 |     await page.goto("/registration?flow=flow-id-1", { waitUntil: "networkidle" });
  248 |     await page.getByRole("button", { name: /sign up with github/i }).click();
  249 | 
  250 |     await page.waitForURL("**/dashboard");
  251 |     expect(page.url()).not.toContain("/registered");
  252 |     expect(submitLog).toHaveLength(1);
  253 |     expect(submitLog[0].postData).toContain("provider=github");
  254 |   });
  255 | 
  256 |   // A visitor signing up on a tenant host sees that organization's brand,
  257 |   // never the Provider's (#6248 follows the tenant-branding requirement).
  258 |   test("tenant host: verification and check-email pages carry no Layer5 or Meshery text", async ({
  259 |     page
  260 |   }) => {
  261 |     await mockApi(page, [
  262 |       ...createAuthFlowHandlers({
  263 |         type: "verification",
  264 |         flowId: VERIFY_FLOW,
  265 |         state: "sent_email",
  266 |         nodes: sentEmailNodes(CODE),
  267 |         customDomainOrg: true,
  268 |         messages: [
  269 |           { id: 4070006, text: "The verification code is invalid.", type: "error" }
  270 |         ]
  271 |       }),
  272 |       ...createFallbackHandlers()
  273 |     ]);
  274 | 
  275 |     await page.goto(`/verification?flow=${VERIFY_FLOW}`, { waitUntil: "networkidle" });
  276 |     await expect(page.locator("input[name='code']")).toBeVisible();
  277 |     await expect(page.locator("body")).not.toContainText(/layer5|meshery/i);
  278 | 
> 279 |     await page.goto("/registered?signed_in=1", { waitUntil: "networkidle" });
      |                ^ Error: page.goto: Test timeout of 60000ms exceeded.
  280 |     await expect(page.getByRole("heading", { name: "Check your email" })).toBeVisible();
  281 |     await expect(page.locator("body")).not.toContainText(/layer5|meshery/i);
  282 |   });
  283 | });
  284 | 
```