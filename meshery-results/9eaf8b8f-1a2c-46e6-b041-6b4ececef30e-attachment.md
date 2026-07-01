# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: connections.spec.ts >> Connection Management Tests >> Verify that UI components are displayed
- Location: tests/e2e/connections.spec.ts:68:7

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
  2   | import { test } from './fixtures/project';
  3   | import { ENV } from './env';
  4   | import { DashboardPage } from './pages/DashboardPage';
  5   | import { waitForSnackBar } from './utils/waitForSnackBar';
  6   | 
  7   | // Define the shape of the transition test objects
  8   | interface TransitionTest {
  9   |   name: string;
  10  |   transitionOption: string;
  11  |   statusAfterTransition: string;
  12  |   restorationOption: string;
  13  | }
  14  | 
  15  | // These tests need to be updated to reflect the latest connection api changes
  16  | function waitForConnectionsApiResponse(page: Page): Promise<Response> {
> 17  |   return page.waitForResponse(
      |               ^ Error: page.waitForResponse: Test ended.
  18  |     (response) =>
  19  |       response.url().includes('/api/integrations/connections') && response.status() === 200,
  20  |   );
  21  | }
  22  | 
  23  | // name: Name of the test
  24  | // transitionOption: Option to be chosen from dropdown to transition to another state
  25  | // statusAfterTransition: Text shown in current state after transition
  26  | // restorationOption: Option to be chosen from dropdown to transition back to connected state
  27  | const transitionTests: TransitionTest[] = [
  28  |   // skip: this is broken
  29  |   // {
  30  |   //   name: 'Transition to disconnected state and then back to connected state',
  31  |   //   transitionOption: 'disconnected',
  32  |   //   statusAfterTransition: 'disconnected',
  33  |   //   restorationOption: 'connected',
  34  |   // },
  35  |   // {
  36  |   //   name: 'Transition to ignored state and then back to connected state',
  37  |   //   transitionOption: 'ignored',
  38  |   //   statusAfterTransition: 'ignored',
  39  |   //   restorationOption: 'registered',
  40  |   // },
  41  |   // {
  42  |   //   name: 'Transition to not found state and then back to connected state',
  43  |   //   transitionOption: 'not found',
  44  |   //   statusAfterTransition: 'not found',
  45  |   //   restorationOption: 'discovered',
  46  |   // },
  47  | ];
  48  | 
  49  | test.describe.serial('Connection Management Tests', () => {
  50  |   // The shared beforeEach calls dashboardPage.navigateToDashboard() and
  51  |   // navigateToConnections(), each of which internally awaits two visibility
  52  |   // checks with a 120s timeout. Under the default BASE_TIMEOUT=60s the hook
  53  |   // itself dies before those waits can resolve when CI is under load.
  54  |   // Three minutes is enough headroom for a slow dashboard render plus the
  55  |   // connections page mount and its initial API response.
  56  |   test.describe.configure({ timeout: 180_000 });
  57  | 
  58  |   test.beforeEach(async ({ page }) => {
  59  |     const initialConnectionsRes = waitForConnectionsApiResponse(page);
  60  |     const dashboardPage = new DashboardPage(page);
  61  |     await dashboardPage.navigateToDashboard();
  62  |     await dashboardPage.navigateToConnections();
  63  |     await page.waitForURL(/\/management\/connections/);
  64  |     await initialConnectionsRes;
  65  |     await expect(page.getByTestId('ConnectionTable-search')).toBeVisible();
  66  |   });
  67  | 
  68  |   test('Verify that UI components are displayed', async ({ page }) => {
  69  |     // Verify that connections table is displayed (by checking for table headings)
  70  |     const headings = ['Name', 'Environments', 'Kind', 'Category', 'Status', 'Actions'];
  71  |     for (const heading of headings) {
  72  |       await expect(page.getByRole('columnheader', { name: heading })).toBeVisible();
  73  |     }
  74  |   });
  75  | 
  76  |   // test('Add a cluster connection by uploading kubeconfig file', async ({
  77  |   //   page,
  78  |   //   clusterMetaData,
  79  |   // }) => {
  80  |   //   await page.getByRole('tab', { name: 'Connections' }).click();
  81  | 
  82  |   //   const addConnectionReq = page.waitForRequest(
  83  |   //     (request) =>
  84  |   //       request.url() === `${ENV.MESHERY_SERVER_URL}/api/system/kubernetes` &&
  85  |   //       request.method() === 'POST',
  86  |   //   );
  87  |   //   const addConnectionRes = page.waitForResponse(
  88  |   //     (response) =>
  89  |   //       response.url() === `${ENV.MESHERY_SERVER_URL}/api/system/kubernetes` &&
  90  |   //       response.status() === 200,
  91  |   //   );
  92  |   //   await page.getByTestId('connection-addCluster').click();
  93  | 
  94  |   //   // Verify "Add Kubernetes Cluster(s)" modal opens
  95  |   //   await expect(page.getByTestId('connection-addKubernetesModal')).toBeVisible();
  96  | 
  97  |   //   const fileChooserPromise = page.waitForEvent('filechooser');
  98  |   //   await page.getByTestId('connection-uploadKubeConfig').click();
  99  |   //   const fileChooser = await fileChooserPromise;
  100 |   //   // Attach existing kubeconfig file of the system, to test the upload without making any changes in configuration
  101 |   //   const kubeConfigPath = `${os.homedir()}/.kube/config`;
  102 |   //   await fileChooser.setFiles(kubeConfigPath);
  103 | 
  104 |   //   await page.getByRole('button', { name: 'IMPORT', exact: true }).click();
  105 | 
  106 |   //   await addConnectionReq;
  107 |   //   await addConnectionRes;
  108 | 
  109 |   //   await page.getByRole('button', { name: 'OK' }).click();
  110 | 
  111 |   //   // Search for the newly added cluster
  112 |   //   await page.getByTestId('ConnectionTable-search').getByRole('button').click();
  113 | 
  114 |   //   const getConnectionsRes = waitForConnectionsApiResponse(page);
  115 | 
  116 |   //   await page.getByRole('textbox', { name: 'Search Connections...' }).click();
  117 |   //   await page.getByRole('textbox', { name: 'Search Connections...' }).fill(clusterMetaData.name);
```