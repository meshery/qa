# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: userpreference.spec.ts >> User Preferences Page Tests >> Toggle "Send Anonymous Usage Statistics"
- Location: tests/e2e/userpreference.spec.ts:67:9

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:9081/
Call log:
  - navigating to "http://localhost:9081/", waiting until "domcontentloaded"

```

```
Error: page.waitForRequest: Test ended.
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | import { ENV } from './env';
  3  | import { DashboardPage } from './pages/DashboardPage';
  4  | 
  5  | const userPreferenceTests: {
  6  |   name: string;
  7  |   apiURL: string;
  8  |   switchLabel: string;
  9  |   expectedMethod: string;
  10 |   expectedStatus: number;
  11 | }[] = [
  12 |   // {
  13 |   //   name: 'Toggle "Meshery Catalog Content"',
  14 |   //   apiURL: `${ENV.MESHERY_SERVER_URL}/api/user/prefs`,
  15 |   //   switchLabel: 'Meshery Catalog Content',
  16 |   //   expectedMethod: 'POST',
  17 |   //   expectedStatus: 200,
  18 |   // },
  19 |   {
  20 |     name: 'Toggle "Send Anonymous Usage Statistics"',
  21 |     apiURL: `${ENV.MESHERY_SERVER_URL}/api/user/prefs`,
  22 |     switchLabel: 'Send Anonymous Usage Statistics',
  23 |     expectedMethod: 'POST',
  24 |     expectedStatus: 200,
  25 |   },
  26 |   {
  27 |     name: 'Toggle "Send Anonymous Performance Results"',
  28 |     apiURL: `${ENV.MESHERY_SERVER_URL}/api/user/prefs`,
  29 |     switchLabel: 'Send Anonymous Performance Results',
  30 |     expectedMethod: 'POST',
  31 |     expectedStatus: 200,
  32 |   },
  33 | ];
  34 | 
  35 | test.describe('User Preferences Page Tests', () => {
  36 |   test.beforeEach(async ({ page }) => {
> 37 |     const userPrefReq = page.waitForRequest(
     |                              ^ Error: page.waitForRequest: Test ended.
  38 |       (request) =>
  39 |         request.url().startsWith(`${ENV.MESHERY_SERVER_URL}/api/user/prefs`) &&
  40 |         request.method() === 'GET',
  41 |     );
  42 |     const userPrefRes = page.waitForResponse(
  43 |       (response) =>
  44 |         response.url().startsWith(`${ENV.MESHERY_SERVER_URL}/api/user/prefs`) &&
  45 |         response.status() === 200,
  46 |     );
  47 | 
  48 |     const dashboardPage = new DashboardPage(page);
  49 |     await dashboardPage.navigateToDashboard();
  50 |     await dashboardPage.navigateToPreferences();
  51 | 
  52 |     // Verify requests and responses expected on initial page load
  53 | 
  54 |     await userPrefReq;
  55 |     await userPrefRes;
  56 |     // Verify visibility of 'Extensions' Section
  57 |     await expect(page.getByRole('group', { name: /Extensions.*/ })).toBeVisible();
  58 |     // Verify visibility of 'Analytics and Improvement Program' Section
  59 |     await expect(
  60 |       page.getByRole('group', { name: /Analytics and Improvement Program.*/ }),
  61 |     ).toBeVisible();
  62 |     // Verify visibility of 'Theme' Section
  63 |     await expect(page.getByRole('group', { name: /Theme.*/ })).toBeVisible();
  64 |   });
  65 | 
  66 |   for (const t of userPreferenceTests) {
  67 |     test(t.name, async ({ page }) => {
  68 |       const userPrefReq = page.waitForRequest(
  69 |         (request) => request.url() === t.apiURL && request.method() === t.expectedMethod,
  70 |       );
  71 |       const userPrefRes = page.waitForResponse(
  72 |         (response) => response.url() === t.apiURL && response.status() === t.expectedStatus,
  73 |       );
  74 |       // Check current state of switch (checked or unchecked)
  75 |       const prefSwitch = page.getByLabel(t.switchLabel);
  76 |       const wasChecked = await prefSwitch.isChecked();
  77 | 
  78 |       // Toggle the state of switch
  79 |       await prefSwitch.click();
  80 | 
  81 |       await userPrefReq;
  82 |       await userPrefRes;
  83 | 
  84 |       // Verify that state of switch changed
  85 |       await page.waitForTimeout(2000);
  86 |       if (wasChecked) {
  87 |         await expect(prefSwitch).not.toBeChecked();
  88 |       } else {
  89 |         await expect(prefSwitch).toBeChecked();
  90 |       }
  91 |     });
  92 |   }
  93 | });
  94 | 
```