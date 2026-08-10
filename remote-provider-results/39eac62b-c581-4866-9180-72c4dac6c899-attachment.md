# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth/email-signup.spec.ts >> email signup — custom-domain org >> captcha required: submit gated until token solved
- Location: e2e/auth/email-signup.spec.ts:159:9

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.waitForURL: Test timeout of 60000ms exceeded.
=========================== logs ===========================
waiting for navigation to "**/registered" until "load"
  navigated to "http://localhost:3000/dashboard"
  navigated to "http://localhost:3000/login"
  navigated to "http://localhost:3000/login"
  navigated to "http://localhost:3000/login"
  navigated to "http://localhost:3000/login?flow=flow-id-1"
============================================================
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e3]:
    - generic [ref=e5]:
      - form "Authentication form" [ref=e6]:
        - heading "Logo" [level=1] [ref=e7]:
          - img "Logo" [ref=e8]
        - generic [ref=e9]: CONTINUE WITH
        - button "github icon Sign up with GitHub" [ref=e11] [cursor=pointer]:
          - img "github icon" [ref=e12]
          - generic [ref=e13]: Sign up with GitHub
        - button "google icon Sign up with Google" [ref=e15] [cursor=pointer]:
          - img "google icon" [ref=e16]
          - generic [ref=e17]: Sign up with Google
        - generic [ref=e18]: OR
        - generic [ref=e19]:
          - link "LOGIN" [ref=e20] [cursor=pointer]:
            - /url: /login
          - link "SIGN UP" [ref=e21] [cursor=pointer]:
            - /url: /registration
        - generic [ref=e22]:
          - textbox "First Name" [ref=e23]
          - generic: First Name
        - generic [ref=e25]:
          - textbox "Last Name" [ref=e26]
          - generic: Last Name
        - generic [ref=e28]:
          - textbox "E-Mail" [ref=e29]
          - generic: E-Mail
        - generic [ref=e31]:
          - textbox "Password" [ref=e32]
          - generic: Password
          - button "Show password" [ref=e33] [cursor=pointer]:
            - img [ref=e34]
        - button "Sign up" [ref=e36] [cursor=pointer]
        - paragraph [ref=e37]:
          - text: By signing in, you agree to the
          - link "terms of use" [ref=e38] [cursor=pointer]:
            - /url: /legal/terms-of-service.html
          - text: ","
          - link "privacy policy" [ref=e39] [cursor=pointer]:
            - /url: /legal/privacy-policy.html
          - text: ", and use of cookies."
      - generic [ref=e40]:
        - link "Forgot Password?" [ref=e41] [cursor=pointer]:
          - /url: /recovery
        - link "Resend Verification Email" [ref=e42] [cursor=pointer]:
          - /url: /verification
    - generic [ref=e44]:
      - generic [ref=e45]:
        - img "Acme Workbench" [ref=e46]
        - heading "Acme Workbench" [level=3] [ref=e47]
        - paragraph [ref=e48]: Build, ship, and observe your service mesh.
      - list [ref=e49]:
        - listitem [ref=e50]:
          - button "Go to slide 1" [ref=e51] [cursor=pointer]
        - listitem [ref=e52]:
          - button "Go to slide 2" [ref=e53] [cursor=pointer]
  - alert [ref=e54]
