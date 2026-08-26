# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth-login.spec.ts >> auth login route >> unauthenticated root modal links to the login page
- Location: e2e/auth-login.spec.ts:29:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: /login/i })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: /login/i })
    - waiting for" http://localhost:3000/login" navigation to finish...
    - navigated to "http://localhost:3000/login"

```

```yaml
- main:
  - heading "Login page stub" [level=1]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import {
  3  |   createAuthenticatedShellHandlers,
  4  |   createFallbackHandlers,
  5  |   createSharedShellHandlers,
  6  |   mockApi,
  7  |   mockLoginPage
  8  | } from "./helpers/network";
  9  | 
  10 | test.describe("auth login route", () => {
  11 |   test("unauthenticated root redirects to login via session-expired modal", async ({
  12 |     page
  13 |   }) => {
  14 |     await mockLoginPage(page);
  15 |     await mockApi(page, [
  16 |       ...createSharedShellHandlers({
  17 |         // Empty user object — no id means unauthenticated
  18 |         user: {}
  19 |       }),
  20 |       ...createFallbackHandlers()
  21 |     ]);
  22 | 
  23 |     await page.goto("/", { waitUntil: "domcontentloaded" });
  24 | 
  25 |     // The index page detects missing auth and shows a redirection modal
  26 |     await expect(page.getByText("Session Expired")).toBeVisible();
  27 |   });
  28 | 
  29 |   test("unauthenticated root modal links to the login page", async ({ page }) => {
  30 |     await mockLoginPage(page);
  31 |     await mockApi(page, [
  32 |       ...createSharedShellHandlers({
  33 |         user: {}
  34 |       }),
  35 |       ...createFallbackHandlers()
  36 |     ]);
  37 | 
  38 |     await page.goto("/", { waitUntil: "domcontentloaded" });
  39 | 
  40 |     // The modal should contain a link/button pointing to the login page
  41 |     const loginLink = page.getByRole("link", { name: /login/i });
> 42 |     await expect(loginLink).toBeVisible();
     |                             ^ Error: expect(locator).toBeVisible() failed
  43 |     await loginLink.click();
  44 | 
  45 |     await expect(page).toHaveURL(/\/login/);
  46 |     await expect(page.getByText("Login page stub")).toBeVisible();
  47 |   });
  48 | 
  49 |   test("authenticated root redirects to dashboard", async ({ page }) => {
  50 |     await mockApi(page, [
  51 |       ...createSharedShellHandlers({
  52 |         user: {
  53 |           id: "user-1",
  54 |           first_name: "Test",
  55 |           last_name: "User",
  56 |           email: "test@example.com",
  57 |           preferences: { selectedOrg: "org-1" }
  58 |         },
  59 |         organizations: [
  60 |           {
  61 |             id: "org-1",
  62 |             name: "Test Organization",
  63 |             domain: "localhost:3000"
  64 |           }
  65 |         ]
  66 |       }),
  67 |       ...createAuthenticatedShellHandlers({ orgId: "org-1" }),
  68 |       ...createFallbackHandlers()
  69 |     ]);
  70 | 
  71 |     await page.goto("/", { waitUntil: "domcontentloaded" });
  72 | 
  73 |     // Authenticated users should be redirected to /dashboard
  74 |     await expect(page).toHaveURL(/\/dashboard/);
  75 |   });
  76 | });
  77 | 
```