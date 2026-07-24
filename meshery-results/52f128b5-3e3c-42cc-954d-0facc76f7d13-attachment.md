# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: telemetry.spec.ts >> Telemetry Section Tests >> Charts (Grafana) page loads
- Location: tests/e2e/telemetry.spec.ts:22:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId('Grafana')
Expected: visible
Received: hidden
Timeout:  60000ms

Call log:
  - Expect "toBeVisible" with timeout 60000ms
  - waiting for getByTestId('Grafana')
    - waiting for" http://localhost:9081/telemetry/charts" navigation to finish...
    - navigated to "http://localhost:9081/telemetry/charts"
    81 × locator resolved to <div tabindex="0" role="button" data-testid="Grafana" class="MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters css-1phsknq">…</div>
       - unexpected value "hidden"

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
    - link "Lifecycle Expand":
      - /url: /management/connections
      - img
      - text: Lifecycle
      - button "Expand"
    - link "Configuration Expand":
      - /url: /configuration/designs
      - img
      - text: Configuration
      - button "Expand"
    - link "Telemetry Expand":
      - /url: /telemetry
      - img
      - text: Telemetry
      - button "Expand":
        - img:
          - img
    - link "meshery-button-2 Performance Expand":
      - /url: /performance
      - img "meshery-button-2"
      - text: Performance
      - button "Expand"
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
      - /url: https://docs.meshery.io/project/releases/v1.0.62
      - img
- banner:
  - button:
    - img
  - text: /
  - button:
    - img
  - text: /
  - heading "Charts" [level=5]
  - button "contexts":
    - img
    - text: "0"
  - button:
    - img
  - button
  - button:
    - img
- main:
  - img
  - heading "No Grafana connections yet" [level=6]
  - paragraph: Add a Grafana connection to browse and render its dashboards here. You can manage all connections anytime under Lifecycle → Connections.
  - button "Add a Grafana connection":
    - img
    - text: Add a Grafana connection
- contentinfo:
  - paragraph:
    - text: Built with
    - img
    - text: by the Meshery Community
