# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: permissions.spec.ts >> permission gates — catalog destructive actions >> denied: UNPUBLISH_DESIGN missing suppresses the unpublish control
- Location: e2e/permissions.spec.ts:199:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Locked Published Design').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('Locked Published Design').first()

```

```yaml
- banner:
  - link "logo":
    - /url: /
    - paragraph:
      - img "logo"
  - combobox:
    - img
    - text: Test Organization
  - img
  - button:
    - img
- heading "Catalog" [level=1]
- tablist "scrollable auto tabs example":
  - tab "Catalog" [selected]:
    - img
    - text: Catalog
  - tab "Leaderboard":
    - img
    - text: Leaderboard
  - tab "My Designs":
    - img
    - text: My Designs
  - tab "My Views" [disabled]:
    - img
    - text: My Views
  - tab "Requests" [disabled]:
    - img
    - text: Requests
- button "Get Help"
- button "Try Again"
- button "Feedback"
- img
- paragraph: Feedback
- img
- img
- button "Issue":
  - img
  - paragraph: Issue
- button "Suggestion":
  - img
  - paragraph: Suggestion
- button "Meet Request":
  - img
  - paragraph: Meet Request
- textbox "I’m having an issue with...": "An error occurred on the page at http://localhost:3000/catalog on 8/7/2026, 6:30:04 PM. Error Details: Cannot read properties of undefined (reading 'toString'). System Version: Not Available"
- checkbox [checked]
- img
- paragraph: We may email you for more information or updates
- button "Send"
- navigation "Active Users (0)":
  - heading "Active Users (0)" [level=6]:
    - text: Active Users
    - paragraph: (0)
  - img
- button "Feedback"
- img
- paragraph: Feedback
- img
- img
- button "Issue":
  - img
  - paragraph: Issue
- button "Suggestion":
  - img
  - paragraph: Suggestion
- button "Meet Request":
  - img
  - paragraph: Meet Request
