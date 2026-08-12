# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nav-permission-shield.spec.ts >> navigation permissionKey authorization >> denied key disables the nav item and shields it
- Location: e2e/nav-permission-shield.spec.ts:138:7

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('nav-subitem-keys')
Expected: "true"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('nav-subitem-keys')

```

```yaml
- menu:
  - menuitem "Dashboard":
    - listitem: Dashboard
  - menuitem "Security":
    - listitem:
      - img
      - text: Security
  - menuitem "Tokens":
    - listitem:
      - img
      - text: Tokens
  - separator
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
  98  |   await expect(page.getByTestId("nav-item-security")).toBeVisible();
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
> 145 |     await expect(page.getByTestId("nav-subitem-keys")).toHaveAttribute(
      |                                                        ^ Error: expect(locator).toHaveAttribute(expected) failed
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
  199 | 
  200 |     await shieldToggleFor(page, "nav-subitem-keys").click();
  201 | 
  202 |     const tooltip = page.getByRole("tooltip");
  203 |     await expect(tooltip).toContainText("None");
  204 |     await expect(tooltip).not.toContainText("billing manager");
  205 |   });
  206 | });
  207 | 
  208 | /**
  209 |  * Section headers are gated on `{ anyOf: [...every child key...] }`, derived
  210 |  * from their own `subItems`. Before that they were hardcoded `permission: true`,
  211 |  * so a section the user could not reach a single page of still expanded and
  212 |  * navigated, landing them on a not-authorized page.
  213 |  *
  214 |  * The user below holds only VIEW_TOKENS, so "Security" is reachable through one
  215 |  * child and "Identity" through none — the two sides of the contract in one
  216 |  * fixture.
  217 |  */
  218 | test.describe("navigation section authorization", () => {
  219 |   test("a section with a reachable child stays live and un-shielded", async ({
  220 |     page
  221 |   }) => {
  222 |     await mockApi(page, shellHandlers(["VIEW_TOKENS"]));
  223 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  224 | 
  225 |     await openNavMenu(page);
  226 | 
  227 |     const security = page.getByTestId("nav-item-security");
  228 |     await expect(security).not.toHaveAttribute("aria-disabled", "true");
  229 |     await expect(shieldToggleFor(page, "nav-item-security")).toHaveCount(0);
  230 | 
  231 |     // Still expands, and its denied children are still individually shielded.
  232 |     await page.getByTestId("nav-toggle-security").click();
  233 |     await expect(page.getByTestId("nav-subitem-tokens")).toBeVisible();
  234 |     await expect(page.getByTestId("nav-subitem-keys")).toHaveAttribute(
  235 |       "aria-disabled",
  236 |       "true"
  237 |     );
  238 |   });
  239 | 
  240 |   test("a section whose every child is denied is shielded, and cannot expand or activate", async ({
  241 |     page
  242 |   }) => {
  243 |     await mockApi(page, shellHandlers(["VIEW_TOKENS"]));
  244 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  245 | 
```