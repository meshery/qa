# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nav-permission-shield.spec.ts >> navigation section authorization >> the shield names every key the section is unreachable through
- Location: e2e/nav-permission-shield.spec.ts:363:7

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByTestId('nav-item-identity').locator('../following-sibling::*[1]')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e7]:
        - link [ref=e9] [cursor=pointer]:
          - /url: /
          - paragraph [ref=e10]
        - generic [ref=e15]:
          - combobox [ref=e16] [cursor=pointer]:
            - generic [ref=e43]: Test Organization
          - textbox [aria-hidden]: org-1
          - group [aria-hidden]
        - generic [ref=e46] [cursor=pointer]
        - generic [ref=e59]:
          - button [ref=e60] [cursor=pointer]
          - generic [ref=e64] [cursor=pointer]
    - generic [ref=e71]:
      - generic [ref=e75]:
        - generic [ref=e76]: GETTING STARTED
        - generic [ref=e81]:
          - paragraph [ref=e82]: New here? Follow along these guided tasks to help you get the most of your account.
          - paragraph [ref=e83]:
            - generic [ref=e84] [cursor=pointer]
            - generic [ref=e86]: 0%
          - button [ref=e88] [cursor=pointer]: Start
      - generic [ref=e93]:
        - generic [ref=e94]: LEARN BY VIDEO
        - generic [ref=e98]:
          - paragraph [ref=e99]: From Whiteboard to Workload. Give your brain a break from YAML. Watch Layer5 tools in-action.
          - button [ref=e101] [cursor=pointer]: Watch
      - generic [ref=e105]:
        - heading [level=6] [ref=e132]: CLOUD NATIVE PLAYGROUND
        - generic [ref=e133]:
          - paragraph [ref=e134]: Explore visual and collaborative infrastructure as code in the Meshery playground.
          - button [ref=e136] [cursor=pointer]: Request Access
      - generic [ref=e139]:
        - generic [ref=e140]:
          - generic [ref=e141]: CATALOG DESIGNS
          - generic [ref=e153]:
            - heading [level=2] [ref=e154]: "0"
            - paragraph [ref=e155]: Designs
        - link [ref=e157] [cursor=pointer]:
          - /url: /catalog
          - button [ref=e158]: See All
      - generic [ref=e162]:
        - heading [level=6] [ref=e168]: HELP CENTER
        - list [ref=e170]:
          - listitem [ref=e171]:
            - link [ref=e182] [cursor=pointer]:
              - /url: /academy
              - text: Academy
            - superscript [ref=e183]
          - listitem [ref=e186]:
            - link [ref=e197] [cursor=pointer]:
              - /url: https://docs.layer5.io/
              - text: Docs
            - superscript [ref=e198]
          - listitem [ref=e201]:
            - link [ref=e212] [cursor=pointer]:
              - /url: https://docs.layer5.io/videos
              - text: Learn by Video
            - superscript [ref=e213]
          - listitem [ref=e216]:
            - link [ref=e227] [cursor=pointer]:
              - /url: /support
              - text: Support Request
          - listitem [ref=e228]:
            - link [ref=e239] [cursor=pointer]:
              - /url: https://discuss.meshery.io
              - text: Discussion Forum
            - superscript [ref=e240]
          - listitem [ref=e243]:
            - link [ref=e254] [cursor=pointer]:
              - /url: https://slack.layer5.io
              - text: Slack
            - superscript [ref=e255]
          - listitem [ref=e258]:
            - link [ref=e269] [cursor=pointer]:
              - /url: https://calendar.google.com/calendar/appointments/schedules/AcZssZ3pmcApaDP4xd8hvG5fy8ylxuFxD3akIRc5vpWJ60q-HemQi80SFFAVftbiIsq9pgiA2o8yvU56?gv=true
              - text: Meet with Team Member
            - superscript [ref=e270]
      - generic [ref=e276]:
        - generic [ref=e277]: RECOGNITION
        - generic [ref=e281]:
          - paragraph [ref=e282]: Find your latest badges here as they are awarded.
          - generic [ref=e284]:
            - text: Learn more about the
            - link [ref=e285] [cursor=pointer]:
              - /url: https://badges.layer5.io
              - text: recognition program
            - superscript [ref=e286]
            - text: and how you can earn badges.
          - link [ref=e290] [cursor=pointer]:
            - /url: /user/user-1?tab=badges
            - text: See All
    - navigation [ref=e291]:
      - heading [level=6] [ref=e293]:
        - text: Active Users
        - paragraph [ref=e294]: (0)
    - button [ref=e297] [cursor=pointer]: Feedback
    - generic [ref=e299]:
      - generic [ref=e300]:
        - paragraph [ref=e305]: Feedback
        - generic [ref=e312] [cursor=pointer]
      - generic [ref=e317]:
        - generic [ref=e318]:
          - button [ref=e319] [cursor=pointer]:
            - paragraph [ref=e323]: Issue
          - button [ref=e324] [cursor=pointer]:
            - paragraph [ref=e332]: Suggestion
          - button [ref=e333] [cursor=pointer]:
            - paragraph [ref=e340]: Meet Request
        - textbox [ref=e342]:
          - /placeholder: I’m having an issue with...
      - generic [ref=e344]:
        - generic [ref=e345]:
          - checkbox [ref=e347] [cursor=pointer]
          - paragraph [ref=e350]: We may email you for more information or updates
        - button [disabled]: Send
  - alert [ref=e351]
  - menu [ref=e354]:
    - menuitem "Dashboard" [ref=e355] [cursor=pointer]:
      - listitem [ref=e356]:
        - generic [ref=e364]: Dashboard
    - menuitem "Security" [ref=e366] [cursor=pointer]:
      - listitem [ref=e367]:
        - generic [ref=e375]: Security
    - separator [ref=e381]
    - menuitem "Catalog" [ref=e382] [cursor=pointer]:
      - listitem [ref=e383]:
        - generic [ref=e390]: Catalog
    - separator [ref=e396]
    - menuitem "Academy" [ref=e397] [cursor=pointer]:
      - listitem [ref=e398]:
        - generic [ref=e404]: Academy
    - menuitem "Support" [ref=e410] [cursor=pointer]:
      - listitem [ref=e411]:
        - generic [ref=e428]: Support
    - separator [ref=e434]
    - menuitem "Logout" [ref=e435] [cursor=pointer]:
      - listitem [ref=e436]:
        - generic [ref=e441]: Logout