- textbox "I’m having an issue with..."
- checkbox
- img
- paragraph: We may email you for more information or updates
- button "Send" [disabled]
- alert
```

# Test source

```ts
  133 | 
  134 |   test("denied: VIEW_TOKENS missing hides the entire tokens UI", async ({ page }) => {
  135 |     await mockApi(page, [
  136 |       ...createSharedShellHandlers({
  137 |         user: authenticatedUser,
  138 |         organizations: [organization]
  139 |       }),
  140 |       ...createPermissionKeysHandler([]),
  141 |       ...createAuthenticatedShellHandlers({ orgId: "org-1" }),
  142 |       ...createTokensHandlers({
  143 |         tokens: [
  144 |           {
  145 |             id: "tok-visible",
  146 |             name: "Should NOT render",
  147 |             created_at: "2026-01-01T00:00:00Z"
  148 |           }
  149 |         ]
  150 |       }),
  151 |       ...createFallbackHandlers()
  152 |     ]);
  153 | 
  154 |     await page.goto("/security/tokens", { waitUntil: "domcontentloaded" });
  155 | 
  156 |     await expect(page.getByText("Should NOT render")).toHaveCount(0);
  157 |   });
  158 | });
  159 | 
  160 | test.describe("permission gates — CREATE_WORKSPACE", () => {
  161 |   test("granted: Create workspace button enabled", async ({ page }) => {
  162 |     await mockApi(page, [
  163 |       ...createSharedShellHandlers({
  164 |         user: authenticatedUser,
  165 |         organizations: [organization]
  166 |       }),
  167 |       ...createPermissionKeysHandler(["VIEW_WORKSPACE", "CREATE_WORKSPACE"]),
  168 |       ...createAuthenticatedShellHandlers({ orgId: "org-1" }),
  169 |       ...createWorkspacesCRUDHandlers({ workspaces: [] }),
  170 |       ...createFallbackHandlers()
  171 |     ]);
  172 | 
  173 |     await page.goto("/spaces/workspaces", { waitUntil: "domcontentloaded" });
  174 | 
  175 |     const createButton = page.getByRole("button", { name: /create/i }).first();
  176 |     await expect(createButton).toBeEnabled();
  177 |   });
  178 | 
  179 |   test("denied: Create workspace button disabled", async ({ page }) => {
  180 |     await mockApi(page, [
  181 |       ...createSharedShellHandlers({
  182 |         user: authenticatedUser,
  183 |         organizations: [organization]
  184 |       }),
  185 |       ...createPermissionKeysHandler(["VIEW_WORKSPACE"]),
  186 |       ...createAuthenticatedShellHandlers({ orgId: "org-1" }),
  187 |       ...createWorkspacesCRUDHandlers({ workspaces: [] }),
  188 |       ...createFallbackHandlers()
  189 |     ]);
  190 | 
  191 |     await page.goto("/spaces/workspaces", { waitUntil: "domcontentloaded" });
  192 | 
  193 |     const createButton = page.getByRole("button", { name: /create/i }).first();
  194 |     await expect(createButton).toBeDisabled();
  195 |   });
  196 | });
  197 | 
  198 | test.describe("permission gates — catalog destructive actions", () => {
  199 |   test("denied: UNPUBLISH_DESIGN missing suppresses the unpublish control", async ({
  200 |     page
  201 |   }) => {
  202 |     await mockApi(page, [
  203 |       ...createSharedShellHandlers({
  204 |         user: authenticatedUser,
  205 |         organizations: [organization]
  206 |       }),
  207 |       // Viewer can browse but cannot unpublish.
  208 |       ...createPermissionKeysHandler(["VIEW_CATALOG", "VIEW_DESIGNS"]),
  209 |       ...createAuthenticatedShellHandlers({ orgId: "org-1" }),
  210 |       ...createCatalogCRUDHandlers({
  211 |         patterns: [
  212 |           {
  213 |             id: "pat-1",
  214 |             name: "Locked Published Design",
  215 |             user_id: "user-1",
  216 |             pattern_file: "{}",
  217 |             visibility: "published",
  218 |             catalog_data: { type: "Deployment", content_class: "community" },
  219 |             viewCount: 0,
  220 |             cloneCount: 0,
  221 |             downloadCount: 0,
  222 |             shareCount: 0,
  223 |             created_at: "2026-01-01T00:00:00Z",
  224 |             updated_at: "2026-01-01T00:00:00Z"
  225 |           }
  226 |         ]
  227 |       }),
  228 |       ...createFallbackHandlers()
  229 |     ]);
  230 | 
  231 |     await page.goto("/catalog", { waitUntil: "domcontentloaded" });
  232 | 
> 233 |     await expect(page.getByText("Locked Published Design").first()).toBeVisible();
      |                                                                     ^ Error: expect(locator).toBeVisible() failed
  234 |     await expect(page.getByRole("button", { name: /unpublish/i })).toHaveCount(0);
  235 |   });
  236 | });
  237 | 
  238 | // -----------------------------------------------------------------------------
  239 | // Gates repaired by PR #5762.
  240 | //
  241 | // Those five `Keys.X` references named members the schema does not generate, so
  242 | // each gate evaluated against `undefined` rather than a permission id. The
  243 | // in-suite guard (ui/__tests__/architecture/permission-key-existence.test.ts)
  244 | // catches the *dangling name*; the rows below assert the *behavior* the
  245 | // repaired names buy — a granted user reaches the surface and a denied user is
  246 | // refused — which is what a static scan can never prove.
  247 | // -----------------------------------------------------------------------------
  248 | 
  249 | // DefaultError's UNAUTHORIZED presentation (components/general/error-404).
  250 | const PERMISSION_DENIED = /necessary permissions to view this page/i;
  251 | 
  252 | test.describe("permission gates — VIEW_ACADEMY_METRICS (academy console)", () => {
  253 |   test("granted: instructors console clears the permission gate", async ({ page }) => {
  254 |     await mockApi(page, [
  255 |       ...createSharedShellHandlers({
  256 |         user: authenticatedUser,
  257 |         organizations: [organization]
  258 |       }),
  259 |       ...createPermissionKeysHandler(["VIEW_ACADEMY", "VIEW_ACADEMY_METRICS"]),
  260 |       ...createAuthenticatedShellHandlers({ orgId: "org-1" }),
  261 |       ...createFallbackHandlers()
  262 |     ]);
  263 | 
  264 |     await page.goto("/academy/instructors-console", { waitUntil: "domcontentloaded" });
  265 | 
  266 |     // The gate returns PermissionMissingError BEFORE the console's own loading
  267 |     // branch, so the page renders refused until the keys land and the ability
  268 |     // updates. `/api/academy/admin/summary` is unmocked and falls through to
  269 |     // `{}`, which puts the granted user on the non-configured state - the first
  270 |     // post-gate paint. Asserting it is both the coverage (unreachable unless
  271 |     // VIEW_ACADEMY_METRICS resolves and clears) and the settle point that stops
  272 |     // the refusal check below from passing against an unhydrated page.
  273 |     await expect(
  274 |       page.getByText("Train Your Team, Unlock Learning").first()
  275 |     ).toBeVisible();
  276 |     await expect(page.getByText(PERMISSION_DENIED)).toHaveCount(0);
  277 |   });
  278 | 
  279 |   test("denied: instructors console is refused without VIEW_ACADEMY_METRICS", async ({
  280 |     page
  281 |   }) => {
  282 |     await mockApi(page, [
  283 |       ...createSharedShellHandlers({
  284 |         user: authenticatedUser,
  285 |         organizations: [organization]
  286 |       }),
  287 |       // VIEW_ACADEMY alone must NOT unlock the instructor/metrics console.
  288 |       ...createPermissionKeysHandler(["VIEW_ACADEMY"]),
  289 |       ...createAuthenticatedShellHandlers({ orgId: "org-1" }),
  290 |       ...createFallbackHandlers()
  291 |     ]);
  292 | 
  293 |     await page.goto("/academy/instructors-console", { waitUntil: "domcontentloaded" });
  294 | 
  295 |     await expect(page.getByText(PERMISSION_DENIED).first()).toBeVisible();
  296 |   });
  297 | });
  298 | 
  299 | test.describe("permission gates — VIEW_ALL_ROLES (role management)", () => {
  300 |   const sampleRole = {
  301 |     id: "role-1",
  302 |     // The table's name column reads `roleName` (see the columns array in
  303 |     // components/identity/role-management); `name` alone renders blank.
  304 |     roleName: "Gated Role Row",
  305 |     name: "Gated Role Row",
  306 |     description: "Visible only with VIEW_ALL_ROLES",
  307 |     createdAt: "2026-01-01T00:00:00Z",
  308 |     updatedAt: "2026-01-01T00:00:00Z"
  309 |   };
  310 | 
  311 |   // `createAuthenticatedShellHandlers` already answers
  312 |   // `/api/identity/orgs/:orgId/roles` from its `roles` option with the same
  313 |   // envelope, and handlers dispatch first-match-wins, so no dedicated roles
  314 |   // handler is needed here.
  315 |   const rolesHandlers = (granted: Parameters<typeof createPermissionKeysHandler>[0]) => [
  316 |     ...createSharedShellHandlers({
  317 |       user: authenticatedUser,
  318 |       organizations: [organization]
  319 |     }),
  320 |     ...createPermissionKeysHandler(granted),
  321 |     ...createAuthenticatedShellHandlers({ orgId: "org-1", roles: [sampleRole] }),
  322 |     ...createFallbackHandlers()
  323 |   ];
  324 | 
  325 |   test("granted: roles table renders", async ({ page }) => {
  326 |     await mockApi(page, rolesHandlers(["VIEW_ALL_ROLES"]));
  327 | 
  328 |     await page.goto("/identity/roles", { waitUntil: "domcontentloaded" });
  329 | 
  330 |     await expect(page.getByText("Gated Role Row").first()).toBeVisible();
  331 |   });
  332 | 
  333 |   test("denied: roles page falls through to DefaultError", async ({ page }) => {
```