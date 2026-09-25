# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nav-permission-shield.spec.ts >> navigation permissionKey authorization >> a user with no assigned role in the active org reports None, not the catalog
- Location: e2e/nav-permission-shield.spec.ts:232:7

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByTestId('nav-subitem-keys').locator('../following-sibling::*[1]')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e7]:
        - link [ref=e9] [cursor=pointer]:
          - /url: /
          - paragraph [ref=e10]:
            - img [ref=e12]
        - generic [ref=e15]:
          - combobox [ref=e16] [cursor=pointer]:
            - img [ref=e18]
            - generic [ref=e43]: Test Organization
          - textbox: org-1
          - img
          - group
        - img [ref=e47] [cursor=pointer]
        - generic [ref=e59]:
          - button [ref=e60] [cursor=pointer]:
            - img [ref=e61]
          - img [ref=e65] [cursor=pointer]
    - generic [ref=e71]:
      - generic [ref=e74]:
        - generic [ref=e75]:
          - img [ref=e76]
          - generic [ref=e79]: GETTING STARTED
        - generic [ref=e80]:
          - paragraph [ref=e81]: New here? Follow along these guided tasks to help you get the most of your account.
          - paragraph [ref=e82]:
            - generic [ref=e85]: 0%
          - button [ref=e87] [cursor=pointer]: Start
      - generic [ref=e91]:
        - generic [ref=e92]:
          - img [ref=e93]
          - generic [ref=e95]: LEARN BY VIDEO
        - generic [ref=e96]:
          - paragraph [ref=e97]: From Whiteboard to Workload. Give your brain a break from YAML. Watch Layer5 tools in-action.
          - button [ref=e99] [cursor=pointer]: Watch
      - generic [ref=e102]:
        - generic [ref=e103]:
          - img [ref=e104]
          - heading [level=6] [ref=e129]: CLOUD NATIVE PLAYGROUND
        - generic [ref=e130]:
          - paragraph [ref=e131]: Explore visual and collaborative infrastructure as code in the Meshery playground.
          - button [ref=e133] [cursor=pointer]: Request Access
      - generic [ref=e135]:
        - generic [ref=e136]:
          - generic [ref=e137]:
            - img [ref=e138]
            - generic [ref=e147]: CATALOG DESIGNS
          - generic [ref=e149]:
            - heading [level=2] [ref=e150]: "0"
            - paragraph [ref=e151]: Designs
        - link [ref=e153] [cursor=pointer]:
          - /url: /catalog
          - button [ref=e154]: See All
      - generic [ref=e157]:
        - generic [ref=e158]:
          - img [ref=e159]
          - heading [level=6] [ref=e163]: HELP CENTER
        - list [ref=e165]:
          - listitem [ref=e166]:
            - img [ref=e168]
            - link [ref=e177] [cursor=pointer]:
              - /url: /academy
              - text: Academy
            - superscript [ref=e178]:
              - img [ref=e179]
          - listitem [ref=e181]:
            - img [ref=e183]
            - link [ref=e192] [cursor=pointer]:
              - /url: https://docs.layer5.io/
              - text: Docs
            - superscript [ref=e193]:
              - img [ref=e194]
          - listitem [ref=e196]:
            - img [ref=e198]
            - link [ref=e207] [cursor=pointer]:
              - /url: https://docs.layer5.io/videos
              - text: Learn by Video
            - superscript [ref=e208]:
              - img [ref=e209]
          - listitem [ref=e211]:
            - img [ref=e213]
            - link [ref=e222] [cursor=pointer]:
              - /url: /support
              - text: Support Request
          - listitem [ref=e223]:
            - img [ref=e225]
            - link [ref=e234] [cursor=pointer]:
              - /url: https://discuss.meshery.io
              - text: Discussion Forum
            - superscript [ref=e235]:
              - img [ref=e236]
          - listitem [ref=e238]:
            - img [ref=e240]
            - link [ref=e249] [cursor=pointer]:
              - /url: https://slack.layer5.io
              - text: Slack
            - superscript [ref=e250]:
              - img [ref=e251]
          - listitem [ref=e253]:
            - img [ref=e255]
            - link [ref=e264] [cursor=pointer]:
              - /url: https://calendar.google.com/calendar/appointments/schedules/AcZssZ3pmcApaDP4xd8hvG5fy8ylxuFxD3akIRc5vpWJ60q-HemQi80SFFAVftbiIsq9pgiA2o8yvU56?gv=true
              - text: Meet with Team Member
            - superscript [ref=e265]:
              - img [ref=e266]
      - generic [ref=e270]:
        - generic [ref=e271]:
          - img [ref=e272]
          - generic [ref=e274]: RECOGNITION
        - generic [ref=e275]:
          - paragraph [ref=e276]: Find your latest badges here as they are awarded.
          - generic [ref=e278]:
            - text: Learn more about the
            - link [ref=e279] [cursor=pointer]:
              - /url: https://badges.layer5.io
              - text: recognition program
            - superscript [ref=e280]:
              - img [ref=e281]
            - text: and how you can earn badges.
          - link [ref=e284] [cursor=pointer]:
            - /url: /user/user-1?tab=badges
            - text: See All
    - navigation [ref=e285]:
      - generic [ref=e286]:
        - heading [level=6] [ref=e287]:
          - text: Active Users
          - paragraph [ref=e288]: (0)
        - img [ref=e289]
    - button [ref=e291] [cursor=pointer]: Feedback
    - generic [ref=e293]:
      - generic [ref=e294]:
        - img [ref=e296]
        - paragraph [ref=e299]: Feedback
        - generic [ref=e300]:
          - img [ref=e303]
          - img [ref=e307] [cursor=pointer]
      - generic [ref=e311]:
        - generic [ref=e312]:
          - button [ref=e313] [cursor=pointer]:
            - img [ref=e315]
            - paragraph [ref=e317]: Issue
          - button [ref=e318] [cursor=pointer]:
            - img [ref=e320]
            - paragraph [ref=e326]: Suggestion
          - button [ref=e327] [cursor=pointer]:
            - img [ref=e329]
            - paragraph [ref=e334]: Meet Request
        - textbox [ref=e336]:
          - /placeholder: I’m having an issue with...
      - generic [ref=e338]:
        - generic [ref=e339]:
          - generic [ref=e340] [cursor=pointer]:
            - checkbox [ref=e341]
            - img [ref=e342]
          - paragraph [ref=e344]: We may email you for more information or updates
        - button [disabled]: Send
  - alert [ref=e345]
  - menu [ref=e348]:
    - menuitem "Dashboard" [ref=e349] [cursor=pointer]:
      - listitem [ref=e350]:
        - img [ref=e352]
        - generic [ref=e359]: Dashboard
    - menuitem "Security" [active] [ref=e360] [cursor=pointer]:
      - listitem [ref=e361]:
        - img [ref=e363]
        - generic [ref=e370]: Security
      - img [ref=e373]
    - menuitem "Tokens" [ref=e378] [cursor=pointer]:
      - listitem [ref=e379]:
        - img [ref=e381]
        - generic [ref=e384]: Tokens
    - separator [ref=e385]
    - menuitem "Catalog" [ref=e386] [cursor=pointer]:
      - listitem [ref=e387]:
        - img [ref=e389]
        - generic [ref=e395]: Catalog
      - img [ref=e398]
    - separator [ref=e400]
    - menuitem "Academy" [ref=e401] [cursor=pointer]:
      - listitem [ref=e402]:
        - img [ref=e404]
        - generic [ref=e409]: Academy
      - img [ref=e412]
    - menuitem "Support" [ref=e414] [cursor=pointer]:
      - listitem [ref=e415]:
        - img [ref=e417]
        - generic [ref=e433]: Support
      - img [ref=e436]
    - separator [ref=e438]
    - menuitem "Logout" [ref=e439] [cursor=pointer]:
      - listitem [ref=e440]:
        - img [ref=e442]
        - generic [ref=e446]: Logout
```

# Test source

```ts
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
  199 |     page
  200 |   }) => {
  201 |     // Pinned as an expected failure: this case asserts the pre-#5931
  202 |     // shield contract. See the block above `shieldToggleFor` - do not
  203 |     // convert it to a skip.
  204 |     test.fail();
  205 |     await mockApi(page, shellHandlers(["VIEW_TOKENS"]));
  206 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  207 | 
  208 |     await openSecuritySection(page);
  209 | 
  210 |     await shieldToggleFor(page, "nav-subitem-keys").click({
  211 |       timeout: SHIELD_TOGGLE_CLICK_TIMEOUT_MS
  212 |     });
  213 | 
  214 |     const tooltip = page.getByRole("tooltip");
  215 |     await expect(tooltip).toContainText("Authorization Required");
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
> 257 |     await shieldToggleFor(page, "nav-subitem-keys").click({
      |                                                     ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
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
```