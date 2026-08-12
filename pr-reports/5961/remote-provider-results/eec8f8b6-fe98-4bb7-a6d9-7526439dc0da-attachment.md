# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nav-permission-shield.spec.ts >> the Organizations nav item >> is shielded, not silently disabled, when neither key is held
- Location: e2e/nav-permission-shield.spec.ts:319:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('nav-item-security')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('nav-item-security')

```

```yaml
- menu:
  - menuitem "Dashboard":
    - listitem: Dashboard
  - separator
  - menuitem "Identity":
    - listitem:
      - img
      - text: Identity
  - menuitem "Catalog":
    - listitem:
      - img
      - text: Catalog
  - separator
  - menuitem "Academy":
    - listitem:
      - img
      - text: Academy
  - menuitem "Support":
    - listitem:
      - img
      - text: Support
  - separator
  - menuitem "Logout":
    - listitem:
      - img
      - text: Logout
```

# Test source

```ts
  1   | /**
  2   |  * Declarative navigation authorization E2E spec.
  3   |  *
  4   |  * Covers the Sistent `permissionKey` path wired up in
  5   |  *   components/app/AppShell.tsx        → mounts `PermissionProvider`
  6   |  *   components/general/navbar/nav-menu → `NavigationNavbar` + `permissionKey`
  7   |  *
  8   |  * With a `permissionKey` present, `NavigationNavbar` stops using the legacy
  9   |  * `permission` boolean and defers to `useHasPermission(key)` from the provider,
  10  |  * which meshery-cloud backs with `canKey` (CASL). A denied item is disabled and
  11  |  * wrapped in `PermissionShield`; the shield tooltip names the missing key and
  12  |  * reports who the viewer is.
  13  |  *
  14  |  * The role rows in that tooltip are the reason this spec asserts on
  15  |  * `organizationsWithRoles`: `userContext.roleNames` must be the roles the user
  16  |  * is ASSIGNED, never the organization's role CATALOG
  17  |  * (`GET /orgs/:orgId/roles`). The fixtures below deliberately make the two
  18  |  * differ so a regression to the catalog is visible.
  19  |  */
  20  | 
  21  | import { expect, test } from "@playwright/test";
  22  | import {
  23  |   createAuthenticatedShellHandlers,
  24  |   createDashboardHandlers,
  25  |   createFallbackHandlers,
  26  |   createPermissionKeysHandler,
  27  |   createSharedShellHandlers,
  28  |   mockApi
  29  | } from "./helpers/network";
  30  | 
  31  | const ORG_ID = "org-1";
  32  | 
  33  | // The org domain must match the host the browser is actually on, otherwise the
  34  | // shell bounces to /auth/switch-domain before any nav assertion can run. Derive
  35  | // it from the base URL so the spec survives a non-default PLAYWRIGHT_BASE_URL
  36  | // (e.g. a second dev server when :3000 is taken).
  37  | const APP_HOST = new URL(process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000").host;
  38  | 
  39  | const organization = {
  40  |   id: ORG_ID,
  41  |   name: "Test Organization",
  42  |   domain: APP_HOST
  43  | };
  44  | 
  45  | // The user holds exactly one role in org-1.
  46  | const authenticatedUser = {
  47  |   id: "user-1",
  48  |   firstName: "Ada",
  49  |   lastName: "Lovelace",
  50  |   email: "ada@example.com",
  51  |   preferences: {
  52  |     selectedOrg: ORG_ID,
  53  |     // Suppress the first-run "Where do you want to start?" welcome modal, which
  54  |     // otherwise overlays the shell and swallows clicks on the nav toggle.
  55  |     remoteProviderPreferences: { showWelcomeModal: false }
  56  |   },
  57  |   organizations: {
  58  |     organizationsWithRoles: [
  59  |       { id: ORG_ID, name: organization.name, roleNames: ["viewer"] },
  60  |       // A membership in some OTHER org must not leak into the active org's
  61  |       // context.
  62  |       { id: "org-2", name: "Other Organization", roleNames: ["org admin"] }
  63  |     ],
  64  |     totalCount: 2
  65  |   }
  66  | };
  67  | 
  68  | // The org's role CATALOG. Strictly larger than what the user is assigned —
  69  | // if any of these extra names reaches the shield tooltip, the provider is
  70  | // sourcing the wrong list.
  71  | const orgRoleCatalog = [
  72  |   { roleName: "viewer" },
  73  |   { roleName: "org admin" },
  74  |   { roleName: "billing manager" },
  75  |   // `roleName` is optional on the generated type; a malformed row must not
  76  |   // surface as "undefined" in the tooltip.
  77  |   {}
  78  | ];
  79  | 
  80  | const shellHandlers = (granted: Parameters<typeof createPermissionKeysHandler>[0]) => [
  81  |   ...createSharedShellHandlers({
  82  |     user: authenticatedUser,
  83  |     organizations: [organization]
  84  |   }),
  85  |   ...createPermissionKeysHandler(granted, { orgId: ORG_ID }),
  86  |   ...createAuthenticatedShellHandlers({
  87  |     orgId: ORG_ID,
  88  |     roles: orgRoleCatalog,
  89  |     skipKeys: true
  90  |   }),
  91  |   ...createDashboardHandlers({ orgId: ORG_ID }),
  92  |   ...createFallbackHandlers()
  93  | ];
  94  | 
  95  | /** Opens the profile nav menu. */
  96  | const openNavMenu = async (page: import("@playwright/test").Page) => {
  97  |   await page.getByTestId("nav-menu-toggle").click();
> 98  |   await expect(page.getByTestId("nav-item-security")).toBeVisible();
      |                                                       ^ Error: expect(locator).toBeVisible() failed
  99  | };
  100 | 
  101 | /** Opens the profile nav menu and expands the "Security" section. */
  102 | const openSecuritySection = async (page: import("@playwright/test").Page) => {
  103 |   await openNavMenu(page);
  104 |   await page.getByTestId("nav-toggle-security").click();
  105 |   await expect(page.getByTestId("nav-subitem-tokens")).toBeVisible();
  106 | };
  107 | 
  108 | /** Opens the profile nav menu and expands the "Identity" section. */
  109 | const openIdentitySection = async (page: import("@playwright/test").Page) => {
  110 |   await openNavMenu(page);
  111 |   await page.getByTestId("nav-toggle-identity").click();
  112 |   await expect(page.getByTestId("nav-subitem-organizations")).toBeVisible();
  113 | };
  114 | 
  115 | /**
  116 |  * The shield toggle for a nav item.
  117 |  *
  118 |  * PermissionShield renders `<wrapper><dimmed>{item}</dimmed><shield/></wrapper>`,
  119 |  * so from the item itself the toggle is the wrapper's next sibling. It exists
  120 |  * ONLY when the item's `permissionKey` is denied.
  121 |  */
  122 | const shieldToggleFor = (page: import("@playwright/test").Page, testId: string) =>
  123 |   page.getByTestId(testId).locator("xpath=../following-sibling::*[1]");
  124 | 
  125 | test.describe("navigation permissionKey authorization", () => {
  126 |   test("granted key leaves the nav item enabled and un-shielded", async ({ page }) => {
  127 |     await mockApi(page, shellHandlers(["VIEW_TOKENS"]));
  128 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  129 | 
  130 |     await openSecuritySection(page);
  131 | 
  132 |     const tokens = page.getByTestId("nav-subitem-tokens");
  133 |     await expect(tokens).not.toHaveAttribute("aria-disabled", "true");
  134 |     // PermissionShield wraps the item only when the key is denied.
  135 |     await expect(shieldToggleFor(page, "nav-subitem-tokens")).toHaveCount(0);
  136 |   });
  137 | 
  138 |   test("denied key disables the nav item and shields it", async ({ page }) => {
  139 |     await mockApi(page, shellHandlers(["VIEW_TOKENS"]));
  140 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  141 | 
  142 |     await openSecuritySection(page);
  143 | 
  144 |     // VIEW_KEYS was not granted.
  145 |     await expect(page.getByTestId("nav-subitem-keys")).toHaveAttribute(
  146 |       "aria-disabled",
  147 |       "true"
  148 |     );
  149 |   });
  150 | 
  151 |   test("shield tooltip names the missing key and the viewer's ASSIGNED roles", async ({
  152 |     page
  153 |   }) => {
  154 |     await mockApi(page, shellHandlers(["VIEW_TOKENS"]));
  155 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  156 | 
  157 |     await openSecuritySection(page);
  158 | 
  159 |     await shieldToggleFor(page, "nav-subitem-keys").click();
  160 | 
  161 |     const tooltip = page.getByRole("tooltip");
  162 |     await expect(tooltip).toContainText("Authorization Required");
  163 |     // Key metadata comes from `@meshery/schemas/permissions`, so the tooltip is
  164 |     // only useful when a COMPLETE `Key` is passed as `permissionKey`.
  165 |     await expect(tooltip).toContainText("View Keys");
  166 | 
  167 |     // User context supplied by AppShell's PermissionProvider.
  168 |     await expect(tooltip).toContainText("Ada Lovelace");
  169 |     await expect(tooltip).toContainText("Test Organization");
  170 |     await expect(tooltip).toContainText("viewer");
  171 | 
  172 |     // Regression guard: the org role CATALOG must never be presented as the
  173 |     // viewer's roles, and a role-less catalog row must never render as
  174 |     // "undefined".
  175 |     await expect(tooltip).not.toContainText("billing manager");
  176 |     await expect(tooltip).not.toContainText("undefined");
  177 |   });
  178 | 
  179 |   test("a user with no assigned role in the active org reports None, not the catalog", async ({
  180 |     page
  181 |   }) => {
  182 |     await mockApi(page, [
  183 |       ...createSharedShellHandlers({
  184 |         user: { ...authenticatedUser, organizations: { organizationsWithRoles: [] } },
  185 |         organizations: [organization]
  186 |       }),
  187 |       ...createPermissionKeysHandler(["VIEW_TOKENS"], { orgId: ORG_ID }),
  188 |       ...createAuthenticatedShellHandlers({
  189 |         orgId: ORG_ID,
  190 |         roles: orgRoleCatalog,
  191 |         skipKeys: true
  192 |       }),
  193 |       ...createDashboardHandlers({ orgId: ORG_ID }),
  194 |       ...createFallbackHandlers()
  195 |     ]);
  196 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  197 | 
  198 |     await openSecuritySection(page);
```