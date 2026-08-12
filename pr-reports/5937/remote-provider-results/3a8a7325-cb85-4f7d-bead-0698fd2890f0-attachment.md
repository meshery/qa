# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> auth route >> after logout, accessing dashboard shows session modal
- Location: e2e/auth.spec.ts:52:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Session Expired')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('Session Expired')

```

```yaml
- dialog:
  - text: Where do you want to start?
  - button:
    - img
  - img "Visualize your cluster in browser"
  - paragraph: Visualize your cluster in browser
  - img "Invite a friend to collaborate"
  - paragraph: Invite a friend to collaborate
  - img "Create a design"
  - paragraph: Create a design
  - img "Visualize your code on GitHub"
  - paragraph: Visualize your code on GitHub
  - checkbox "Do not display again"
  - img
  - text: Do not display again
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import {
  3   |   createAuthenticatedShellHandlers,
  4   |   createFallbackHandlers,
  5   |   createSharedShellHandlers,
  6   |   mockApi,
  7   |   mockLoginPage
  8   | } from "./helpers/network";
  9   | 
  10  | /**
  11  |  * Authentication flow tests for TP-016. Covers TC-016-005 (unauthenticated
  12  |  * redirect) and TC-016-006 (post-logout protection) at the mocked E2E layer.
  13  |  *
  14  |  * - Real Kratos-backed login (TC-016-001), GitHub/Google OAuth
  15  |  *   (TC-016-002, TC-016-003), and new-user registration (TC-016-004) depend
  16  |  *   on Kratos + Hydra and live third-party endpoints; those are validated in
  17  |  *   the post-deployment smoke test suite rather than here, where the entire
  18  |  *   network layer is mocked.
  19  |  *
  20  |  * The complementary file `auth-login.spec.ts` covers the unauthenticated
  21  |  * root-page redirect surface (modal present, login link works, authenticated
  22  |  * root redirects to /dashboard). This file intentionally adds only the
  23  |  * scenarios that are NOT already covered there: direct protected-route
  24  |  * access and the post-logout recheck.
  25  |  */
  26  | 
  27  | test.describe("auth route", () => {
  28  |   // TC-016-005: Direct navigation to a protected route without a session
  29  |   // triggers the session-expired modal instead of rendering the dashboard.
  30  |   test("unauthenticated direct access to protected dashboard shows session modal", async ({
  31  |     page
  32  |   }) => {
  33  |     await mockLoginPage(page);
  34  |     await mockApi(page, [
  35  |       ...createSharedShellHandlers({
  36  |         user: {}
  37  |       }),
  38  |       ...createFallbackHandlers()
  39  |     ]);
  40  | 
  41  |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  42  | 
  43  |     // Without auth, the shell renders the session-expired modal instead of
  44  |     // the dashboard, which protects the route behind an auth gate.
  45  |     await expect(page.getByText("Session Expired")).toBeVisible();
  46  |   });
  47  | 
  48  |   // TC-016-006: Simulate a logout by starting authenticated, driving the
  49  |   // app shell to the dashboard, and then re-mocking the profile endpoint as
  50  |   // empty before navigating to another protected route. The shell should
  51  |   // detect the missing session and surface the session-expired modal again.
  52  |   test("after logout, accessing dashboard shows session modal", async ({
  53  |     page,
  54  |     context
  55  |   }) => {
  56  |     await mockLoginPage(page);
  57  | 
  58  |     // Start authenticated so we reach the dashboard like a logged-in user.
  59  |     await mockApi(page, [
  60  |       ...createSharedShellHandlers({
  61  |         user: {
  62  |           id: "user-1",
  63  |           first_name: "Test",
  64  |           last_name: "User",
  65  |           email: "test@example.com",
  66  |           preferences: { selectedOrg: "org-1" }
  67  |         },
  68  |         organizations: [
  69  |           {
  70  |             id: "org-1",
  71  |             name: "Test Organization",
  72  |             domain: "localhost:3000"
  73  |           }
  74  |         ]
  75  |       }),
  76  |       ...createAuthenticatedShellHandlers({ orgId: "org-1" }),
  77  |       ...createFallbackHandlers()
  78  |     ]);
  79  | 
  80  |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  81  | 
  82  |     // Simulate logout: clear any auth cookies and re-route the profile
  83  |     // endpoint to return an empty user. The next protected navigation
  84  |     // should be blocked by the auth gate.
  85  |     await context.clearCookies();
  86  |     await page.unroute("**/api/**");
  87  |     await mockApi(page, [
  88  |       ...createSharedShellHandlers({
  89  |         user: {}
  90  |       }),
  91  |       ...createFallbackHandlers()
  92  |     ]);
  93  | 
  94  |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  95  | 
  96  |     // The dashboard shell should detect the missing session and surface the
  97  |     // session-expired modal. The modal is the specific expected outcome; if
  98  |     // it is missing, the auth gate is broken even when the final URL lands
  99  |     // on the mocked login stub.
> 100 |     await expect(page.getByText("Session Expired")).toBeVisible();
      |                                                     ^ Error: expect(locator).toBeVisible() failed
  101 |   });
  102 | });
  103 | 
```