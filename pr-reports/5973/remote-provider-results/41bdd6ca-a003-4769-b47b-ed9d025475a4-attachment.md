# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nav-permission-shield.spec.ts >> navigation permissionKey authorization >> a user with no assigned role in the active org reports None, not the catalog
- Location: e2e/nav-permission-shield.spec.ts:179:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
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
  199 | 
> 200 |     await shieldToggleFor(page, "nav-subitem-keys").click();
      |                                                     ^ Error: locator.click: Test timeout of 60000ms exceeded.
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
  299 |     await shieldToggleFor(page, "nav-item-identity").click();
  300 | 
```