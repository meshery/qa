# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth/passkey-registration.spec.ts >> passkey registration — canonical host ceremonies >> Enter still submits the password method
- Location: e2e/auth/passkey-registration.spec.ts:250:7

# Error details

```
Error: expect(received).not.toContain(expected) // indexOf

Expected substring: not "passkey_register"
Received string:        "csrf_token=test-csrf-token&passkey_create_data=%7B%22credentialOptions%22%3A%7B%22publicKey%22%3A%7B%22challenge%22%3A%22AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8%22%2C%22rp%22%3A%7B%22id%22%3A%22localhost%22%2C%22name%22%3A%22Layer5+Cloud%22%7D%2C%22user%22%3A%7B%22id%22%3A%22AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%22%2C%22name%22%3A%22%22%2C%22displayName%22%3A%22%22%7D%2C%22pubKeyCredParams%22%3A%5B%7B%22type%22%3A%22public-key%22%2C%22alg%22%3A-7%7D%2C%7B%22type%22%3A%22public-key%22%2C%22alg%22%3A-257%7D%5D%2C%22authenticatorSelection%22%3A%7B%22userVerification%22%3A%22required%22%2C%22residentKey%22%3A%22required%22%7D%2C%22timeout%22%3A60000%2C%22attestation%22%3A%22none%22%7D%7D%2C%22displayNameFieldName%22%3A%22traits.email%22%7D&passkey_register=&traits.name.first_name=Test&traits.name.last_name=User&traits.email=test-user%40layer5.io&password=hunter2-hunter2&method=password"
```

# Page snapshot

```yaml
- main [ref=f2e2]: "**/registered"
```

# Test source

```ts
  173 |     await expect(page.locator("button.passkey-btn")).toBeDisabled();
  174 |     await expect(page.locator("button#submit")).toBeDisabled();
  175 | 
  176 |     stopCapture();
  177 |   });
  178 | 
  179 |   test("trigger runs the spam filter like the password path", async ({ page }) => {
  180 |     const stopCapture = expectNoBrowserKratosRequest(page);
  181 |     const submitLog: SubmitLogEntry[] = [];
  182 | 
  183 |     await page.addInitScript(stubCreate("resolve"));
  184 |     await stubPostAuthLanding(page);
  185 |     await mockApi(page, [
  186 |       ...createAuthFlowHandlers({
  187 |         type: "registration",
  188 |         withPasskeys: true,
  189 |         submitLog,
  190 |         submitSuccessLocation: "/registered",
  191 |         spamFilter: JSON.stringify({
  192 |           blockedDomains: ["spam.example"],
  193 |           blockedNames: []
  194 |         })
  195 |       }),
  196 |       ...createFallbackHandlers()
  197 |     ]);
  198 | 
  199 |     await page.goto("/registration?flow=flow-id-1", { waitUntil: "networkidle" });
  200 |     await page.locator("input[name='traits.name.first_name']").fill("Test");
  201 |     await page.locator("input[name='traits.name.last_name']").fill("User");
  202 |     await page.locator("input[name='traits.email']").fill("test-user@spam.example");
  203 |     await page.locator("input[name='password']").fill("hunter2-hunter2");
  204 | 
  205 |     await page.locator("button.passkey-btn").click();
  206 |     await expect(
  207 |       page.getByText("Invalid email address or domain not allowed.")
  208 |     ).toBeVisible();
  209 | 
  210 |     expect(submitLog).toHaveLength(0);
  211 |     await expect(page).toHaveURL(/\/registration\?flow=flow-id-1$/);
  212 | 
  213 |     stopCapture();
  214 |   });
  215 | 
  216 |   test("a cancelled ceremony submits nothing and leaves the form typed", async ({
  217 |     page
  218 |   }) => {
  219 |     const stopCapture = expectNoBrowserKratosRequest(page);
  220 |     const submitLog: SubmitLogEntry[] = [];
  221 | 
  222 |     await page.addInitScript(stubCreate("cancel"));
  223 |     await stubPostAuthLanding(page);
  224 |     await mockApi(page, [
  225 |       ...createAuthFlowHandlers({
  226 |         type: "registration",
  227 |         withPasskeys: true,
  228 |         submitLog,
  229 |         submitSuccessLocation: "/registered"
  230 |       }),
  231 |       ...createFallbackHandlers()
  232 |     ]);
  233 | 
  234 |     await page.goto("/registration?flow=flow-id-1", { waitUntil: "networkidle" });
  235 |     await fillSignupForm(page);
  236 | 
  237 |     await page.locator("button.passkey-btn").click();
  238 |     await page.waitForTimeout(500);
  239 | 
  240 |     expect(submitLog).toHaveLength(0);
  241 |     await expect(page).toHaveURL(/\/registration\?flow=flow-id-1$/);
  242 |     // Nothing the user typed is lost.
  243 |     await expect(page.locator("input[name='traits.email']")).toHaveValue(
  244 |       "test-user@layer5.io"
  245 |     );
  246 | 
  247 |     stopCapture();
  248 |   });
  249 | 
  250 |   test("Enter still submits the password method", async ({ page }) => {
  251 |     const stopCapture = expectNoBrowserKratosRequest(page);
  252 |     const submitLog: SubmitLogEntry[] = [];
  253 | 
  254 |     await page.addInitScript(stubCreate("resolve"));
  255 |     await stubPostAuthLanding(page);
  256 |     await mockApi(page, [
  257 |       ...createAuthFlowHandlers({
  258 |         type: "registration",
  259 |         withPasskeys: true,
  260 |         submitLog,
  261 |         submitSuccessLocation: "/registered"
  262 |       }),
  263 |       ...createFallbackHandlers()
  264 |     ]);
  265 | 
  266 |     await page.goto("/registration?flow=flow-id-1", { waitUntil: "networkidle" });
  267 |     await fillSignupForm(page);
  268 |     await page.locator("input[name='password']").press("Enter");
  269 |     await page.waitForURL("**/registered");
  270 | 
  271 |     expect(submitLog).toHaveLength(1);
  272 |     expect(submitLog[0].postData ?? "").toContain("method=password");
> 273 |     expect(submitLog[0].postData ?? "").not.toContain("passkey_register");
      |                                             ^ Error: expect(received).not.toContain(expected) // indexOf
  274 | 
  275 |     stopCapture();
  276 |   });
  277 | });
  278 | 
```