- alert
```

# Test source

```ts
  1   | import { expect } from '@playwright/test';
  2   | const LEFT_NAV = {
  3   |   DASHBOARD: {
  4   |     name: 'Dashboard',
  5   |     path: '/',
  6   |     NAV_ITEMS: {},
  7   |   },
  8   |   LIFECYCLE: {
  9   |     name: 'lifecycle',
  10  |     NAV_ITEMS: {
  11  |       CONNECTIONS: 'connection',
  12  |       ENVIRONMENT: 'environment',
  13  |       WORKSPACE: 'Workspace',
  14  |       ADAPTERS: 'Adapters',
  15  |     },
  16  |   },
  17  |   CONFIGURATION: {
  18  |     name: 'configuration',
  19  |     NAV_ITEMS: {
  20  |       DESIGNS: 'design',
  21  |     },
  22  |   },
  23  |   TELEMETRY: {
  24  |     name: 'telemetry',
  25  |     NAV_ITEMS: {
  26  |       CHARTS: 'Grafana',
  27  |       METRICS: 'Prometheus',
  28  |     },
  29  |   },
  30  |   PERFORMANCE: {
  31  |     name: 'performance',
  32  |     NAV_ITEMS: {
  33  |       PROFILES: 'profiles',
  34  |     },
  35  |   },
  36  |   EXTENSIONS: {
  37  |     name: 'extensions',
  38  |     NAV_ITEMS: {},
  39  |   },
  40  | };
  41  | 
  42  | const HEADER_NAV = {
  43  |   name: 'header-nav',
  44  |   NAV_ITEMS: {
  45  |     SETTINGS: 'nav-item-settings',
  46  |     LOGOUT: 'nav-item-logout',
  47  |     PREFERENCES: 'nav-item-preferences',
  48  |     NOTIFICATIONS: 'nav-item-notifications',
  49  |   },
  50  | };
  51  | 
  52  | export class DashboardPage {
  53  |   constructor(page) {
  54  |     this.page = page;
  55  |     this.navigationPanel = this.page.getByTestId('navigation');
  56  |     this.notificationButton = this.page.getByTestId('notification-button');
  57  |     this.profileButton = this.page.getByTestId('profile-button');
  58  |     this.headerMenu = this.page.getByTestId('header-menu');
  59  |   }
  60  | 
  61  |   async navigateToMenu(navItem) {
  62  |     const menuItem = this.page.getByTestId(navItem);
  63  |     await expect(menuItem).toBeVisible();
  64  |     await menuItem.click();
  65  |   }
  66  | 
  67  |   async navigateToSubMenuItem(parentItem, childItem) {
  68  |     await this.navigateToMenu(parentItem);
  69  |     const submenuItem = this.page.getByTestId(childItem);
> 70  |     await expect(submenuItem).toBeVisible();
      |                               ^ Error: expect(locator).toBeVisible() failed
  71  |     await submenuItem.click();
  72  |   }
  73  | 
  74  |   async navigateToDashboard() {
  75  |     await this.page.goto(LEFT_NAV.DASHBOARD.path, { waitUntil: 'domcontentloaded' });
  76  |     await expect(this.navigationPanel).toBeVisible();
  77  |     await expect(this.headerMenu).toBeVisible();
  78  |   }
  79  | 
  80  |   async navigateToPerformance() {
  81  |     await this.navigateToMenu(LEFT_NAV.PERFORMANCE.name);
  82  |   }
  83  | 
  84  |   async navigateToExtensions() {
  85  |     await this.navigateToMenu(LEFT_NAV.EXTENSIONS.name);
  86  |   }
  87  | 
  88  |   async navigateToTelemetry() {
  89  |     await this.navigateToMenu(LEFT_NAV.TELEMETRY.name);
  90  |   }
  91  | 
  92  |   async navigateToTelemetryCharts() {
  93  |     await this.navigateToSubMenuItem(LEFT_NAV.TELEMETRY.name, LEFT_NAV.TELEMETRY.NAV_ITEMS.CHARTS);
  94  |   }
  95  | 
  96  |   async navigateToTelemetryMetrics() {
  97  |     await this.navigateToSubMenuItem(LEFT_NAV.TELEMETRY.name, LEFT_NAV.TELEMETRY.NAV_ITEMS.METRICS);
  98  |   }
  99  | 
  100 |   async navigateToLifecycle() {
  101 |     await this.navigateToMenu(LEFT_NAV.LIFECYCLE.name);
  102 |   }
  103 | 
  104 |   async navigateToConfiguration() {
  105 |     await this.navigateToMenu(LEFT_NAV.CONFIGURATION.name);
  106 |   }
  107 | 
  108 |   async navigateToConnections() {
  109 |     await this.navigateToSubMenuItem(
  110 |       LEFT_NAV.LIFECYCLE.name,
  111 |       LEFT_NAV.LIFECYCLE.NAV_ITEMS.CONNECTIONS,
  112 |     );
  113 |   }
  114 | 
  115 |   async navigateToEnvironment() {
  116 |     await this.navigateToSubMenuItem(
  117 |       LEFT_NAV.LIFECYCLE.name,
  118 |       LEFT_NAV.LIFECYCLE.NAV_ITEMS.ENVIRONMENT,
  119 |     );
  120 |   }
  121 | 
  122 |   async navigateToWorkspace() {
  123 |     await this.navigateToSubMenuItem(
  124 |       LEFT_NAV.LIFECYCLE.name,
  125 |       LEFT_NAV.LIFECYCLE.NAV_ITEMS.WORKSPACE,
  126 |     );
  127 |   }
  128 | 
  129 |   async navigateToAdapters() {
  130 |     await this.navigateToSubMenuItem(
  131 |       LEFT_NAV.LIFECYCLE.name,
  132 |       LEFT_NAV.LIFECYCLE.NAV_ITEMS.ADAPTERS,
  133 |     );
  134 |   }
  135 | 
  136 |   async navigateToProfiles() {
  137 |     await this.navigateToSubMenuItem(
  138 |       LEFT_NAV.PERFORMANCE.name,
  139 |       LEFT_NAV.PERFORMANCE.NAV_ITEMS.PROFILES,
  140 |     );
  141 |   }
  142 | 
  143 |   async navigateToHeaderItem(navItem) {
  144 |     await expect(this.headerMenu).toBeVisible();
  145 |     await this.headerMenu.click();
  146 |     const headerItem = this.page.getByTestId(navItem);
  147 |     await expect(headerItem).toBeVisible();
  148 |     await headerItem.click();
  149 |   }
  150 | 
  151 |   async navigateToSettings() {
  152 |     await this.navigateToHeaderItem(HEADER_NAV.NAV_ITEMS.SETTINGS);
  153 |   }
  154 | 
  155 |   async navigateToPreferences() {
  156 |     await this.navigateToHeaderItem(HEADER_NAV.NAV_ITEMS.PREFERENCES);
  157 |   }
  158 | 
  159 |   async navigateToDesigns() {
  160 |     await this.navigateToSubMenuItem(
  161 |       LEFT_NAV.CONFIGURATION.name,
  162 |       LEFT_NAV.CONFIGURATION.NAV_ITEMS.DESIGNS,
  163 |     );
  164 |   }
  165 | 
  166 |   async navigateToLogout() {
  167 |     await this.navigateToHeaderItem(HEADER_NAV.NAV_ITEMS.LOGOUT);
  168 |   }
  169 | }
  170 | 
```