# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nav-permission-gating.spec.ts >> 403 error page permission context >> denied page shows user context from PermissionProvider
- Location: e2e/nav-permission-gating.spec.ts:250:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Test Organization')
Expected: visible
Error: strict mode violation: getByText('Test Organization') resolved to 2 elements:
    1) <span class="css-4u23s0">Test Organization</span> aka getByRole('combobox').getByText('Test Organization')
    2) <p class="MuiTypography-root MuiTypography-body1 css-18d3nb6">Test Organization</p> aka getByRole('main').getByText('Test Organization')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('Test Organization')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e7]:
        - link "logo" [ref=e9] [cursor=pointer]:
          - /url: /
          - paragraph [ref=e10]:
            - img "logo" [ref=e12]
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
          - generic "Profile" [ref=e63] [cursor=pointer]:
            - img [ref=e64]
    - generic [ref=e67]:
      - heading "Subscription" [level=1] [ref=e68]
      - tablist "scrollable auto tabs example" [ref=e71]:
        - tab "Profile" [disabled] [ref=e72]:
          - img [ref=e73]
          - text: Profile
        - tab "Preferences" [disabled] [ref=e75]:
          - img [ref=e76]
          - text: Preferences
        - tab "Subscription" [disabled] [selected] [ref=e80]:
          - img [ref=e81]
          - text: Subscription
        - tab "Plans" [disabled] [ref=e83]:
          - img [ref=e84]
          - text: Plans
    - main [ref=e113]:
      - heading "Oops! It seems like you don't have the necessary permissions to view this page." [level=4] [ref=e115]
      - generic [ref=e117]:
        - generic [ref=e118]:
          - heading "YOUR ACCESS" [level=5] [ref=e119]
          - generic [ref=e120]:
            - paragraph [ref=e121]: Authorization Required
            - paragraph [ref=e122]: Missing requisite key
            - generic [ref=e124]:
              - button "Copy key ID for View Subcription" [ref=e125] [cursor=pointer]:
                - img [ref=e126]
              - paragraph [ref=e128]: View Subcription
            - paragraph [ref=e130]: List and see details of active and inactive subscriptions.
            - generic [ref=e132]:
              - generic [ref=e133]:
                - generic [ref=e135]: Account Management
                - generic [ref=e137]: Subscription
              - link "Key Reference" [ref=e138] [cursor=pointer]:
                - /url: https://docs.meshery.io/reference/references/permissions/
                - text: Key Reference
                - img [ref=e140]
            - generic [ref=e143]:
              - generic [ref=e144]:
                - generic [ref=e145]:
                  - img [ref=e146]
                  - paragraph [ref=e149]: User
                - paragraph [ref=e150]: Ada Lovelace
              - generic [ref=e151]:
                - generic [ref=e152]:
                  - img [ref=e153]
                  - paragraph [ref=e158]: Org
                - paragraph [ref=e159]: Test Organization
              - generic [ref=e160]:
                - generic [ref=e161]:
                  - img [ref=e162]
                  - paragraph [ref=e165]: Role(s)
                - paragraph [ref=e166]: viewer
            - paragraph [ref=e167]: Seeing this message in error? Contact your Admins to request access.
        - separator [ref=e168]
        - generic [ref=e169]:
          - heading "YOUR OPTIONS" [level=5] [ref=e170]
          - generic [ref=e171]:
            - paragraph [ref=e172]: To view the content of this page, switch to an organization where you have the required access using the ‘Switch Organization’ field below.
            - group [ref=e173]:
              - heading "Switch Organization" [level=6] [ref=e174]
              - paragraph [ref=e176]: You do not have the required permission in any of your organizations.
      - generic [ref=e177]:
        - link "Return to Dashboard" [ref=e178] [cursor=pointer]:
          - /url: /
        - button "Contact Us" [ref=e179] [cursor=pointer]
      - paragraph [ref=e180]:
        - text: For more help, please in
        - link "discussion forum" [ref=e181] [cursor=pointer]:
          - /url: https://discuss.meshery.io
        - text: or in the
        - link "Slack workspace" [ref=e182] [cursor=pointer]:
          - /url: https://slack.layer5.io
        - text: .
    - navigation "Active Users (0)" [ref=e183]:
      - generic [ref=e184]:
        - heading "Active Users (0)" [level=6] [ref=e185]:
          - text: Active Users
          - paragraph [ref=e186]: (0)
        - img [ref=e187]
    - generic:
      - button "Feedback" [ref=e189] [cursor=pointer]
      - generic [ref=e191]:
        - generic [ref=e192]:
          - img [ref=e194]
          - paragraph [ref=e197]: Feedback
          - generic [ref=e198]:
            - img [ref=e201]
            - img [ref=e205] [cursor=pointer]
        - generic [ref=e209]:
          - generic [ref=e210]:
            - button "Issue" [ref=e211] [cursor=pointer]:
              - img [ref=e213]
              - paragraph [ref=e215]: Issue
            - button "Suggestion" [ref=e216] [cursor=pointer]:
              - img [ref=e218]
              - paragraph [ref=e224]: Suggestion
            - button "Meet Request" [ref=e225] [cursor=pointer]:
              - img [ref=e227]
              - paragraph [ref=e232]: Meet Request
          - textbox "I’m having an issue with..." [ref=e234]
        - generic [ref=e236]:
          - generic [ref=e237]:
            - generic [ref=e238] [cursor=pointer]:
              - checkbox [ref=e239]
              - img [ref=e240]
            - paragraph [ref=e242]: We may email you for more information or updates
          - button "Send" [disabled]
  - alert [ref=e243]
