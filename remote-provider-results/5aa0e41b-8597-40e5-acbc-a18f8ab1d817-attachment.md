# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: subscription-management.spec.ts >> subscription management >> renders the subscriptions summary page
- Location: e2e/subscription-management.spec.ts:66:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/free/i).first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText(/free/i).first()

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
- heading "Subscription" [level=1]
- tablist "scrollable auto tabs example":
  - tab "Profile" [disabled]:
    - img
    - text: Profile
  - tab "Preferences" [disabled]:
    - img
    - text: Preferences
  - tab "Subscription" [selected]:
    - img
    - text: Subscription
  - tab "Plans" [disabled]:
    - img
    - text: Plans
- paragraph: Current Plan
- heading "Personal" [level=5]
- paragraph:
  - link "Upgrade Plan":
    - /url: /account/plans
- paragraph: Forecasted Bill
- heading "$0.00" [level=5]
- paragraph: No billable usage
- paragraph: Next Payment Due
- heading "No upcoming payments" [level=5]
- heading "Subscription Management" [level=6]
- button "Refresh data":
  - img
- button:
  - img
- button:
  - img
- img
- heading "No Subscriptions Found" [level=6]
- paragraph: You don't have any active subscriptions. Visit our plans page to explore available options.
- link "View Plans":
  - /url: /account/plans
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
- alert: Test Organization | Subscriptions
```

# Test source

```ts
  1  | import { Keys } from "@meshery/schemas/permissions";
  2  | import { expect, test } from "@playwright/test";
  3  | import {
  4  |   createAuthenticatedShellHandlers,
  5  |   createFallbackHandlers,
  6  |   createSharedShellHandlers,
  7  |   createSubscriptionsHandlers,
  8  |   mockApi
  9  | } from "./helpers/network";
  10 | 
  11 | const viewPlansKey = {
  12 |   id: Keys.AccountManagementViewPlans.id,
  13 |   function: Keys.AccountManagementViewPlans.function
  14 | };
  15 | 
  16 | const viewSubscriptionsKey = {
  17 |   id: Keys.AccountManagementViewSubcription.id,
  18 |   function: Keys.AccountManagementViewSubcription.function
  19 | };
  20 | 
  21 | /**
  22 |  * TP-016 Subscription management coverage. The plans and subscriptions pages
  23 |  * drive plan discovery and Stripe checkout session creation.
  24 |  * `createSubscriptionsHandlers` stubs `/api/plans*`, `/api/subscription*`
  25 |  * and checkout endpoints so the UI renders without contacting Stripe.
  26 |  *
  27 |  * Full upgrade-to-paid-plan is validated in the post-deployment smoke test
  28 |  * suite where a live Stripe sandbox is available; here we cover the two
  29 |  * user-facing routes that list plans and summarize the current subscription.
  30 |  */
  31 | 
  32 | const authenticatedUser = {
  33 |   id: "user-1",
  34 |   first_name: "Test",
  35 |   last_name: "User",
  36 |   email: "test@example.com",
  37 |   preferences: { selectedOrg: "org-1" }
  38 | };
  39 | 
  40 | const organization = {
  41 |   id: "org-1",
  42 |   name: "Test Organization",
  43 |   domain: "localhost:3000"
  44 | };
  45 | 
  46 | const sharedHandlers = (options?: { keys?: Array<Record<string, unknown>> }) => [
  47 |   ...createSharedShellHandlers({
  48 |     user: authenticatedUser,
  49 |     organizations: [organization]
  50 |   }),
  51 |   ...createAuthenticatedShellHandlers({ orgId: "org-1", keys: options?.keys }),
  52 |   ...createSubscriptionsHandlers({ currentPlan: "plan-free" }),
  53 |   ...createFallbackHandlers()
  54 | ];
  55 | 
  56 | test.describe("subscription management", () => {
  57 |   test("renders the plans page", async ({ page }) => {
  58 |     await mockApi(page, sharedHandlers({ keys: [viewPlansKey] }));
  59 | 
  60 |     await page.goto("/account/plans");
  61 | 
  62 |     await expect(page).toHaveTitle(/Plans/);
  63 |     await expect(page.getByText(/free/i).first()).toBeVisible();
  64 |   });
  65 | 
  66 |   test("renders the subscriptions summary page", async ({ page }) => {
  67 |     await mockApi(page, sharedHandlers({ keys: [viewSubscriptionsKey] }));
  68 | 
  69 |     await page.goto("/account/subscriptions");
  70 | 
  71 |     await expect(page).toHaveTitle(/Subscriptions/);
> 72 |     await expect(page.getByText(/free/i).first()).toBeVisible();
     |                                                   ^ Error: expect(locator).toBeVisible() failed
  73 |   });
  74 | });
  75 | 
```