# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth/logout.spec.ts >> logout — custom-domain org >> custom-domain /logout bounces to main-domain /logout
- Location: e2e/auth/logout.spec.ts:80:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.goto: Test timeout of 60000ms exceeded.
Call log:
  - navigating to "http://localhost:3000/logout", waiting until "networkidle"

```

# Page snapshot

```yaml
- main [ref=e2]: login
```

# Test source

```ts
  31  |     const stopCapture = expectNoBrowserKratosRequest(page);
  32  | 
  33  |     // Stub /logout to mirror real server behaviour: clear cookies,
  34  |     // 303 to /login. We don't fake Kratos/Hydra here — the test is
  35  |     // about what the BROWSER sees, and the browser only ever sees
  36  |     // the cloud server's response.
  37  |     await page.route("**/logout**", async route => {
  38  |       await route.fulfill({
  39  |         status: 303,
  40  |         headers: {
  41  |           Location: "/login",
  42  |           // Cookie clearance for the main session cookies (mirrors
  43  |           // ClearAllSessionCookies in server/handlers/kratos.go).
  44  |           // Multiple Set-Cookie via the headers map isn't possible
  45  |           // in Playwright's mock; one is enough to assert the relay
  46  |           // path works for the test.
  47  |           "Set-Cookie": "token=; Path=/; Max-Age=0; HttpOnly"
  48  |         },
  49  |         contentType: "text/html",
  50  |         body: ""
  51  |       });
  52  |     });
  53  |     await page.route("**/login**", route =>
  54  |       route.fulfill({
  55  |         status: 200,
  56  |         contentType: "text/html",
  57  |         body: "<!doctype html><html><body><main>login</main></body></html>"
  58  |       })
  59  |     );
  60  |     // The `**/login**` stub below does not reliably intercept the login page
  61  |     // when it is reached as the target of a route.fulfill()-synthesized 303
  62  |     // (Playwright does not re-run interception on that redirect hop). When the
  63  |     // real login page loads instead, its useAuthFlow fetch must resolve to a
  64  |     // valid flow rather than the fallback `{}` — otherwise the page bounces to
  65  |     // /error and the post-logout landing assertion fails. Seed a login flow so
  66  |     // the landing stays on /login regardless of which path serves it.
  67  |     await mockApi(page, [
  68  |       ...createAuthFlowHandlers({ type: "login" }),
  69  |       ...createFallbackHandlers()
  70  |     ]);
  71  | 
  72  |     await page.goto("/logout", { waitUntil: "networkidle" });
  73  |     await expect(page).toHaveURL(/\/login/);
  74  | 
  75  |     stopCapture();
  76  |   });
  77  | });
  78  | 
  79  | test.describe("logout — custom-domain org", () => {
  80  |   test("custom-domain /logout bounces to main-domain /logout", async ({ page }) => {
  81  |     // The custom-domain branch in HandleLogout clears cookies on the
  82  |     // custom host and 303s to <SERVER_BASE_URL>/logout so the main
  83  |     // chain can do the Kratos+Hydra teardown.
  84  |     //
  85  |     // Same architectural rule applies on the bounce as on the main
  86  |     // domain: the browser must not hit Kratos directly anywhere in the
  87  |     // chain. expectNoBrowserKratosRequest installed here too so the
  88  |     // custom-domain variant doesn't slip past the guard.
  89  |     const stopCapture = expectNoBrowserKratosRequest(page);
  90  | 
  91  |     let logoutHits = 0;
  92  |     await page.route("**/logout**", async route => {
  93  |       logoutHits += 1;
  94  |       // First hit (the test's `goto`) returns the bounce; second
  95  |       // hit (the follow-up) returns the final redirect to /login.
  96  |       if (logoutHits === 1) {
  97  |         await route.fulfill({
  98  |           status: 303,
  99  |           headers: { Location: "/logout?bounced=1" },
  100 |           contentType: "text/html",
  101 |           body: ""
  102 |         });
  103 |         return;
  104 |       }
  105 |       await route.fulfill({
  106 |         status: 303,
  107 |         headers: { Location: "/login" },
  108 |         contentType: "text/html",
  109 |         body: ""
  110 |       });
  111 |     });
  112 |     await page.route("**/login**", route =>
  113 |       route.fulfill({
  114 |         status: 200,
  115 |         contentType: "text/html",
  116 |         body: "<!doctype html><html><body><main>login</main></body></html>"
  117 |       })
  118 |     );
  119 |     // The `**/login**` stub below does not reliably intercept the login page
  120 |     // when it is reached as the target of a route.fulfill()-synthesized 303
  121 |     // (Playwright does not re-run interception on that redirect hop). When the
  122 |     // real login page loads instead, its useAuthFlow fetch must resolve to a
  123 |     // valid flow rather than the fallback `{}` — otherwise the page bounces to
  124 |     // /error and the post-logout landing assertion fails. Seed a login flow so
  125 |     // the landing stays on /login regardless of which path serves it.
  126 |     await mockApi(page, [
  127 |       ...createAuthFlowHandlers({ type: "login" }),
  128 |       ...createFallbackHandlers()
  129 |     ]);
  130 | 
> 131 |     await page.goto("/logout", { waitUntil: "networkidle" });
      |                ^ Error: page.goto: Test timeout of 60000ms exceeded.
  132 |     await expect(page).toHaveURL(/\/login/);
  133 |     expect(logoutHits).toBeGreaterThanOrEqual(2);
  134 | 
  135 |     stopCapture();
  136 |   });
  137 | });
  138 | 
```