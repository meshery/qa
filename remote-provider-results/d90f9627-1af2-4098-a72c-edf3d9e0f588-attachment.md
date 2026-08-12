# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nav-permission-shield.spec.ts >> navigation section authorization >> a section whose own header destination is public stays live and expandable
- Location: e2e/nav-permission-shield.spec.ts:266:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('nav-subitem-designs')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('nav-subitem-designs')

```

```yaml
- menu:
  - menuitem "Dashboard":
    - listitem: Dashboard
  - menuitem "Security":
    - listitem:
      - img
      - text: Security
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
  246 |     await openNavMenu(page);
  247 | 
  248 |     const identity = page.getByTestId("nav-item-identity");
  249 |     await expect(identity).toBeVisible();
  250 |     await expect(identity).toHaveAttribute("aria-disabled", "true");
  251 |     // The shield is the whole point of defect 2's sibling: a disabled control
  252 |     // that says nothing is what the user was left with.
  253 |     await expect(shieldToggleFor(page, "nav-item-identity")).toHaveCount(1);
  254 | 
  255 |     // Disabled STYLING is not the contract — inertness is. Both clicks are
  256 |     // forced so the assertion cannot pass merely because the control was
  257 |     // unhittable.
  258 |     await page.getByTestId("nav-toggle-identity").click({ force: true });
  259 |     await expect(page.getByTestId("nav-subitem-users")).toHaveCount(0);
  260 | 
  261 |     await identity.click({ force: true });
  262 |     await expect(page.getByTestId("nav-subitem-users")).toHaveCount(0);
  263 |     await expect(page).toHaveURL(/\/dashboard/);
  264 |   });
  265 | 
  266 |   test("a section whose own header destination is public stays live and expandable", async ({
  267 |     page
  268 |   }) => {
  269 |     // Catalog's header opens /catalog, which renders for everyone. The user
  270 |     // below holds none of the three catalog keys, so deriving the header from
  271 |     // its children alone would shield a page they can still open — a narrowing
  272 |     // of navigation, which is worse than the bug being fixed.
  273 |     await mockApi(page, shellHandlers(["VIEW_TOKENS"]));
  274 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  275 | 
  276 |     await openNavMenu(page);
  277 | 
  278 |     const catalog = page.getByTestId("nav-item-catalog");
  279 |     await expect(catalog).toBeVisible();
  280 |     await expect(catalog).not.toHaveAttribute("aria-disabled", "true");
  281 |     await expect(shieldToggleFor(page, "nav-item-catalog")).toHaveCount(0);
  282 | 
  283 |     // Expands for real, and its denied children are still shielded one by one.
  284 |     await page.getByTestId("nav-toggle-catalog").click();
> 285 |     await expect(page.getByTestId("nav-subitem-designs")).toBeVisible();
      |                                                           ^ Error: expect(locator).toBeVisible() failed
  286 |     await expect(page.getByTestId("nav-subitem-designs")).toHaveAttribute(
  287 |       "aria-disabled",
  288 |       "true"
  289 |     );
  290 |   });
  291 | 
  292 |   test("the shield names every key the section is unreachable through", async ({
  293 |     page
  294 |   }) => {
  295 |     await mockApi(page, shellHandlers(["VIEW_TOKENS"]));
  296 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  297 | 
  298 |     await openNavMenu(page);
  299 |     await shieldToggleFor(page, "nav-item-identity").click();
  300 | 
  301 |     const tooltip = page.getByRole("tooltip");
  302 |     await expect(tooltip).toContainText("Authorization Required");
  303 |     // A key set lists every unmet key, not just the first — the section is
  304 |     // gated on the union of its children's keys.
  305 |     await expect(tooltip).toContainText("View All Users");
  306 |     await expect(tooltip).toContainText("View All Organizations");
  307 |     await expect(tooltip).toContainText("View Org");
  308 |   });
  309 | });
  310 | 
  311 | /**
  312 |  * "Organizations" is reachable through EITHER of two keys. It used to carry no
  313 |  * `permissionKey` at all — the single-key prop could not express the OR without
  314 |  * narrowing — so it rendered as disabled with no explanation. Each key is
  315 |  * exercised on its own here, because a narrowing regression only shows up for
  316 |  * the holder of the key that got dropped.
  317 |  */
  318 | test.describe("the Organizations nav item", () => {
  319 |   test("is shielded, not silently disabled, when neither key is held", async ({
  320 |     page
  321 |   }) => {
  322 |     await mockApi(page, shellHandlers(["VIEW_ALL_USERS"]));
  323 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  324 | 
  325 |     await openIdentitySection(page);
  326 | 
  327 |     await expect(page.getByTestId("nav-subitem-organizations")).toHaveAttribute(
  328 |       "aria-disabled",
  329 |       "true"
  330 |     );
  331 | 
  332 |     await shieldToggleFor(page, "nav-subitem-organizations").click();
  333 | 
  334 |     const tooltip = page.getByRole("tooltip");
  335 |     await expect(tooltip).toContainText("Authorization Required");
  336 |     await expect(tooltip).toContainText("View All Organizations");
  337 |     await expect(tooltip).toContainText("View Org");
  338 |   });
  339 | 
  340 |   test("stays visible for a provider admin holding ONLY View All Organizations", async ({
  341 |     page
  342 |   }) => {
  343 |     await mockApi(page, shellHandlers(["VIEW_ALL_ORGANIZATIONS"]));
  344 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  345 | 
  346 |     await openIdentitySection(page);
  347 | 
  348 |     const organizations = page.getByTestId("nav-subitem-organizations");
  349 |     await expect(organizations).not.toHaveAttribute("aria-disabled", "true");
  350 |     await expect(shieldToggleFor(page, "nav-subitem-organizations")).toHaveCount(0);
  351 |   });
  352 | 
  353 |   test("stays visible for an org member holding ONLY View Org", async ({ page }) => {
  354 |     await mockApi(page, shellHandlers(["VIEW_ORGANIZATIONS"]));
  355 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  356 | 
  357 |     await openIdentitySection(page);
  358 | 
  359 |     const organizations = page.getByTestId("nav-subitem-organizations");
  360 |     await expect(organizations).not.toHaveAttribute("aria-disabled", "true");
  361 |     await expect(shieldToggleFor(page, "nav-subitem-organizations")).toHaveCount(0);
  362 |   });
  363 | });
  364 | 
```