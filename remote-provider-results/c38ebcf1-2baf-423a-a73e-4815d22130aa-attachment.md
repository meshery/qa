# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: design-crud.spec.ts >> design CRUD flows >> renders multiple designs when several are returned
- Location: e2e/design-crud.spec.ts:85:7

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /Catalog/
Received string:  ""
Timeout: 10000ms

Call log:
  - Expect "toHaveTitle" with timeout 10000ms
    23 × unexpected value ""

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
- heading "Catalog" [level=1]
- tablist "scrollable auto tabs example":
  - tab "Catalog" [selected]:
    - img
    - text: Catalog
  - tab "Leaderboard":
    - img
    - text: Leaderboard
  - tab "My Designs" [disabled]:
    - img
    - text: My Designs
  - tab "My Views" [disabled]:
    - img
    - text: My Views
  - tab "Requests" [disabled]:
    - img
    - text: Requests
- button "Get Help"
- button "Try Again"
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
- textbox "I’m having an issue with...": "An error occurred on the page at http://localhost:3000/catalog on 8/6/2026, 4:28:11 AM. Error Details: Cannot read properties of undefined (reading 'toString'). System Version: Not Available"
- checkbox [checked]
- img
- paragraph: We may email you for more information or updates
- button "Send"
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
  4   |   createCatalogHandlers,
  5   |   createFallbackHandlers,
  6   |   createSharedShellHandlers,
  7   |   mockApi
  8   | } from "./helpers/network";
  9   | 
  10  | /**
  11  |  * TP-016 Design CRUD coverage. The public Catalog route at `/catalog` renders
  12  |  * the published-design browsing surface, which fetches
  13  |  * `/api/catalog/content/pattern...` via RTK Query; `createCatalogHandlers`
  14  |  * stubs that endpoint so each case can observe the list → render pipeline
  15  |  * without touching a real backend.
  16  |  *
  17  |  * Note: full interactive CRUD (create modal, edit form, delete confirmation)
  18  |  * is validated at the Jest component-test layer. Here we assert that the
  19  |  * mocked designs feed reaches the UI across empty, single, and multi-design
  20  |  * states, verifying the integration with the catalog content API.
  21  |  */
  22  | 
  23  | const authenticatedUser = {
  24  |   id: "user-1",
  25  |   first_name: "Test",
  26  |   last_name: "User",
  27  |   email: "test@example.com",
  28  |   preferences: { selectedOrg: "org-1" }
  29  | };
  30  | 
  31  | const organization = {
  32  |   id: "org-1",
  33  |   name: "Test Organization",
  34  |   domain: "localhost:3000"
  35  | };
  36  | 
  37  | const sampleDesign = {
  38  |   id: "pattern-1",
  39  |   name: "My Nginx Deployment",
  40  |   user_id: "user-1",
  41  |   pattern_file: "{}",
  42  |   visibility: "public",
  43  |   catalog_data: {
  44  |     type: "Deployment",
  45  |     content_class: "community"
  46  |   },
  47  |   created_at: "2026-01-01T00:00:00Z",
  48  |   updated_at: "2026-01-01T00:00:00Z"
  49  | };
  50  | 
  51  | test.describe("design CRUD flows", () => {
  52  |   test("renders a user design from the mocked designs list", async ({ page }) => {
  53  |     await mockApi(page, [
  54  |       ...createSharedShellHandlers({
  55  |         user: authenticatedUser,
  56  |         organizations: [organization]
  57  |       }),
  58  |       ...createAuthenticatedShellHandlers({ orgId: "org-1" }),
  59  |       ...createCatalogHandlers({ patterns: [sampleDesign] }),
  60  |       ...createFallbackHandlers()
  61  |     ]);
  62  | 
  63  |     await page.goto("/catalog");
  64  | 
  65  |     await expect(page).toHaveTitle(/Catalog/);
  66  |     await expect(page.getByText("My Nginx Deployment").first()).toBeVisible();
  67  |   });
  68  | 
  69  |   test("renders the catalog shell when no designs exist", async ({ page }) => {
  70  |     await mockApi(page, [
  71  |       ...createSharedShellHandlers({
  72  |         user: authenticatedUser,
  73  |         organizations: [organization]
  74  |       }),
  75  |       ...createAuthenticatedShellHandlers({ orgId: "org-1" }),
  76  |       ...createCatalogHandlers({ patterns: [] }),
  77  |       ...createFallbackHandlers()
  78  |     ]);
  79  | 
  80  |     await page.goto("/catalog");
  81  | 
  82  |     await expect(page).toHaveTitle(/Catalog/);
  83  |   });
  84  | 
  85  |   test("renders multiple designs when several are returned", async ({ page }) => {
  86  |     const secondDesign = {
  87  |       ...sampleDesign,
  88  |       id: "pattern-2",
  89  |       name: "Prometheus Stack"
  90  |     };
  91  | 
  92  |     await mockApi(page, [
  93  |       ...createSharedShellHandlers({
  94  |         user: authenticatedUser,
  95  |         organizations: [organization]
  96  |       }),
  97  |       ...createAuthenticatedShellHandlers({ orgId: "org-1" }),
  98  |       ...createCatalogHandlers({ patterns: [sampleDesign, secondDesign] }),
  99  |       ...createFallbackHandlers()
  100 |     ]);
  101 | 
  102 |     await page.goto("/catalog");
  103 | 
> 104 |     await expect(page).toHaveTitle(/Catalog/);
      |                        ^ Error: expect(page).toHaveTitle(expected) failed
  105 |     // Both seed designs reach the rendered body. The Performers/chart
  106 |     // widgets render one subset and the grid another; assert body-level so
  107 |     // at least one instance of each name is present.
  108 |     await expect(page.locator("body")).toContainText("My Nginx Deployment");
  109 |     await expect(page.locator("body")).toContainText("Prometheus Stack");
  110 |   });
  111 | });
  112 | 
```