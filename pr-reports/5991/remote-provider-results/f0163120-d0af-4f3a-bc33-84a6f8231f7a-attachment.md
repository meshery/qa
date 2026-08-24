# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nav-permission-shield.spec.ts >> navigation section authorization >> the shield names every key the section is unreachable through
- Location: e2e/nav-permission-shield.spec.ts:292:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
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
    - menuitem "Security" [ref=e359] [cursor=pointer]:
      - listitem [ref=e360]:
        - img [ref=e362]
        - generic [ref=e369]: Security
      - img [ref=e372]
    - separator [ref=e374]
    - menuitem "Catalog" [ref=e375] [cursor=pointer]:
      - listitem [ref=e376]:
        - img [ref=e378]
        - generic [ref=e384]: Catalog
      - img [ref=e387]
    - separator [ref=e389]
    - menuitem "Academy" [ref=e390] [cursor=pointer]:
      - listitem [ref=e391]:
        - img [ref=e393]
        - generic [ref=e398]: Academy
      - img [ref=e401]
    - menuitem "Support" [ref=e403] [cursor=pointer]:
      - listitem [ref=e404]:
        - img [ref=e406]
        - generic [ref=e422]: Support
      - img [ref=e425]
    - separator [ref=e427]
    - menuitem "Logout" [ref=e428] [cursor=pointer]:
      - listitem [ref=e429]:
        - img [ref=e431]
        - generic [ref=e435]: Logout
```

# Test source

```ts
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
  285 |     await expect(page.getByTestId("nav-subitem-designs")).toBeVisible();
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
> 299 |     await shieldToggleFor(page, "nav-item-identity").click();
      |                                                      ^ Error: locator.click: Test timeout of 60000ms exceeded.
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