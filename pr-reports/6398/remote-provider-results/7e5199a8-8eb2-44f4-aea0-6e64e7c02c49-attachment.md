# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nav-permission-shield.spec.ts >> navigation permissionKey authorization >> shield tooltip names the missing key and the viewer's ASSIGNED roles
- Location: e2e/nav-permission-shield.spec.ts:198:7

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
    - menuitem "Security" [active] [ref=e366] [cursor=pointer]:
      - listitem [ref=e367]:
        - generic [ref=e375]: Security
    - menuitem "Tokens" [ref=e384] [cursor=pointer]:
      - listitem [ref=e385]:
        - generic [ref=e389]: Tokens
    - separator [ref=e391]
    - menuitem "Catalog" [ref=e392] [cursor=pointer]:
      - listitem [ref=e393]:
        - generic [ref=e400]: Catalog
    - separator [ref=e406]
    - menuitem "Academy" [ref=e407] [cursor=pointer]:
      - listitem [ref=e408]:
        - generic [ref=e414]: Academy
    - menuitem "Support" [ref=e420] [cursor=pointer]:
      - listitem [ref=e421]:
        - generic [ref=e438]: Support
    - separator [ref=e444]
    - menuitem "Logout" [ref=e445] [cursor=pointer]:
      - listitem [ref=e446]:
        - generic [ref=e451]: Logout
```

# Test source

```ts
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
> 210 |     await shieldToggleFor(page, "nav-subitem-keys").click({
      |                                                     ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
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
```