```

# Test source

```ts
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
  316 |     await expect(identity).toBeVisible();
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
> 374 |     await shieldToggleFor(page, "nav-item-identity").click({
      |                                                      ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
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
  417 |     const tooltip = page.getByRole("tooltip");
  418 |     await expect(tooltip).toContainText("Authorization Required");
  419 |     await expect(tooltip).toContainText("View All Organizations");
  420 |     await expect(tooltip).toContainText("View Org");
  421 |   });
  422 | 
  423 |   test("stays visible for a provider admin holding ONLY View All Organizations", async ({
  424 |     page
  425 |   }) => {
  426 |     // Pinned as an expected failure: this case asserts the pre-#5931
  427 |     // shield contract. See the block above `shieldToggleFor` - do not
  428 |     // convert it to a skip.
  429 |     test.fail();
  430 |     await mockApi(page, shellHandlers(["VIEW_ALL_ORGANIZATIONS"]));
  431 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  432 | 
  433 |     await openIdentitySection(page);
  434 | 
  435 |     const organizations = page.getByTestId("nav-subitem-organizations");
  436 |     await expect(organizations).not.toHaveAttribute("aria-disabled", "true");
  437 |     await expect(shieldToggleFor(page, "nav-subitem-organizations")).toHaveCount(0);
  438 |   });
  439 | 
  440 |   test("stays visible for an org member holding ONLY View Org", async ({ page }) => {
  441 |     // Pinned as an expected failure: this case asserts the pre-#5931
  442 |     // shield contract. See the block above `shieldToggleFor` - do not
  443 |     // convert it to a skip.
  444 |     test.fail();
  445 |     await mockApi(page, shellHandlers(["VIEW_ORGANIZATIONS"]));
  446 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  447 | 
  448 |     await openIdentitySection(page);
  449 | 
  450 |     const organizations = page.getByTestId("nav-subitem-organizations");
  451 |     await expect(organizations).not.toHaveAttribute("aria-disabled", "true");
  452 |     await expect(shieldToggleFor(page, "nav-subitem-organizations")).toHaveCount(0);
  453 |   });
  454 | });
  455 | 
```