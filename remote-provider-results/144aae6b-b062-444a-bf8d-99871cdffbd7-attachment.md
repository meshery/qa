# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nav-permission-shield.spec.ts >> navigation section authorization >> a section whose every child is denied is shielded, and cannot expand or activate
- Location: e2e/nav-permission-shield.spec.ts:303:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('nav-item-identity')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('nav-item-identity')

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
  216 |     // Key metadata comes from `@meshery/schemas/permissions`, so the tooltip is
  217 |     // only useful when a COMPLETE `Key` is passed as `permissionKey`.
  218 |     await expect(tooltip).toContainText("View Keys");
  219 | 
  220 |     // User context supplied by AppShell's PermissionProvider.
  221 |     await expect(tooltip).toContainText("Ada Lovelace");
  222 |     await expect(tooltip).toContainText("Test Organization");
  223 |     await expect(tooltip).toContainText("viewer");
  224 | 
  225 |     // Regression guard: the org role CATALOG must never be presented as the
  226 |     // viewer's roles, and a role-less catalog row must never render as
  227 |     // "undefined".
  228 |     await expect(tooltip).not.toContainText("billing manager");
  229 |     await expect(tooltip).not.toContainText("undefined");
  230 |   });
  231 | 
  232 |   test("a user with no assigned role in the active org reports None, not the catalog", async ({
  233 |     page
  234 |   }) => {
  235 |     // Pinned as an expected failure: this case asserts the pre-#5931
  236 |     // shield contract. See the block above `shieldToggleFor` - do not
  237 |     // convert it to a skip.
  238 |     test.fail();
  239 |     await mockApi(page, [
  240 |       ...createSharedShellHandlers({
  241 |         user: { ...authenticatedUser, organizations: { organizationsWithRoles: [] } },
  242 |         organizations: [organization]
  243 |       }),
  244 |       ...createPermissionKeysHandler(["VIEW_TOKENS"], { orgId: ORG_ID }),
  245 |       ...createAuthenticatedShellHandlers({
  246 |         orgId: ORG_ID,
  247 |         roles: orgRoleCatalog,
  248 |         skipKeys: true
  249 |       }),
  250 |       ...createDashboardHandlers({ orgId: ORG_ID }),
  251 |       ...createFallbackHandlers()
  252 |     ]);
  253 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  254 | 
  255 |     await openSecuritySection(page);
  256 | 
  257 |     await shieldToggleFor(page, "nav-subitem-keys").click({
  258 |       timeout: SHIELD_TOGGLE_CLICK_TIMEOUT_MS
  259 |     });
  260 | 
  261 |     const tooltip = page.getByRole("tooltip");
  262 |     await expect(tooltip).toContainText("None");
  263 |     await expect(tooltip).not.toContainText("billing manager");
  264 |   });
  265 | });
  266 | 
  267 | /**
  268 |  * Section headers are gated on `{ anyOf: [...every child key...] }`, derived
  269 |  * from their own `subItems`. Before that they were hardcoded `permission: true`,
  270 |  * so a section the user could not reach a single page of still expanded and
  271 |  * navigated, landing them on a not-authorized page.
  272 |  *
  273 |  * The user below holds only VIEW_TOKENS, so "Security" is reachable through one
  274 |  * child and "Identity" through none — the two sides of the contract in one
  275 |  * fixture.
  276 |  */
  277 | test.describe("navigation section authorization", () => {
  278 |   test("a section with a reachable child stays live and un-shielded", async ({
  279 |     page
  280 |   }) => {
  281 |     // Pinned as an expected failure: this case asserts the pre-#5931
  282 |     // shield contract. See the block above `shieldToggleFor` - do not
  283 |     // convert it to a skip.
  284 |     test.fail();
  285 |     await mockApi(page, shellHandlers(["VIEW_TOKENS"]));
  286 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  287 | 
  288 |     await openNavMenu(page);
  289 | 
  290 |     const security = page.getByTestId("nav-item-security");
  291 |     await expect(security).not.toHaveAttribute("aria-disabled", "true");
  292 |     await expect(shieldToggleFor(page, "nav-item-security")).toHaveCount(0);
  293 | 
  294 |     // Still expands, and its denied children are still individually shielded.
  295 |     await page.getByTestId("nav-toggle-security").click();
  296 |     await expect(page.getByTestId("nav-subitem-tokens")).toBeVisible();
  297 |     await expect(page.getByTestId("nav-subitem-keys")).toHaveAttribute(
  298 |       "aria-disabled",
  299 |       "true"
  300 |     );
  301 |   });
  302 | 
  303 |   test("a section whose every child is denied is shielded, and cannot expand or activate", async ({
  304 |     page
  305 |   }) => {
  306 |     // Pinned as an expected failure: this case asserts the pre-#5931
  307 |     // shield contract. See the block above `shieldToggleFor` - do not
  308 |     // convert it to a skip.
  309 |     test.fail();
  310 |     await mockApi(page, shellHandlers(["VIEW_TOKENS"]));
  311 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  312 | 
  313 |     await openNavMenu(page);
  314 | 
  315 |     const identity = page.getByTestId("nav-item-identity");
> 316 |     await expect(identity).toBeVisible();
      |                            ^ Error: expect(locator).toBeVisible() failed
  317 |     await expect(identity).toHaveAttribute("aria-disabled", "true");
  318 |     // The shield is the whole point of defect 2's sibling: a disabled control
  319 |     // that says nothing is what the user was left with.
  320 |     await expect(shieldToggleFor(page, "nav-item-identity")).toHaveCount(1);
  321 | 
  322 |     // Disabled STYLING is not the contract — inertness is. Both clicks are
  323 |     // forced so the assertion cannot pass merely because the control was
  324 |     // unhittable.
  325 |     await page.getByTestId("nav-toggle-identity").click({ force: true });
  326 |     await expect(page.getByTestId("nav-subitem-users")).toHaveCount(0);
  327 | 
  328 |     await identity.click({ force: true });
  329 |     await expect(page.getByTestId("nav-subitem-users")).toHaveCount(0);
  330 |     await expect(page).toHaveURL(/\/dashboard/);
  331 |   });
  332 | 
  333 |   test("a section whose own header destination is public stays live and expandable", async ({
  334 |     page
  335 |   }) => {
  336 |     // Pinned as an expected failure: this case asserts the pre-#5931
  337 |     // shield contract. See the block above `shieldToggleFor` - do not
  338 |     // convert it to a skip.
  339 |     test.fail();
  340 |     // Catalog's header opens /catalog, which renders for everyone. The user
  341 |     // below holds none of the three catalog keys, so deriving the header from
  342 |     // its children alone would shield a page they can still open — a narrowing
  343 |     // of navigation, which is worse than the bug being fixed.
  344 |     await mockApi(page, shellHandlers(["VIEW_TOKENS"]));
  345 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  346 | 
  347 |     await openNavMenu(page);
  348 | 
  349 |     const catalog = page.getByTestId("nav-item-catalog");
  350 |     await expect(catalog).toBeVisible();
  351 |     await expect(catalog).not.toHaveAttribute("aria-disabled", "true");
  352 |     await expect(shieldToggleFor(page, "nav-item-catalog")).toHaveCount(0);
  353 | 
  354 |     // Expands for real, and its denied children are still shielded one by one.
  355 |     await page.getByTestId("nav-toggle-catalog").click();
  356 |     await expect(page.getByTestId("nav-subitem-designs")).toBeVisible();
  357 |     await expect(page.getByTestId("nav-subitem-designs")).toHaveAttribute(
  358 |       "aria-disabled",
  359 |       "true"
  360 |     );
  361 |   });
  362 | 
  363 |   test("the shield names every key the section is unreachable through", async ({
  364 |     page
  365 |   }) => {
  366 |     // Pinned as an expected failure: this case asserts the pre-#5931
  367 |     // shield contract. See the block above `shieldToggleFor` - do not
  368 |     // convert it to a skip.
  369 |     test.fail();
  370 |     await mockApi(page, shellHandlers(["VIEW_TOKENS"]));
  371 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  372 | 
  373 |     await openNavMenu(page);
  374 |     await shieldToggleFor(page, "nav-item-identity").click({
  375 |       timeout: SHIELD_TOGGLE_CLICK_TIMEOUT_MS
  376 |     });
  377 | 
  378 |     const tooltip = page.getByRole("tooltip");
  379 |     await expect(tooltip).toContainText("Authorization Required");
  380 |     // A key set lists every unmet key, not just the first — the section is
  381 |     // gated on the union of its children's keys.
  382 |     await expect(tooltip).toContainText("View All Users");
  383 |     await expect(tooltip).toContainText("View All Organizations");
  384 |     await expect(tooltip).toContainText("View Org");
  385 |   });
  386 | });
  387 | 
  388 | /**
  389 |  * "Organizations" is reachable through EITHER of two keys. It used to carry no
  390 |  * `permissionKey` at all — the single-key prop could not express the OR without
  391 |  * narrowing — so it rendered as disabled with no explanation. Each key is
  392 |  * exercised on its own here, because a narrowing regression only shows up for
  393 |  * the holder of the key that got dropped.
  394 |  */
  395 | test.describe("the Organizations nav item", () => {
  396 |   test("is shielded, not silently disabled, when neither key is held", async ({
  397 |     page
  398 |   }) => {
  399 |     // Pinned as an expected failure: this case asserts the pre-#5931
  400 |     // shield contract. See the block above `shieldToggleFor` - do not
  401 |     // convert it to a skip.
  402 |     test.fail();
  403 |     await mockApi(page, shellHandlers(["VIEW_ALL_USERS"]));
  404 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  405 | 
  406 |     await openIdentitySection(page);
  407 | 
  408 |     await expect(page.getByTestId("nav-subitem-organizations")).toHaveAttribute(
  409 |       "aria-disabled",
  410 |       "true"
  411 |     );
  412 | 
  413 |     await shieldToggleFor(page, "nav-subitem-organizations").click({
  414 |       timeout: SHIELD_TOGGLE_CLICK_TIMEOUT_MS
  415 |     });
  416 | 
```