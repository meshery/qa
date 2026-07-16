# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: telemetry.spec.ts >> Telemetry Section Tests >> Metrics (Prometheus) page loads
- Location: tests/e2e/telemetry.spec.ts:37:7

# Error details

```
Test timeout of 180000ms exceeded.
```

```
Error: locator.click: Test timeout of 180000ms exceeded.
Call log:
  - waiting for getByTestId('Prometheus')
    2 × locator resolved to <div tabindex="0" role="button" data-testid="Prometheus" class="MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters css-1men7jg">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    276 × waiting for element to be visible, enabled and stable
        - element is not visible
      - retrying click action
        - waiting 500ms

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - navigation [ref=e4]:
      - generic [ref=e6]:
        - generic [ref=e8] [cursor=pointer]:
          - img [ref=e9]
          - img [ref=e10]
        - list [ref=e11]:
          - link "Dashboard" [ref=e13] [cursor=pointer]:
            - /url: /
            - generic [ref=e14]:
              - img [ref=e16]
              - generic [ref=e21]: Dashboard
          - generic [ref=e22]:
            - link "Lifecycle Expand" [ref=e23] [cursor=pointer]:
              - /url: /management/connections
              - generic [ref=e24]:
                - img [ref=e26]
                - generic [ref=e29]: Lifecycle
              - button "Expand" [ref=e30]
            - generic [ref=e32] [cursor=pointer]: Connections
            - generic [ref=e34] [cursor=pointer]: Credentials
            - generic [ref=e36] [cursor=pointer]: Environments
            - generic [ref=e38] [cursor=pointer]: Workspaces
            - generic [ref=e40] [cursor=pointer]: Adapters
          - generic [ref=e41]:
            - link "Configuration Expand" [ref=e42] [cursor=pointer]:
              - /url: /configuration/designs
              - generic [ref=e43]:
                - img [ref=e45]
                - generic [ref=e50]: Configuration
              - button "Expand" [ref=e51]
            - generic:
              - generic: Catalog
            - generic [ref=e53] [cursor=pointer]: Designs
          - generic [ref=e54]:
            - link "Telemetry Expand" [ref=e55] [cursor=pointer]:
              - /url: /telemetry
              - generic [ref=e56]:
                - img [ref=e58]
                - generic [ref=e62]: Telemetry
              - button "Expand" [ref=e63]:
                - img [ref=e64]:
                  - img [ref=e65]
            - generic [ref=e68] [cursor=pointer]: Charts
            - generic [ref=e70] [cursor=pointer]: Metrics
          - generic [ref=e71]:
            - link "meshery-button-2 Performance Expand" [ref=e72] [cursor=pointer]:
              - /url: /performance
              - generic [ref=e73]:
                - img "meshery-button-2" [ref=e75]
                - generic [ref=e101]: Performance
              - button "Expand" [ref=e102]
            - generic [ref=e104] [cursor=pointer]: Profiles
          - link "Extensions" [ref=e106] [cursor=pointer]:
            - /url: /extensions
            - generic [ref=e107]:
              - img [ref=e109]
              - generic [ref=e136]: Extensions
          - separator [ref=e137]
        - generic [ref=e138]:
          - img [ref=e141] [cursor=pointer]
          - group [ref=e143]:
            - listitem [ref=e144]:
              - link [ref=e145] [cursor=pointer]:
                - /url: https://docs.meshery.io
                - img [ref=e147]
            - listitem [ref=e149]:
              - link [ref=e150] [cursor=pointer]:
                - /url: https://slack.meshery.io
                - img [ref=e152]
            - listitem [ref=e161]:
              - link [ref=e162] [cursor=pointer]:
                - /url: https://meshery.io/community#community-forums
                - img [ref=e164]
            - listitem [ref=e166]:
              - link [ref=e167] [cursor=pointer]:
                - /url: https://github.com/meshery/meshery/issues/new/choose
                - img [ref=e169]
          - listitem [ref=e171]:
            - generic [ref=e172]:
              - text: undefined
              - link [ref=e174] [cursor=pointer]:
                - /url: https://docs.meshery.io/project/releases/undefined
                - img [ref=e175]
              - generic [ref=e177]:
                - text: Update available
                - link [ref=e178] [cursor=pointer]:
                  - /url: https://docs.meshery.io/project/releases/v1.0.56
                  - img [ref=e179]
    - generic [ref=e181]:
      - banner [ref=e182]:
        - generic [ref=e184]:
          - generic [ref=e186]:
            - button [ref=e188] [cursor=pointer]:
              - img [ref=e189]
            - text: /
            - button [ref=e198] [cursor=pointer]:
              - img [ref=e199]
            - text: /
            - heading "Charts" [level=5] [ref=e203]
          - generic [ref=e205]:
            - button "contexts" [ref=e208] [cursor=pointer]:
              - generic [ref=e209]:
                - img [ref=e210]
                - generic [ref=e211]: "0"
            - button [ref=e214] [cursor=pointer]:
              - img [ref=e215]
            - button [ref=e222] [cursor=pointer]:
              - img [ref=e224]
            - button [ref=e227] [cursor=pointer]:
              - img [ref=e228]
      - generic [ref=e230]:
        - main [ref=e231]:
          - generic [ref=e235]:
            - img [ref=e236]
            - generic [ref=e239]:
              - heading "No Grafana connections yet" [level=6] [ref=e240]
              - paragraph [ref=e241]: Add a Grafana connection to browse and render its dashboards here. You can manage all connections anytime under Lifecycle → Connections.
            - button "Add a Grafana connection" [ref=e242] [cursor=pointer]:
              - img [ref=e244]
              - text: Add a Grafana connection
        - contentinfo [ref=e246]:
          - paragraph [ref=e247]:
            - generic [ref=e248] [cursor=pointer]:
              - text: Built with
              - img [ref=e249]
              - text: by the Meshery Community
  - alert [ref=e252]
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
  70  |     await expect(submenuItem).toBeVisible();
> 71  |     await submenuItem.click();
      |                       ^ Error: locator.click: Test timeout of 180000ms exceeded.
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