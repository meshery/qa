# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nav-permission-shield.spec.ts >> the Organizations nav item >> stays visible for a provider admin holding ONLY View All Organizations
- Location: e2e/nav-permission-shield.spec.ts:423:7

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
  125 | /**
  126 |  * EXPECTED TO FAIL - a standing contract contradiction inside the repo, not a
  127 |  * regression from any branch that inherits it.
  128 |  *
  129 |  * Everything above describes the shield-and-disable behaviour nav gating had
  130 |  * until https://github.com/layer5io/meshery-cloud/pull/5931 gave every gated
  131 |  * nav item and `withSectionPermissions` `permissionAction: 'hide'`. A denied
  132 |  * entry now renders NOTHING, so there is no `aria-disabled` to read, no shield
  133 |  * sibling to click and no tooltip to name the missing key. Ten of the eleven
  134 |  * cases below therefore cannot pass - only "granted key leaves the nav item
  135 |  * enabled and un-shielded" describes an item that still renders.
  136 |  *
  137 |  * Which contract wins is an open PRODUCT decision, owned by
  138 |  * https://github.com/layer5io/meshery-cloud/issues/5976 (a denied user is no
  139 |  * longer told which permission they need) with
  140 |  * https://github.com/layer5io/meshery-cloud/pull/5978 - an outside
  141 |  * contribution - as one proposed resolution. This branch does not settle it and
  142 |  * deliberately ships no second rewrite of this spec.
  143 |  *
  144 |  * What it does do is stop the disagreement being reported as anonymous suite
  145 |  * noise. `test.fail()` rather than `test.skip()`, per the rule this branch
  146 |  * exists to enforce: a skip is indistinguishable from a pass, whereas a pin
  147 |  * still RUNS each case, still reports it, and turns the suite RED the moment
  148 |  * the assertion starts holding again - which is exactly what restoring the
  149 |  * shield would do. Whoever settles #5976 is forced to deal with this file
  150 |  * rather than leaving it to rot behind a green tick.
  151 |  *
  152 |  * Each `test.fail()` sits INSIDE its own body on purpose: in the describe scope
  153 |  * it is a modifier on the whole suite, and it would mark the one genuinely
  154 |  * passing case as an expected failure too.
  155 |  */
  156 | 
  157 | /**
  158 |  * Playwright only treats a `test.fail()` case as an expected failure when it
  159 |  * ends in `failed`; one that ends in `timedOut` is still reported as a real
  160 |  * failure (measured). `.click()` carries no action timeout in
  161 |  * playwright.config.ts, so clicking a shield that `hide` never rendered would
  162 |  * consume the whole 60s test timeout and stay red under the pin. Cap it so the
  163 |  * case fails deterministically instead - generous against a restored shield,
  164 |  * which renders synchronously with the nav item it wraps.
  165 |  */
  166 | const SHIELD_TOGGLE_CLICK_TIMEOUT_MS = 10_000;
  167 | 
  168 | test.describe("navigation permissionKey authorization", () => {
  169 |   test("granted key leaves the nav item enabled and un-shielded", async ({ page }) => {
  170 |     await mockApi(page, shellHandlers(["VIEW_TOKENS"]));
  171 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  172 | 
  173 |     await openSecuritySection(page);
  174 | 
  175 |     const tokens = page.getByTestId("nav-subitem-tokens");
  176 |     await expect(tokens).not.toHaveAttribute("aria-disabled", "true");
  177 |     // PermissionShield wraps the item only when the key is denied.
  178 |     await expect(shieldToggleFor(page, "nav-subitem-tokens")).toHaveCount(0);
  179 |   });
  180 | 
  181 |   test("denied key disables the nav item and shields it", async ({ page }) => {
  182 |     // Pinned as an expected failure: this case asserts the pre-#5931
  183 |     // shield contract. See the block above `shieldToggleFor` - do not
  184 |     // convert it to a skip.
  185 |     test.fail();
  186 |     await mockApi(page, shellHandlers(["VIEW_TOKENS"]));
  187 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  188 | 
  189 |     await openSecuritySection(page);
  190 | 
  191 |     // VIEW_KEYS was not granted.
  192 |     await expect(page.getByTestId("nav-subitem-keys")).toHaveAttribute(
  193 |       "aria-disabled",
  194 |       "true"
  195 |     );
  196 |   });
  197 | 
  198 |   test("shield tooltip names the missing key and the viewer's ASSIGNED roles", async ({
```