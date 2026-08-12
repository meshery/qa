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
============================================================
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e7]:
        - link [ref=e9] [cursor=pointer]:
          - /url: /
          - paragraph [ref=e10]:
            - img [ref=e12]
        - img [ref=e16] [cursor=pointer]
        - button [ref=e27] [cursor=pointer]: Login
    - generic [ref=e31]:
      - generic [ref=e34]:
        - generic [ref=e35]:
          - img [ref=e36]
          - generic [ref=e39]: GETTING STARTED
        - generic [ref=e40]:
          - paragraph [ref=e41]: New here? Follow along these guided tasks to help you get the most of your account.
          - paragraph [ref=e42]:
            - generic [ref=e45]: 0%
          - button [ref=e47] [cursor=pointer]: Start
      - generic [ref=e51]:
        - generic [ref=e52]:
          - img [ref=e53]
          - generic [ref=e55]: LEARN BY VIDEO
        - generic [ref=e56]:
          - paragraph [ref=e57]: From Whiteboard to Workload. Give your brain a break from YAML. Watch Layer5 tools in-action.
          - button [ref=e59] [cursor=pointer]: Watch
      - generic [ref=e62]:
        - generic [ref=e63]:
          - img [ref=e64]
          - heading [level=6] [ref=e89]: CLOUD NATIVE PLAYGROUND
        - generic [ref=e90]:
          - paragraph [ref=e91]: Explore visual and collaborative infrastructure as code in the Meshery playground.
          - button [ref=e93] [cursor=pointer]: Request Access
      - generic [ref=e95]:
        - generic [ref=e96]:
          - generic [ref=e97]:
            - img [ref=e98]
            - generic [ref=e107]: CATALOG DESIGNS
          - generic [ref=e109]:
            - heading [level=2] [ref=e110]: "0"
            - paragraph [ref=e111]: Designs
        - link [ref=e113] [cursor=pointer]:
          - /url: /catalog
          - button [ref=e114]: See All
      - generic [ref=e117]:
        - generic [ref=e118]:
          - img [ref=e119]
          - heading [level=6] [ref=e123]: HELP CENTER
        - list [ref=e125]:
          - listitem [ref=e126]:
            - img [ref=e128]
            - link [ref=e137] [cursor=pointer]:
              - /url: /academy
              - text: Academy
            - superscript [ref=e138]:
              - img [ref=e139]
          - listitem [ref=e141]:
            - img [ref=e143]
            - link [ref=e152] [cursor=pointer]:
              - /url: https://docs.layer5.io/
              - text: Docs
            - superscript [ref=e153]:
              - img [ref=e154]
          - listitem [ref=e156]:
            - img [ref=e158]
            - link [ref=e167] [cursor=pointer]:
              - /url: https://docs.layer5.io/videos
              - text: Learn by Video
            - superscript [ref=e168]:
              - img [ref=e169]
          - listitem [ref=e171]:
            - img [ref=e173]
            - link [ref=e182] [cursor=pointer]:
              - /url: /support
              - text: Support Request
          - listitem [ref=e183]:
            - img [ref=e185]
            - link [ref=e194] [cursor=pointer]:
              - /url: https://discuss.meshery.io
              - text: Discussion Forum
            - superscript [ref=e195]:
              - img [ref=e196]
          - listitem [ref=e198]:
            - img [ref=e200]
            - link [ref=e209] [cursor=pointer]:
              - /url: https://slack.layer5.io
              - text: Slack
            - superscript [ref=e210]:
              - img [ref=e211]
          - listitem [ref=e213]:
            - img [ref=e215]
            - link [ref=e224] [cursor=pointer]:
              - /url: https://calendar.google.com/calendar/appointments/schedules/AcZssZ3pmcApaDP4xd8hvG5fy8ylxuFxD3akIRc5vpWJ60q-HemQi80SFFAVftbiIsq9pgiA2o8yvU56?gv=true
              - text: Meet with Team Member
            - superscript [ref=e225]:
              - img [ref=e226]
      - generic [ref=e230]:
        - generic [ref=e231]:
          - img [ref=e232]
          - generic [ref=e234]: RECOGNITION
        - generic [ref=e235]:
          - paragraph [ref=e236]: Find your latest badges here as they are awarded.
          - generic [ref=e238]:
            - text: Learn more about the
            - link [ref=e239] [cursor=pointer]:
              - /url: https://badges.layer5.io
              - text: recognition program
            - superscript [ref=e240]:
              - img [ref=e241]
            - text: and how you can earn badges.
          - link [ref=e244] [cursor=pointer]:
            - /url: /user/undefined?tab=badges
            - text: See All
  - alert [ref=e245]
  - dialog [active] [ref=e248]:
    - generic [ref=e249]:
      - generic [ref=e250]: Where do you want to start?
      - button [ref=e252] [cursor=pointer]:
        - img [ref=e253]
    - generic [ref=e257]:
      - generic [ref=e259] [cursor=pointer]:
        - img "Visualize your cluster in browser" [ref=e261]
        - paragraph [ref=e262]: Visualize your cluster in browser
      - generic [ref=e264] [cursor=pointer]:
        - img "Invite a friend to collaborate" [ref=e266]
        - paragraph [ref=e267]: Invite a friend to collaborate
      - generic [ref=e269] [cursor=pointer]:
        - img "Create a design" [ref=e271]
        - paragraph [ref=e272]: Create a design
      - generic [ref=e274] [cursor=pointer]:
        - img "Visualize your code on GitHub" [ref=e276]
        - paragraph [ref=e277]: Visualize your code on GitHub
    - generic [ref=e280] [cursor=pointer]:
      - generic [ref=e281]:
        - checkbox "Do not display again" [ref=e282]
        - img [ref=e283]
      - generic [ref=e285]: Do not display again
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