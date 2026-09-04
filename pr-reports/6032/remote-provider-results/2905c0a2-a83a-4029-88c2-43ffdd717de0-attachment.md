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
    - generic [ref=e70]:
      - generic [ref=e73]:
        - generic [ref=e74]:
          - img [ref=e75]
          - generic [ref=e78]: GETTING STARTED
        - generic [ref=e79]:
          - paragraph [ref=e80]: New here? Follow along these guided tasks to help you get the most of your account.
          - paragraph [ref=e81]:
            - generic [ref=e84]: 0%
          - button [ref=e86] [cursor=pointer]: Start
      - generic [ref=e90]:
        - generic [ref=e91]:
          - img [ref=e92]
          - generic [ref=e94]: LEARN BY VIDEO
        - generic [ref=e95]:
          - paragraph [ref=e96]: From Whiteboard to Workload. Give your brain a break from YAML. Watch Layer5 tools in-action.
          - button [ref=e98] [cursor=pointer]: Watch
      - generic [ref=e101]:
        - generic [ref=e102]:
          - img [ref=e103]
          - heading [level=6] [ref=e128]: CLOUD NATIVE PLAYGROUND
        - generic [ref=e129]:
          - paragraph [ref=e130]: Explore visual and collaborative infrastructure as code in the Meshery playground.
          - button [ref=e132] [cursor=pointer]: Request Access
      - generic [ref=e134]:
        - generic [ref=e135]:
          - generic [ref=e136]:
            - img [ref=e137]
            - generic [ref=e146]: CATALOG DESIGNS
          - generic [ref=e148]:
            - heading [level=2] [ref=e149]: "0"
            - paragraph [ref=e150]: Designs
        - link [ref=e152] [cursor=pointer]:
          - /url: /catalog
          - button [ref=e153]: See All
      - generic [ref=e156]:
        - generic [ref=e157]:
          - img [ref=e158]
          - heading [level=6] [ref=e162]: HELP CENTER
        - list [ref=e164]:
          - listitem [ref=e165]:
            - img [ref=e167]
            - link [ref=e176] [cursor=pointer]:
              - /url: /academy
              - text: Academy
            - superscript [ref=e177]:
              - img [ref=e178]
          - listitem [ref=e180]:
            - img [ref=e182]
            - link [ref=e191] [cursor=pointer]:
              - /url: https://docs.layer5.io/
              - text: Docs
            - superscript [ref=e192]:
              - img [ref=e193]
          - listitem [ref=e195]:
            - img [ref=e197]
            - link [ref=e206] [cursor=pointer]:
              - /url: https://docs.layer5.io/videos
              - text: Learn by Video
            - superscript [ref=e207]:
              - img [ref=e208]
          - listitem [ref=e210]:
            - img [ref=e212]
            - link [ref=e221] [cursor=pointer]:
              - /url: /support
              - text: Support Request
          - listitem [ref=e222]:
            - img [ref=e224]
            - link [ref=e233] [cursor=pointer]:
              - /url: https://discuss.meshery.io
              - text: Discussion Forum
            - superscript [ref=e234]:
              - img [ref=e235]
          - listitem [ref=e237]:
            - img [ref=e239]
            - link [ref=e248] [cursor=pointer]:
              - /url: https://slack.layer5.io
              - text: Slack
            - superscript [ref=e249]:
              - img [ref=e250]
          - listitem [ref=e252]:
            - img [ref=e254]
            - link [ref=e263] [cursor=pointer]:
              - /url: https://calendar.google.com/calendar/appointments/schedules/AcZssZ3pmcApaDP4xd8hvG5fy8ylxuFxD3akIRc5vpWJ60q-HemQi80SFFAVftbiIsq9pgiA2o8yvU56?gv=true
              - text: Meet with Team Member
            - superscript [ref=e264]:
              - img [ref=e265]
      - generic [ref=e269]:
        - generic [ref=e270]:
          - img [ref=e271]
          - generic [ref=e273]: RECOGNITION
        - generic [ref=e274]:
          - paragraph [ref=e275]: Find your latest badges here as they are awarded.
          - generic [ref=e277]:
            - text: Learn more about the
            - link [ref=e278] [cursor=pointer]:
              - /url: https://badges.layer5.io
              - text: recognition program
            - superscript [ref=e279]:
              - img [ref=e280]
            - text: and how you can earn badges.
          - link [ref=e283] [cursor=pointer]:
            - /url: /user/user-1?tab=badges
            - text: See All
    - navigation [ref=e284]:
      - generic [ref=e285]:
        - heading [level=6] [ref=e286]:
          - text: Active Users
          - paragraph [ref=e287]: (0)
        - img [ref=e288]
    - button [ref=e290] [cursor=pointer]: Feedback
    - generic [ref=e292]:
      - generic [ref=e293]:
        - img [ref=e295]
        - paragraph [ref=e298]: Feedback
        - generic [ref=e299]:
          - img [ref=e302]
          - img [ref=e306] [cursor=pointer]
      - generic [ref=e310]:
        - generic [ref=e311]:
          - button [ref=e312] [cursor=pointer]:
            - img [ref=e314]
            - paragraph [ref=e316]: Issue
          - button [ref=e317] [cursor=pointer]:
            - img [ref=e319]
            - paragraph [ref=e325]: Suggestion
          - button [ref=e326] [cursor=pointer]:
            - img [ref=e328]
            - paragraph [ref=e333]: Meet Request
        - textbox [ref=e335]:
          - /placeholder: I’m having an issue with...
      - generic [ref=e337]:
        - generic [ref=e338]:
          - generic [ref=e339] [cursor=pointer]:
            - checkbox [ref=e340]
            - img [ref=e341]
          - paragraph [ref=e343]: We may email you for more information or updates
        - button [disabled]: Send
  - alert [ref=e344]
  - menu [ref=e347]:
    - menuitem "Dashboard" [ref=e348] [cursor=pointer]:
      - listitem [ref=e349]:
        - img [ref=e351]
        - generic [ref=e358]: Dashboard
    - menuitem "Security" [active] [ref=e359] [cursor=pointer]:
      - listitem [ref=e360]:
        - img [ref=e362]
        - generic [ref=e369]: Security
      - img [ref=e372]
    - menuitem "Tokens" [ref=e377] [cursor=pointer]:
      - listitem [ref=e378]:
        - img [ref=e380]
        - generic [ref=e383]: Tokens
    - separator [ref=e384]
    - menuitem "Catalog" [ref=e385] [cursor=pointer]:
      - listitem [ref=e386]:
        - img [ref=e388]
        - generic [ref=e394]: Catalog
      - img [ref=e397]
    - separator [ref=e399]
    - menuitem "Academy" [ref=e400] [cursor=pointer]:
      - listitem [ref=e401]:
        - img [ref=e403]
        - generic [ref=e408]: Academy
      - img [ref=e411]
    - menuitem "Support" [ref=e413] [cursor=pointer]:
      - listitem [ref=e414]:
        - img [ref=e416]
        - generic [ref=e432]: Support
      - img [ref=e435]
    - separator [ref=e437]
    - menuitem "Logout" [ref=e438] [cursor=pointer]:
      - listitem [ref=e439]:
        - img [ref=e441]
        - generic [ref=e445]: Logout
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