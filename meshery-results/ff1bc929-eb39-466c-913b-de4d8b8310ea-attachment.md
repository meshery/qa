# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: performance.spec.ts >> Performance Section Tests >> Performance dashboard controls
- Location: tests/e2e/performance.spec.ts:38:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('performance-dashboard')
Expected: visible
Timeout: 60000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 60000ms
  - waiting for getByTestId('performance-dashboard')

```

```yaml
- navigation:
  - img
  - img
  - list:
    - link "Dashboard":
      - /url: /
      - img
      - text: Dashboard
    - link "Lifecycle":
      - /url: /management/connections
      - img
      - text: Lifecycle
    - button "Expand"
    - link "Configuration":
      - /url: /configuration/designs
      - img
      - text: Configuration
    - button "Expand"
    - link "Telemetry":
      - /url: /telemetry
      - img
      - text: Telemetry
    - button "Expand"
    - link "meshery-button-2 Performance":
      - /url: /performance
      - img "meshery-button-2"
      - text: Performance
    - button "Collapse" [expanded]
    - list:
      - button "Profiles":
        - img
        - text: Profiles
    - link "Extensions":
      - /url: /extensions
      - img
      - text: Extensions
    - separator
  - img
  - group:
    - listitem:
      - link:
        - /url: https://docs.meshery.io
        - img
    - listitem:
      - link:
        - /url: https://slack.meshery.io
        - img
    - listitem:
      - link:
        - /url: https://meshery.io/community#community-forums
        - img
    - listitem:
      - link:
        - /url: https://github.com/meshery/meshery/issues/new/choose
        - img
  - listitem:
    - text: undefined
    - link:
      - /url: https://docs.meshery.io/project/releases/undefined
      - img
    - text: Update available
    - link:
      - /url: https://docs.meshery.io/project/releases/v1.0.50
      - img
- banner:
  - button:
    - img
  - text: /
  - button:
    - img
  - text: /
  - heading "Dashboard" [level=5]
  - button "contexts":
    - img
    - text: "0"
  - button:
    - img
  - button
  - button:
    - img
- main:
  - tablist:
    - tab "Overview" [selected]:
      - img
      - text: Overview
    - tab "Node":
      - img
      - text: Node
    - tab "Namespace":
      - img
      - text: Namespace
    - tab "Workload":
      - img
      - text: Workload
    - tab "Configuration":
      - img
      - text: Configuration
    - tab "Network":
      - img
      - text: Network
    - tab "Security":
      - img
      - text: Security
    - tab "Storage":
      - img
      - text: Storage
    - tab "CRDS":
      - img
      - text: CRDS
  - tabpanel:
    - heading "No clusters available. Please connect your clusters to proceed." [level=5]
    - link "Connect Clusters":
      - /url: /management/connections
      - button "Connect Clusters":
        - img
        - text: Connect Clusters
    - img
    - heading "LATEST BLOGS" [level=6]
    - list:
      - listitem:
        - img
        - link "Meshery v1.0 is Generally Available":
          - /url: https://meshery.io/blog/meshery-v1.0-general-availability/
        - superscript:
          - img
      - listitem:
        - img
        - link "Mesheryctl Relationship Commands Promoted From Experimental":
          - /url: https://meshery.io/blog/2026/03/2026-03-10-mesheryctl-relationship-cmds/
        - superscript:
          - img
      - listitem:
        - img
        - link "Meshery Workspaces":
          - /url: https://meshery.io/blog/2026/02/2026-02-16-meshery-workspaces-enabling-cross-team-collaboration/
        - superscript:
          - img
      - listitem:
        - img
        - link "Certified Meshery Contributors Share Their Experiences":
          - /url: https://meshery.io/blog/2026/01/2026-01-28-certified-meshery-contributors-share-their-experience/
        - superscript:
          - img
      - listitem:
        - img
        - link "The Meshery Umbrella Expands":
          - /url: https://meshery.io/blog/2025/meshery-ecosystem-expansion
        - superscript:
          - img
    - button "Edit":
      - text: Edit
      - img
- contentinfo:
  - paragraph:
    - text: Built with
    - img
    - text: by the Meshery Community
- alert
```

# Test source

```ts
  1  | import { expect, test, Page } from '@playwright/test';
  2  | import { DashboardPage } from './pages/DashboardPage';
  3  | 
  4  | const COMMON_UI_ELEMENTS: string[] = [
  5  |   'navigation',
  6  |   'notification-button',
  7  |   'profile-button',
  8  |   'header-menu',
  9  | ];
  10 | 
  11 | test.describe('Performance Section Tests', () => {
  12 |   // The shared beforeEach calls navigateToDashboard() (two 120s visibility
  13 |   // waits) and navigateToPerformance() (120s wait), then waits on the
  14 |   // performance dashboard. Under the default BASE_TIMEOUT=60s the hook dies
  15 |   // before those inner waits resolve when CI is slow. 180s gives the chain
  16 |   // enough wall-clock.
  17 |   test.describe.configure({ timeout: 180_000 });
  18 | 
  19 |   test.beforeEach(async ({ page }: { page: Page }) => {
  20 |     const dashboardPage = new DashboardPage(page);
  21 |     await dashboardPage.navigateToDashboard();
  22 |     await dashboardPage.navigateToPerformance();
  23 |     // Readiness signal for the performance dashboard. The legacy "Configure
  24 |     // Metrics" flow (meshery-metrics / grafana config) was removed when
  25 |     // telemetry moved to its own section under /telemetry — see telemetry.spec.ts.
> 26 |     await expect(page.getByTestId('performance-dashboard')).toBeVisible();
     |                                                             ^ Error: expect(locator).toBeVisible() failed
  27 |   });
  28 | 
  29 |   test('Common UI elements', async ({ page }: { page: Page }) => {
  30 |     for (const elementId of COMMON_UI_ELEMENTS) {
  31 |       await expect(
  32 |         page.getByTestId(elementId),
  33 |         `UI element with ID ${elementId} should be visible`,
  34 |       ).toBeVisible();
  35 |     }
  36 |   });
  37 | 
  38 |   test('Performance dashboard controls', async ({ page }: { page: Page }) => {
  39 |     await expect(page.getByRole('button', { name: 'Run Test' })).toBeVisible();
  40 |     await expect(page.getByRole('button', { name: 'Manage Profiles' })).toBeVisible();
  41 |   });
  42 | });
  43 | 
```