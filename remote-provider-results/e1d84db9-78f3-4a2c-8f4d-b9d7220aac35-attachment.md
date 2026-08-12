# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: events.spec.ts >> events route >> shows 5000+ when audit count exceeds threshold
- Location: e2e/events.spec.ts:76:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('5000+').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('5000+').first()

```

```yaml
- banner:
  - link "logo":
    - /url: /
    - paragraph:
      - img "logo"
  - combobox:
    - img
    - text: Test Organization
  - img
  - button:
    - img
- heading "Overview" [level=1]
- tablist "scrollable auto tabs example":
  - tab "Overview" [disabled] [selected]:
    - img
    - text: Overview
  - tab "Summary" [disabled]:
    - img
    - text: Summary
  - tab "Audit" [disabled]:
    - img
    - text: Audit
  - tab "Statistics" [disabled]:
    - img
    - text: Statistics
- navigation "Active Users (0)":
  - heading "Active Users (0)" [level=6]:
    - text: Active Users
    - paragraph: (0)
  - img
- button "Feedback"
- img
- paragraph: Feedback
- img
- img
- button "Issue":
  - img
  - paragraph: Issue
- button "Suggestion":
  - img
  - paragraph: Suggestion
- button "Meet Request":
  - img
  - paragraph: Meet Request
- textbox "I’m having an issue with..."
- checkbox
- img
- paragraph: We may email you for more information or updates
- button "Send" [disabled]
- alert
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import {
  3  |   createAuthenticatedShellHandlers,
  4  |   createEventsHandlers,
  5  |   createFallbackHandlers,
  6  |   createSharedShellHandlers,
  7  |   mockApi
  8  | } from "./helpers/network";
  9  | 
  10 | const authenticatedUser = {
  11 |   id: "user-1",
  12 |   first_name: "Test",
  13 |   last_name: "User",
  14 |   email: "test@example.com",
  15 |   preferences: { selectedOrg: "org-1" }
  16 | };
  17 | 
  18 | const organization = {
  19 |   id: "org-1",
  20 |   name: "Test Organization",
  21 |   domain: "localhost:3000"
  22 | };
  23 | 
  24 | test.describe("events route", () => {
  25 |   test("renders the events page with correct title", async ({ page }) => {
  26 |     await mockApi(page, [
  27 |       ...createSharedShellHandlers({
  28 |         user: authenticatedUser,
  29 |         organizations: [organization]
  30 |       }),
  31 |       ...createAuthenticatedShellHandlers({ orgId: "org-1" }),
  32 |       ...createEventsHandlers({ audit: 0 }),
  33 |       ...createFallbackHandlers()
  34 |     ]);
  35 | 
  36 |     await page.goto("/events", { waitUntil: "domcontentloaded" });
  37 | 
  38 |     await expect(page).toHaveTitle(/Events/);
  39 |   });
  40 | 
  41 |   test("shows audit card with zero count", async ({ page }) => {
  42 |     await mockApi(page, [
  43 |       ...createSharedShellHandlers({
  44 |         user: authenticatedUser,
  45 |         organizations: [organization]
  46 |       }),
  47 |       ...createAuthenticatedShellHandlers({ orgId: "org-1" }),
  48 |       ...createEventsHandlers({ audit: 0 }),
  49 |       ...createFallbackHandlers()
  50 |     ]);
  51 | 
  52 |     await page.goto("/events", { waitUntil: "domcontentloaded" });
  53 | 
  54 |     await expect(page).toHaveTitle(/Events/);
  55 |     await expect(page.getByText("Audit").first()).toBeVisible();
  56 |   });
  57 | 
  58 |   test("shows audit card with non-zero count", async ({ page }) => {
  59 |     await mockApi(page, [
  60 |       ...createSharedShellHandlers({
  61 |         user: authenticatedUser,
  62 |         organizations: [organization]
  63 |       }),
  64 |       ...createAuthenticatedShellHandlers({ orgId: "org-1" }),
  65 |       ...createEventsHandlers({ audit: 42 }),
  66 |       ...createFallbackHandlers()
  67 |     ]);
  68 | 
  69 |     await page.goto("/events", { waitUntil: "domcontentloaded" });
  70 | 
  71 |     await expect(page).toHaveTitle(/Events/);
  72 |     await expect(page.getByText("Audit").first()).toBeVisible();
  73 |     await expect(page.getByText("42").first()).toBeVisible();
  74 |   });
  75 | 
  76 |   test("shows 5000+ when audit count exceeds threshold", async ({ page }) => {
  77 |     await mockApi(page, [
  78 |       ...createSharedShellHandlers({
  79 |         user: authenticatedUser,
  80 |         organizations: [organization]
  81 |       }),
  82 |       ...createAuthenticatedShellHandlers({ orgId: "org-1" }),
  83 |       ...createEventsHandlers({ audit: 6000 }),
  84 |       ...createFallbackHandlers()
  85 |     ]);
  86 | 
  87 |     await page.goto("/events", { waitUntil: "domcontentloaded" });
  88 | 
  89 |     await expect(page).toHaveTitle(/Events/);
> 90 |     await expect(page.getByText("5000+").first()).toBeVisible();
     |                                                   ^ Error: expect(locator).toBeVisible() failed
  91 |   });
  92 | });
  93 | 
```