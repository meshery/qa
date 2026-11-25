# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: connections.spec.ts >> Connection Management Tests >> Register and connect a Kubernetes cluster via kubeconfig upload
- Location: tests/e2e/connections.spec.ts:193:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /Kubernetes import complete|Configuration saved/i })
Expected: visible
Timeout: 60000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 60000ms
  - waiting for getByRole('heading', { name: /Kubernetes import complete|Configuration saved/i })

```

```yaml
- dialog:
  - text: Create Connection
  - button:
    - img
  - list:
    - listitem:
      - img
      - text: Choose Connection
    - listitem: Import Kubeconfig
    - listitem:
      - img
      - text: Review Contexts
    - listitem:
      - img
      - text: Done
  - img
  - heading "Kubernetes import failed" [level=6]
  - paragraph:
    - text: Nothing was imported. Manage these anytime from
    - link "connections":
      - /url: /management/connections
    - text: .
  - button:
    - img
  - button "Cancel"
  - button "Finish"
```

# Test source

```ts
  149 | 
  150 |       if (!fs.existsSync(MULTI_CONTEXT_KUBECONFIG)) {
  151 |         test.skip(true, 'Multi-context kubeconfig fixture missing.');
  152 |         return;
  153 |       }
  154 | 
  155 |       await openKubernetesWizard(page);
  156 |       await uploadKubeconfig(page, MULTI_CONTEXT_KUBECONFIG);
  157 | 
  158 |       const discoverRes = page
  159 |         .waitForResponse(
  160 |           (response) =>
  161 |             response.url().includes('/api/system/kubernetes/contexts') &&
  162 |             response.request().method() === 'POST',
  163 |           { timeout: 60_000 },
  164 |         )
  165 |         .catch(() => null);
  166 | 
  167 |       await page.getByTestId('connection-wizard-next').click();
  168 | 
  169 |       const response = await discoverRes;
  170 |       if (!response) {
  171 |         test.skip(true, 'Context discovery endpoint unavailable; skipping context listing.');
  172 |         return;
  173 |       }
  174 |       expect(
  175 |         response.status(),
  176 |         `context discovery POST returned ${response.status()} ${response.statusText()}`,
  177 |       ).toBe(200);
  178 | 
  179 |       // The fixture has three contexts (alpha, beta, gamma); each renders one
  180 |       // review row with an editable name field. All three are unreachable, so
  181 |       // none cascades to connected. Assert on the row count rather than a
  182 |       // specific context name (the discovered name is not asserted here).
  183 |       const rows = page.getByTestId('connection-wizard-context-row');
  184 |       await expect(rows).toHaveCount(3);
  185 |       await expect(rows.first().getByRole('textbox')).toBeVisible();
  186 |     },
  187 |   );
  188 | 
  189 |   // TC-1012 (matrix R1): register + connect a cluster by uploading a kubeconfig
  190 |   // through the wizard. Requires a reachable cluster (the host/CI kubeconfig), so
  191 |   // it self-skips when no kubeconfig is present or the import call does not
  192 |   // succeed.
  193 |   test(
  194 |     'Register and connect a Kubernetes cluster via kubeconfig upload',
  195 |     { tag: connTags('kubeconfigConnect') },
  196 |     async ({ page }, testInfo) => {
  197 |       await annotateConnCase(testInfo, 'kubeconfigConnect');
  198 |       test.slow();
  199 | 
  200 |       if (!fs.existsSync(HOST_KUBECONFIG)) {
  201 |         test.skip(true, 'No host kubeconfig available to register a cluster.');
  202 |         return;
  203 |       }
  204 | 
  205 |       await openKubernetesWizard(page);
  206 |       await uploadKubeconfig(page, HOST_KUBECONFIG);
  207 | 
  208 |       // Step 1 -> 2: discover the contexts in the uploaded kubeconfig.
  209 |       const discoverRes = page
  210 |         .waitForResponse(
  211 |           (response) =>
  212 |             response.url().includes('/api/system/kubernetes/contexts') &&
  213 |             response.request().method() === 'POST',
  214 |           { timeout: 60_000 },
  215 |         )
  216 |         .catch(() => null);
  217 |       await page.getByTestId('connection-wizard-next').click();
  218 |       const discovered = await discoverRes;
  219 |       if (!discovered || discovered.status() !== 200) {
  220 |         test.skip(true, 'Context discovery failed; cannot register cluster.');
  221 |         return;
  222 |       }
  223 |       await expect(page.getByTestId('connection-wizard-context-row').first()).toBeVisible();
  224 | 
  225 |       // Step 2 -> 3: import the selected contexts (POST /api/system/kubernetes).
  226 |       const importRes = page
  227 |         .waitForResponse(
  228 |           (response) =>
  229 |             response.url().endsWith('/api/system/kubernetes') &&
  230 |             response.request().method() === 'POST',
  231 |           { timeout: 90_000 },
  232 |         )
  233 |         .catch(() => null);
  234 |       await page.getByTestId('connection-wizard-next').click();
  235 |       const imported = await importRes;
  236 | 
  237 |       if (!imported) {
  238 |         test.skip(true, 'Kubeconfig import did not complete in this environment.');
  239 |         return;
  240 |       }
  241 |       expect(
  242 |         imported.status(),
  243 |         `kubeconfig import POST returned ${imported.status()} ${imported.statusText()}`,
  244 |       ).toBe(200);
  245 | 
  246 |       // The receipt step confirms the import.
  247 |       await expect(
  248 |         page.getByRole('heading', { name: /Kubernetes import complete|Configuration saved/i }),
> 249 |       ).toBeVisible();
      |         ^ Error: expect(locator).toBeVisible() failed
  250 |     },
  251 |   );
  252 | 
  253 |   // TC-1061 (matrix X1): transition a connected cluster to disconnected (and back),
  254 |   // via the table status dropdown and the shared confirmation modal. Requires a
  255 |   // pre-connected cluster, so it self-skips in environments without one.
  256 |   test(
  257 |     'Transition a Kubernetes connection between lifecycle states',
  258 |     { tag: connTags('stateTransition') },
  259 |     async ({ page, clusterMetaData }, testInfo) => {
  260 |       await annotateConnCase(testInfo, 'stateTransition');
  261 |       test.slow();
  262 | 
  263 |       // Narrow to the connected data row for the cluster under test.
  264 |       await page.getByTestId('ConnectionTable-search').getByRole('button').click();
  265 |       const filteredRes = waitForConnectionsApiResponse(page);
  266 |       await page.getByRole('textbox', { name: 'Search Connections...' }).fill(clusterMetaData.name);
  267 |       await filteredRes;
  268 | 
  269 |       const row = page
  270 |         .locator('tbody tr')
  271 |         .filter({ hasText: clusterMetaData.name })
  272 |         // Exact status match: `hasText: 'connected'` also matches "disconnected"
  273 |         // (substring), which could select an already-disconnected row.
  274 |         .filter({ has: page.getByText('connected', { exact: true }) })
  275 |         .first();
  276 | 
  277 |       if ((await row.count()) === 0) {
  278 |         test.skip(true, 'No connected Kubernetes cluster found to transition. Skipping test.');
  279 |         return;
  280 |       }
  281 | 
  282 |       // Open the row's status dropdown and choose "disconnected".
  283 |       await row.locator('#connection-status-select').click();
  284 |       await page.getByRole('option', { name: 'disconnected' }).click();
  285 | 
  286 |       // Confirm the transition in the shared modal.
  287 |       await expect(page.getByTestId('connection-transition-modal')).toBeVisible();
  288 |       const transitionRes = waitForConnectionsApiResponse(page);
  289 |       await page.getByTestId('connection-transition-confirm').click();
  290 |       await waitForSnackBar(page, 'Connection status updated');
  291 |       await transitionRes;
  292 | 
  293 |       await expect(
  294 |         page.locator('tbody tr').filter({ hasText: clusterMetaData.name }).first(),
  295 |       ).toContainText('disconnected');
  296 | 
  297 |       // Transition back to connected so the run leaves state as it found it.
  298 |       const restored = page
  299 |         .locator('tbody tr')
  300 |         .filter({ hasText: clusterMetaData.name })
  301 |         .filter({ has: page.getByText('disconnected', { exact: true }) })
  302 |         .first();
  303 |       await restored.locator('#connection-status-select').click();
  304 |       await page.getByRole('option', { name: 'connected' }).click();
  305 |       await expect(page.getByTestId('connection-transition-modal')).toBeVisible();
  306 |       // Verify the restore PUT like the disconnect leg, so a failed restore is
  307 |       // surfaced (not left to the snackbar alone) and state is left as found.
  308 |       const restoreRes = waitForConnectionsApiResponse(page);
  309 |       await page.getByTestId('connection-transition-confirm').click();
  310 |       await waitForSnackBar(page, 'Connection status updated');
  311 |       await restoreRes;
  312 |     },
  313 |   );
  314 | 
  315 |   // TC-1063 (matrix X3): FSM delete (graceful) - the UI bulk-delete sets status
  316 |   // to `deleted` via the shared transition modal (PUT /connections/{id}), not the
  317 |   // hard DELETE endpoint. Self-skips without a connected cluster.
  318 |   test(
  319 |     'Delete Kubernetes cluster connections',
  320 |     { tag: connTags('delete') },
  321 |     async ({ page, clusterMetaData }, testInfo) => {
  322 |       await annotateConnCase(testInfo, 'delete');
  323 |       // The full search -> delete -> confirm -> snackbar flow can be slow in CI.
  324 |       test.slow();
  325 | 
  326 |       // beforeEach already navigates to the connections page.
  327 |       // Find the row with the connection to be deleted.
  328 |       await page.getByTestId('ConnectionTable-search').getByRole('button').click();
  329 | 
  330 |       const getFilteredConnectionsRes = waitForConnectionsApiResponse(page);
  331 | 
  332 |       await page.getByRole('textbox', { name: 'Search Connections...' }).click();
  333 |       await page.getByRole('textbox', { name: 'Search Connections...' }).fill(clusterMetaData.name);
  334 | 
  335 |       await getFilteredConnectionsRes;
  336 | 
  337 |       // Narrow to the data row for the searched cluster - `tr` alone matches
  338 |       // table headers, MUI menu items, and the chip dropdown popovers, all of
  339 |       // which can carry the word `connected` from filter labels or other
  340 |       // rendered chips and silently grab the wrong row.
  341 |       const row = page
  342 |         .locator('tbody tr')
  343 |         .filter({ hasText: clusterMetaData.name })
  344 |         // Exact status match: `hasText: 'connected'` also matches "disconnected"
  345 |         // (substring), which could select an already-disconnected row.
  346 |         .filter({ has: page.getByText('connected', { exact: true }) })
  347 |         .first();
  348 | 
  349 |       // Skip the test if no connected cluster is found (e.g., CI environments without a pre-connected cluster)
```