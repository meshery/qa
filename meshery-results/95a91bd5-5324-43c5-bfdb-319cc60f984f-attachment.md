# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: connections.spec.ts >> Connection Management Tests >> Verify that UI components are displayed
- Location: tests/e2e/connections.spec.ts:102:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:9081/
Call log:
  - navigating to "http://localhost:9081/", waiting until "domcontentloaded"

```

```
Error: page.waitForResponse: Test ended.
```

# Test source

```ts
  1   | import { expect, Page, Response } from '@playwright/test';
  2   | import * as allure from 'allure-js-commons';
  3   | import fs from 'fs';
  4   | import os from 'os';
  5   | import path from 'path';
  6   | import { test } from './fixtures/project';
  7   | import { DashboardPage } from './pages/DashboardPage';
  8   | import { waitForSnackBar } from './utils/waitForSnackBar';
  9   | import {
  10  |   annotateConnCase,
  11  |   annotateConnCaseUntracked,
  12  |   connTags,
  13  |   connTagsUntracked,
  14  | } from './connections.testmap';
  15  | 
  16  | // The connection-lifecycle flows below were rewritten against the current UI.
  17  | // Cluster registration now runs through the Connection Wizard (deep link
  18  | // `?create=true&kind=kubernetes` -> upload `#connection-wizard-kubeconfig-input`
  19  | // -> "Review contexts" -> Import), and state transitions run through the
  20  | // Connections table's status dropdown (`#connection-status-select`) plus the
  21  | // shared `connection-transition-*` confirmation modal. The previous
  22  | // single-modal `connection-addKubernetesModal` / `connection-uploadKubeConfig`
  23  | // testids no longer exist.
  24  | //
  25  | // Tests that need a live Meshery server and a reachable cluster self-skip when
  26  | // the environment cannot provide one (mirroring the delete test), so an
  27  | // infra-less run degrades to "skipped" rather than a false failure.
  28  | 
  29  | // Test Plan Test Group (col B) for every case in this spec. Emitted once as an
  30  | // Allure `testGroup` label in the describe's beforeEach so a single mechanism
  31  | // covers the whole file - this is the UI-lane counterpart to the BATS
  32  | // `[tg=Connection Lifecycle]` title token (see mesheryctl/bats-to-allure.js).
  33  | // The meshery/qa "Connection Lifecycle" report keys on this label. Any other
  34  | // Test Group can drive its own filtered report the same way. This is a real
  35  | // Allure label emitted via `allure.label`, not a Playwright annotation:
  36  | // allure-playwright only maps known annotation types (epic/feature/story) to
  37  | // labels, so a custom `testGroup` must be set through allure.label to become a
  38  | // label the meshery/qa report can filter on. The runtime API comes from
  39  | // `allure-js-commons` (Allure's documented Playwright API and an exact-pinned
  40  | // dependency of allure-playwright); allure-playwright's own `allure` export is
  41  | // deprecated in favor of it.
  42  | const TEST_GROUP = 'Connection Lifecycle';
  43  | 
  44  | const MULTI_CONTEXT_KUBECONFIG = path.join(__dirname, 'assets', 'kubeconfig-multi-context.yaml');
  45  | const HOST_KUBECONFIG = path.join(os.homedir(), '.kube', 'config');
  46  | 
  47  | // Wait for the connections LIST response specifically. Matching any 200 whose
  48  | // URL merely contains "/api/integrations/connections" would also resolve on the
  49  | // PUT /connections/{id} status-update, letting a table-refresh wait complete on
  50  | // an unrelated request; restrict to the GET collection endpoint.
  51  | function waitForConnectionsApiResponse(page: Page): Promise<Response> {
> 52  |   return page.waitForResponse(
      |               ^ Error: page.waitForResponse: Test ended.
  53  |     (response) =>
  54  |       response.request().method() === 'GET' &&
  55  |       /\/api\/integrations\/connections(\?|$)/.test(response.url()) &&
  56  |       response.status() === 200,
  57  |   );
  58  | }
  59  | 
  60  | /** Open the Connection Wizard directly on the Kubernetes kubeconfig step. */
  61  | async function openKubernetesWizard(page: Page): Promise<void> {
  62  |   await page.goto('/management/connections?create=true&kind=kubernetes', {
  63  |     waitUntil: 'domcontentloaded',
  64  |   });
  65  |   // The wizard opens preset to Kubernetes on the "Import Kubeconfig" step. Its
  66  |   // StepHeader is an h6 ("Upload a kubeconfig"), a reliable heading anchor for
  67  |   // "the wizard opened and reached the kubeconfig step". The modal chrome title
  68  |   // ("Create Connection") is not rendered as a heading element, so it must not
  69  |   // be asserted via getByRole('heading').
  70  |   await expect(page.getByRole('heading', { name: 'Upload a kubeconfig' })).toBeVisible();
  71  | }
  72  | 
  73  | /** Attach a kubeconfig to the wizard's hidden file input. */
  74  | async function uploadKubeconfig(page: Page, kubeconfigPath: string): Promise<void> {
  75  |   await page.locator('#connection-wizard-kubeconfig-input').setInputFiles(kubeconfigPath);
  76  | }
  77  | 
  78  | test.describe.serial('Connection Management Tests', () => {
  79  |   // The shared beforeEach calls dashboardPage.navigateToDashboard() and
  80  |   // navigateToConnections(), each of which internally awaits two visibility
  81  |   // checks with a 120s timeout. Under the default BASE_TIMEOUT=60s the hook
  82  |   // itself dies before those waits can resolve when CI is under load.
  83  |   // Three minutes is enough headroom for a slow dashboard render plus the
  84  |   // connections page mount and its initial API response.
  85  |   test.describe.configure({ timeout: 180_000 });
  86  | 
  87  |   test.beforeEach(async ({ page }) => {
  88  |     // Tag every test in this spec with its Test Plan Test Group (col B) so the
  89  |     // Test-Group-keyed meshery/qa report picks them up. One call here covers
  90  |     // all cases in the describe block.
  91  |     await allure.label('testGroup', TEST_GROUP);
  92  | 
  93  |     const initialConnectionsRes = waitForConnectionsApiResponse(page);
  94  |     const dashboardPage = new DashboardPage(page);
  95  |     await dashboardPage.navigateToDashboard();
  96  |     await dashboardPage.navigateToConnections();
  97  |     await page.waitForURL(/\/management\/connections/);
  98  |     await initialConnectionsRes;
  99  |     await expect(page.getByTestId('ConnectionTable-search')).toBeVisible();
  100 |   });
  101 | 
  102 |   test(
  103 |     'Verify that UI components are displayed',
  104 |     { tag: connTagsUntracked('UI/Connections Table') },
  105 |     async ({ page }, testInfo) => {
  106 |       annotateConnCaseUntracked(testInfo, { feature: 'Connections table' });
  107 |       // Verify that connections table is displayed (by checking for table headings)
  108 |       const headings = ['Name', 'Environments', 'Kind', 'Category', 'Status', 'Actions'];
  109 |       for (const heading of headings) {
  110 |         await expect(page.getByRole('columnheader', { name: heading })).toBeVisible();
  111 |       }
  112 |     },
  113 |   );
  114 | 
  115 |   // Opening the Kubernetes wizard surfaces the kubeconfig upload. This is
  116 |   // deterministic - it needs a running Meshery UI but no cluster - so it runs in
  117 |   // CI rather than self-skipping. Untracked: it is a UI smoke of the wizard entry
  118 |   // with no dedicated Test Plan row (the matrix begins at registration, R1).
  119 |   test(
  120 |     'Open the Kubernetes connection wizard and show kubeconfig upload',
  121 |     { tag: connTagsUntracked('UI/Connection Wizard') },
  122 |     async ({ page }, testInfo) => {
  123 |       annotateConnCaseUntracked(testInfo, {
  124 |         feature: 'Connection wizard',
  125 |         story: 'Open wizard and show kubeconfig upload',
  126 |       });
  127 | 
  128 |       await openKubernetesWizard(page);
  129 | 
  130 |       // The hidden file input is present (attached, not visible) and the
  131 |       // dropzone prompt + wizard navigation are rendered.
  132 |       await expect(page.locator('#connection-wizard-kubeconfig-input')).toBeAttached();
  133 |       await expect(page.getByText('Click to choose a kubeconfig file')).toBeVisible();
  134 |       await expect(page.getByTestId('connection-wizard-next')).toBeVisible();
  135 |     },
  136 |   );
  137 | 
  138 |   // TC-1014 (matrix R3): uploading a multi-context kubeconfig lists every context
  139 |   // in the "Review contexts" step (one row per context). Uses a committed
  140 |   // 3-context fixture with unreachable servers, so it needs the discovery
  141 |   // endpoint (a running server) but no real clusters. Self-skips if discovery is
  142 |   // unavailable.
  143 |   test(
  144 |     'Discover multiple kubeconfig contexts in the wizard',
  145 |     { tag: connTags('wizardDiscoverContexts') },
  146 |     async ({ page }, testInfo) => {
  147 |       await annotateConnCase(testInfo, 'wizardDiscoverContexts');
  148 |       test.slow();
  149 | 
  150 |       if (!fs.existsSync(MULTI_CONTEXT_KUBECONFIG)) {
  151 |         test.skip(true, 'Multi-context kubeconfig fixture missing.');
  152 |         return;
```