```

# Test source

```ts
  112 | 
  113 |     test("blocked spam domain: blocked client-side, no submit", async ({ page }) => {
  114 |       const submitLog: SubmitLogEntry[] = [];
  115 | 
  116 |       // The spamFilter helper option threads a JSON-encoded
  117 |       // blockedDomains/blockedNames bag into FlowConfig.spamFilter
  118 |       // (mirrors server/handlers/auth_flow.go::buildFlowConfig). The
  119 |       // React side parses it inside registration.tsx::
  120 |       // validateRegistration and rejects the matching submission
  121 |       // before reaching the cloud proxy.
  122 |       await stubPostAuthLanding(page);
  123 |       await mockApi(page, [
  124 |         ...createAuthFlowHandlers({
  125 |           type: "registration",
  126 |           customDomainOrg: isCustom,
  127 |           submitLog,
  128 |           spamFilter: JSON.stringify({
  129 |             blockedDomains: ["spam.example"],
  130 |             blockedNames: []
  131 |           })
  132 |         }),
  133 |         ...createFallbackHandlers()
  134 |       ]);
  135 | 
  136 |       await page.goto("/registration?flow=flow-id-1", {
  137 |         waitUntil: "networkidle"
  138 |       });
  139 | 
  140 |       await page.locator("input[name='traits.name.first_name']").fill("Eve");
  141 |       await page.locator("input[name='traits.name.last_name']").fill("Doe");
  142 |       await page.locator("input[name='traits.email']").fill("eve@spam.example");
  143 |       await page.locator("input[name='password']").fill("password");
  144 |       // Click the rendered submit button instead of programmatic
  145 |       // form.submit(). Native click fires React's onSubmit handler,
  146 |       // which is the actual code path that invokes
  147 |       // validateRegistration. form.submit() bypasses React entirely
  148 |       // and lets the form post — the test would pass for the wrong
  149 |       // reason (the proxy 303s to /registered) and miss a regression
  150 |       // that drops the React onSubmit hook.
  151 |       await page.locator("button#submit").click();
  152 | 
  153 |       await expect(page.locator("#traits\\.email-error")).toContainText(
  154 |         /invalid email address or domain not allowed/i
  155 |       );
  156 |       expect(submitLog).toHaveLength(0);
  157 |     });
  158 | 
  159 |     test("captcha required: submit gated until token solved", async ({ page }) => {
  160 |       const submitLog: SubmitLogEntry[] = [];
  161 |       await stubPostAuthLanding(page);
  162 |       // Stub Google's reCAPTCHA script. The Recaptcha component injects
  163 |       // <script src="https://www.google.com/recaptcha/api.js"> via next/script;
  164 |       // left un-stubbed, that outbound request never settles behind CI's
  165 |       // egress firewall, so `waitUntil: "networkidle"` below hangs until the
  166 |       // test times out. The widget itself isn't exercised — the test drives the
  167 |       // solved state through window.onRecaptchaComplete, which the component
  168 |       // wires up independently of Google's script — so an empty body is enough.
  169 |       await page.route("https://www.google.com/recaptcha/**", route =>
  170 |         route.fulfill({ status: 200, contentType: "application/javascript", body: "" })
  171 |       );
  172 |       await mockApi(page, [
  173 |         ...createAuthFlowHandlers({
  174 |           type: "registration",
  175 |           customDomainOrg: isCustom,
  176 |           submitLog,
  177 |           recaptchaSiteKey: "fake-site-key"
  178 |         }),
  179 |         ...createFallbackHandlers()
  180 |       ]);
  181 | 
  182 |       await page.goto("/registration?flow=flow-id-1", {
  183 |         waitUntil: "networkidle"
  184 |       });
  185 | 
  186 |       await page.locator("input[name='traits.name.first_name']").fill("Alice");
  187 |       await page.locator("input[name='traits.name.last_name']").fill("Smith");
  188 |       await page.locator("input[name='traits.email']").fill("alice@example.com");
  189 |       await page.locator("input[name='password']").fill("password");
  190 | 
  191 |       // The legacy template disabled the password-method button until
  192 |       // the captcha solved; KratosNode propagates this via
  193 |       // forceSubmitDisabled. Assert the button is disabled before
  194 |       // solving.
  195 |       const submitBtn = page.locator("button#submit");
  196 |       await expect(submitBtn).toBeDisabled();
  197 | 
  198 |       // Simulate Google calling our window.onRecaptchaComplete.
  199 |       await page.evaluate(() => {
  200 |         const w = window as unknown as {
  201 |           onRecaptchaComplete?: (t: string) => void;
  202 |         };
  203 |         w.onRecaptchaComplete?.("token-abc");
  204 |       });
  205 | 
  206 |       // After the captcha resolves, submit becomes enabled and a
  207 |       // click drives the form to the cloud proxy with
  208 |       // transient_payload set to the JSON Kratos's verifier expects.
  209 |       await expect(submitBtn).toBeEnabled();
  210 |       await submitBtn.click();
  211 | 
> 212 |       await page.waitForURL("**/registered");
      |                  ^ Error: page.waitForURL: Test timeout of 60000ms exceeded.
  213 | 
  214 |       expect(submitLog).toHaveLength(1);
  215 |       const body = submitLog[0].postData ?? "";
  216 |       // transient_payload's wire shape is {"recaptcha_token":"<token>"}.
  217 |       // Server-side ValidateSignupRequest reads this exact key — see
  218 |       // server/handlers/users.go.
  219 |       expect(body).toContain(
  220 |         "transient_payload=" +
  221 |           encodeURIComponent(JSON.stringify({ recaptcha_token: "token-abc" }))
  222 |       );
  223 |     });
  224 |   });
  225 | }
  226 | 
```