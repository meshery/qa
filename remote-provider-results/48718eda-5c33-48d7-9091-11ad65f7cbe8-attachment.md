# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth/passkey-login.spec.ts >> passkey login — custom-domain org >> renders the passkey button with conditional-UI autocomplete
- Location: e2e/auth/passkey-login.spec.ts:82:9

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('input[name=\'identifier\']')
Expected: "username"
Received: "username webauthn"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" locator('input[name=\'identifier\']') with timeout 10000ms
  - waiting for locator('input[name=\'identifier\']')
    24 × locator resolved to <input value="" required="" type="email" id="identifier" class="validate" name="identifier" autocomplete="username webauthn"/>
       - unexpected value "username webauthn"

```

```yaml
- textbox "E-Mail"
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import {
  3   |   createAuthFlowHandlers,
  4   |   expectNoBrowserKratosRequest,
  5   |   mockAuthFlowResponse,
  6   |   stubPostAuthLanding,
  7   |   type SubmitLogEntry
  8   | } from "../helpers/auth-flow";
  9   | import { createFallbackHandlers, mockApi } from "../helpers/network";
  10  | 
  11  | // passkey-login.spec.ts covers the WebAuthn passkey login path from the
  12  | // React page's perspective (issue #6478, spec §7.4 Tier A — mocked).
  13  | //
  14  | //   * canonical host: the "Sign in with passkey" button renders, the
  15  | //     identifier carries `autocomplete="username webauthn"`, and the
  16  | //     button + conditional-UI ceremonies submit `method=passkey` +
  17  | //     `passkey_login=<assertion JSON>` to /api/auth/flow/submit.
  18  | //   * custom-domain org (`passkeysAvailable: false`): no passkey button,
  19  | //     identifier autocomplete stays "username", password + OIDC
  20  | //     unchanged.
  21  | //
  22  | // `navigator.credentials` is stubbed per test (the real ceremony needs
  23  | // a platform authenticator — that is the live tier,
  24  | // passkey-live.spec.ts). Every test asserts the topology invariant: no
  25  | // browser→Kratos request, and the only auth POST target is the submit
  26  | // proxy.
  27  | 
  28  | const FAKE_ASSERTION = {
  29  |   id: "test-credential-id",
  30  |   rawId: [1, 2, 3],
  31  |   type: "public-key",
  32  |   response: {
  33  |     clientDataJSON: [4, 5],
  34  |     authenticatorData: [6, 7, 8],
  35  |     signature: [9],
  36  |     userHandle: [10, 11]
  37  |   }
  38  | };
  39  | 
  40  | const stubCredentials = (opts: {
  41  |   conditionalAvailable: boolean;
  42  |   get: "resolve" | "cancel" | "fail";
  43  | }) =>
  44  |   `
  45  |   const toBuffer = (bytes) => new Uint8Array(bytes).buffer;
  46  |   const fake = {
  47  |     id: ${JSON.stringify(FAKE_ASSERTION.id)},
  48  |     rawId: toBuffer(${JSON.stringify(FAKE_ASSERTION.rawId)}),
  49  |     type: "public-key",
  50  |     response: {
  51  |       clientDataJSON: toBuffer(${JSON.stringify(FAKE_ASSERTION.response.clientDataJSON)}),
  52  |       authenticatorData: toBuffer(${JSON.stringify(FAKE_ASSERTION.response.authenticatorData)}),
  53  |       signature: toBuffer(${JSON.stringify(FAKE_ASSERTION.response.signature)}),
  54  |       userHandle: toBuffer(${JSON.stringify(FAKE_ASSERTION.response.userHandle)})
  55  |     }
  56  |   };
  57  |   window.PublicKeyCredential = class {
  58  |     static async isConditionalMediationAvailable() {
  59  |       return ${opts.conditionalAvailable};
  60  |     }
  61  |   };
  62  |   Object.defineProperty(window.navigator, "credentials", {
  63  |     value: {
  64  |       get: async () => {
  65  |         ${opts.get === "resolve" ? "return fake;" : ""}
  66  |         ${opts.get === "cancel" ? 'throw new DOMException("The operation was cancelled.", "NotAllowedError");' : ""}
  67  |         ${opts.get === "fail" ? 'throw new DOMException("The operation is insecure.", "SecurityError");' : ""}
  68  |       },
  69  |       create: async () => { throw new DOMException("Not implemented.", "NotSupportedError"); }
  70  |     },
  71  |     configurable: true
  72  |   });
  73  |   `;
  74  | 
  75  | const submitBodyParam = (body: string, name: string) =>
  76  |   new URLSearchParams(body).get(name);
  77  | 
  78  | for (const variant of ["main domain", "custom-domain org"] as const) {
  79  |   const isCustom = variant === "custom-domain org";
  80  | 
  81  |   test.describe(`passkey login — ${variant}`, () => {
  82  |     test("renders the passkey button with conditional-UI autocomplete", async ({
  83  |       page
  84  |     }) => {
  85  |       const stopCapture = expectNoBrowserKratosRequest(page);
  86  |       await stubPostAuthLanding(page);
  87  |       await mockApi(page, [
  88  |         ...createAuthFlowHandlers({
  89  |           type: "login",
  90  |           customDomainOrg: isCustom,
  91  |           withPasskeys: true
  92  |         }),
  93  |         ...createFallbackHandlers()
  94  |       ]);
  95  | 
  96  |       await page.goto("/login?flow=flow-id-1", { waitUntil: "networkidle" });
  97  | 
  98  |       const passkeyButton = page.locator("button.passkey-btn");
  99  |       if (isCustom) {
  100 |         await expect(passkeyButton).toHaveCount(0);
> 101 |         await expect(page.locator("input[name='identifier']")).toHaveAttribute(
      |                                                                ^ Error: expect(locator).toHaveAttribute(expected) failed
  102 |           "autocomplete",
  103 |           "username"
  104 |         );
  105 |       } else {
  106 |         await expect(passkeyButton).toBeVisible();
  107 |         await expect(passkeyButton).toHaveText(/Sign in with passkey/);
  108 |         await expect(passkeyButton).toHaveAttribute("type", "button");
  109 |         await expect(page.locator("input[name='identifier']")).toHaveAttribute(
  110 |           "autocomplete",
  111 |           "username webauthn"
  112 |         );
  113 |       }
  114 | 
  115 |       // Password + OIDC are unchanged on both variants.
  116 |       await expect(page.locator("input[name='password']")).toBeVisible();
  117 |       await expect(page.locator("button#submit")).toBeVisible();
  118 |       await expect(
  119 |         page.locator("button.social-auth-btn.github")
  120 |       ).toBeVisible();
  121 | 
  122 |       stopCapture();
  123 |     });
  124 | 
  125 |     test("no passkey button without PublicKeyCredential", async ({ page }) => {
  126 |       test.skip(isCustom, "canonical host only");
  127 |       const stopCapture = expectNoBrowserKratosRequest(page);
  128 |       await page.addInitScript(() => {
  129 |         Object.defineProperty(window, "PublicKeyCredential", {
  130 |           value: undefined,
  131 |           configurable: true
  132 |         });
  133 |       });
  134 |       await stubPostAuthLanding(page);
  135 |       await mockApi(page, [
  136 |         ...createAuthFlowHandlers({
  137 |           type: "login",
  138 |           withPasskeys: true
  139 |         }),
  140 |         ...createFallbackHandlers()
  141 |       ]);
  142 | 
  143 |       await page.goto("/login?flow=flow-id-1", { waitUntil: "networkidle" });
  144 | 
  145 |       await expect(page.locator("button.passkey-btn")).toHaveCount(0);
  146 |       await expect(page.locator("button#submit")).toBeVisible();
  147 | 
  148 |       stopCapture();
  149 |     });
  150 |   });
  151 | }
  152 | 
  153 | test.describe("passkey login — canonical host ceremonies", () => {
  154 |   test("button path submits method=passkey with the assertion JSON", async ({
  155 |     page
  156 |   }) => {
  157 |     const stopCapture = expectNoBrowserKratosRequest(page);
  158 |     const submitLog: SubmitLogEntry[] = [];
  159 | 
  160 |     // Conditional mediation off, so only the button path can fire.
  161 |     await page.addInitScript(stubCredentials({ conditionalAvailable: false, get: "resolve" }));
  162 |     await stubPostAuthLanding(page);
  163 |     await mockApi(page, [
  164 |       ...createAuthFlowHandlers({
  165 |         type: "login",
  166 |         withPasskeys: true,
  167 |         submitLog,
  168 |         submitSuccessLocation: "/dashboard"
  169 |       }),
  170 |       ...createFallbackHandlers()
  171 |     ]);
  172 | 
  173 |     await page.goto("/login?flow=flow-id-1", { waitUntil: "networkidle" });
  174 | 
  175 |     await page.locator("button.passkey-btn").click();
  176 |     await page.waitForURL("**/dashboard");
  177 | 
  178 |     expect(submitLog).toHaveLength(1);
  179 |     const body = submitLog[0].postData ?? "";
  180 |     expect(body).toContain("method=passkey");
  181 |     const assertion = JSON.parse(submitBodyParam(body, "passkey_login") ?? "null") as Record<
  182 |       string,
  183 |       unknown
  184 |     >;
  185 |     expect(assertion.id).toBe("test-credential-id");
  186 |     expect(assertion.type).toBe("public-key");
  187 |     expect(assertion.rawId).toBe("AQID");
  188 |     const response = assertion.response as Record<string, unknown>;
  189 |     expect(response.clientDataJSON).toBe("BAU");
  190 |     expect(response.userHandle).toBe("Cgs");
  191 |     expect(body).toContain("csrf_token=test-csrf-token");
  192 |     expect(submitLog[0].url).toMatch(
  193 |       /\/api\/auth\/flow\/submit\?type=login&id=flow-id-1$/
  194 |     );
  195 | 
  196 |     stopCapture();
  197 |   });
  198 | 
  199 |   test("conditional UI submits on autofill selection", async ({ page }) => {
  200 |     const stopCapture = expectNoBrowserKratosRequest(page);
  201 |     const submitLog: SubmitLogEntry[] = [];
```