```

# Test source

```ts
  163 |     await openNavMenu(page);
  164 | 
  165 |     const catalog = page.getByTestId("nav-item-catalog");
  166 |     await expect(catalog).toBeVisible();
  167 |     await expect(catalog).not.toHaveAttribute("aria-disabled", "true");
  168 | 
  169 |     // Expands, but denied children are hidden
  170 |     await page.getByTestId("nav-toggle-catalog").click();
  171 |     await expect(page.getByTestId("nav-subitem-designs")).toHaveCount(0);
  172 |   });
  173 | });
  174 | 
  175 | // ---------------------------------------------------------------------------
  176 | // Part 2: Organizations item — OR-gated on two keys
  177 | // ---------------------------------------------------------------------------
  178 | 
  179 | test.describe("the Organizations nav item (hide)", () => {
  180 |   test("is hidden when neither key is held", async ({ page }) => {
  181 |     await mockApi(page, shellHandlers(["VIEW_ALL_USERS"]));
  182 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  183 | 
  184 |     await openNavMenu(page);
  185 | 
  186 |     // Identity section itself should be visible (VIEW_ALL_USERS is granted)
  187 |     await page.getByTestId("nav-toggle-identity").click();
  188 |     await expect(page.getByTestId("nav-subitem-users")).toBeVisible();
  189 | 
  190 |     // Neither VIEW_ALL_ORGANIZATIONS nor VIEW_ORGANIZATIONS → hidden
  191 |     await expect(page.getByTestId("nav-subitem-organizations")).toHaveCount(0);
  192 |   });
  193 | 
  194 |   test("stays visible for a holder of View All Organizations only", async ({
  195 |     page
  196 |   }) => {
  197 |     await mockApi(page, shellHandlers(["VIEW_ALL_ORGANIZATIONS"]));
  198 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  199 | 
  200 |     await openNavMenu(page);
  201 |     await page.getByTestId("nav-toggle-identity").click();
  202 | 
  203 |     const organizations = page.getByTestId("nav-subitem-organizations");
  204 |     await expect(organizations).toBeVisible();
  205 |   });
  206 | 
  207 |   test("stays visible for a holder of View Org only", async ({ page }) => {
  208 |     await mockApi(page, shellHandlers(["VIEW_ORGANIZATIONS"]));
  209 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  210 | 
  211 |     await openNavMenu(page);
  212 |     await page.getByTestId("nav-toggle-identity").click();
  213 | 
  214 |     const organizations = page.getByTestId("nav-subitem-organizations");
  215 |     await expect(organizations).toBeVisible();
  216 |   });
  217 | });
  218 | 
  219 | // ---------------------------------------------------------------------------
  220 | // Part 3: 403 page proves a denied user is told which permission they need
  221 | //
  222 | // The nav shield is gone, but the 403 error page still renders
  223 | // `PermissionSessionContext` with the key name and user context. This is the
  224 | // only surface that tells a denied user what they are missing.
  225 | // ---------------------------------------------------------------------------
  226 | 
  227 | test.describe("403 error page permission context", () => {
  228 |   test("denied page shows Authorization Required with the missing key name", async ({
  229 |     page
  230 |   }) => {
  231 |     // Grant nothing relevant to subscriptions
  232 |     await mockApi(page, shellHandlers(["VIEW_TOKENS"]));
  233 | 
  234 |     // Navigate directly to a page gated on VIEW_SUBSCRIPTIONS
  235 |     await page.goto("/account/subscriptions", { waitUntil: "domcontentloaded" });
  236 | 
  237 |     // The 403 page should render
  238 |     await expect(page.getByText("Authorization Required")).toBeVisible({
  239 |       timeout: 15000
  240 |     });
  241 | 
  242 |     // The specific key function name must be visible
  243 |     // (Keys.AccountManagementViewSubcription has function: "View Subcription")
  244 |     await expect(page.getByText(/View Sub[cs]ription/i)).toBeVisible();
  245 | 
  246 |     // The YOUR ACCESS section renders
  247 |     await expect(page.getByText("YOUR ACCESS")).toBeVisible();
  248 |   });
  249 | 
  250 |   test("denied page shows user context from PermissionProvider", async ({
  251 |     page
  252 |   }) => {
  253 |     await mockApi(page, shellHandlers(["VIEW_TOKENS"]));
  254 |     await page.goto("/account/subscriptions", { waitUntil: "domcontentloaded" });
  255 | 
  256 |     // Wait for the 403 page to fully render
  257 |     await expect(page.getByText("Authorization Required")).toBeVisible({
  258 |       timeout: 15000
  259 |     });
  260 | 
  261 |     // User identity from PermissionProvider
  262 |     await expect(page.getByText("Ada Lovelace")).toBeVisible();
> 263 |     await expect(page.getByText("Test Organization")).toBeVisible();
      |                                                       ^ Error: expect(locator).toBeVisible() failed
  264 | 
  265 |     // The viewer's ASSIGNED role, not the org's role catalog
  266 |     await expect(page.getByText("viewer")).toBeVisible();
  267 |     await expect(page.getByText("billing manager")).not.toBeVisible();
  268 |   });
  269 | });
  270 | 
```