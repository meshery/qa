# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: extensions.spec.ts >> Extensions Section Tests >> Verify Meshery Adapter for Istio Section
- Location: tests/e2e/extensions.spec.ts:83:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:9081/
Call log:
  - navigating to "http://localhost:9081/", waiting until "domcontentloaded"

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
  61  |   async navigateToMenu(navItem, options = {}) {
  62  |     const menuItem = this.page.getByTestId(navItem);
  63  |     await expect(menuItem).toBeVisible(options.timeout ? { timeout: options.timeout } : undefined);
  64  |     await menuItem.click();
  65  |   }
  66  | 
  67  |   // Expanding a left-nav section and clicking one of its children is not a
  68  |   // single settled interaction: the parent is a link that both navigates and
  69  |   // toggles the section, and a click that lands before the navigator has
  70  |   // hydrated is swallowed with no error. The submenu then never opens, so
  71  |   // waiting on the child is waiting on an element that will never appear -
  72  |   // which is why this timed out after resolving the child ~90 times as
  73  |   // "hidden" rather than failing fast (5 of the 20 CI runs to 2026-08-05).
  74  |   //
  75  |   // Retrying the parent click until the child is actually visible fixes the
  76  |   // race at its cause. A longer timeout cannot, because no amount of waiting
  77  |   // re-sends the swallowed click.
  78  |   async navigateToSubMenuItem(parentItem, childItem) {
  79  |     const submenuItem = this.page.getByTestId(childItem);
  80  |     // Bound BOTH waits inside the retry. With the parent check left on the
  81  |     // default 60s expect timeout, a single attempt could consume most of the
  82  |     // test budget and the case died on the 180s test timeout instead of its own
  83  |     // assertion - and a test-level timeout reports no locator, no snippet and no
  84  |     // file location, so the failure said nothing at all. Short per-attempt
  85  |     // timeouts make each retry cheap and let this fail legibly at ~60s.
  86  |     await expect(async () => {
  87  |       // Only click the parent when the submenu is not already open. The parent
  88  |       // both navigates and toggles, so an unconditional click on a retry can
  89  |       // CLOSE a submenu a previous attempt had just opened - the retry would
  90  |       // then fight itself, which is a plausible mechanism for this staying
  91  |       // flaky after the click was made retryable at all.
  92  |       if (!(await submenuItem.isVisible())) {
  93  |         await this.navigateToMenu(parentItem, { timeout: 5_000 });
  94  |       }
  95  |       await expect(submenuItem).toBeVisible({ timeout: 5_000 });
  96  |     }).toPass({ timeout: 60_000 });
  97  |     await submenuItem.click();
  98  |   }
  99  | 
  100 |   async navigateToDashboard() {
> 101 |     await this.page.goto(LEFT_NAV.DASHBOARD.path, { waitUntil: 'domcontentloaded' });
      |                     ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:9081/
  102 |     await expect(this.navigationPanel).toBeVisible();
  103 |     await expect(this.headerMenu).toBeVisible();
  104 |   }
  105 | 
  106 |   async navigateToPerformance() {
  107 |     await this.navigateToMenu(LEFT_NAV.PERFORMANCE.name);
  108 |   }
  109 | 
  110 |   async navigateToExtensions() {
  111 |     await this.navigateToMenu(LEFT_NAV.EXTENSIONS.name);
  112 |   }
  113 | 
  114 |   async navigateToTelemetry() {
  115 |     await this.navigateToMenu(LEFT_NAV.TELEMETRY.name);
  116 |   }
  117 | 
  118 |   async navigateToTelemetryCharts() {
  119 |     await this.navigateToSubMenuItem(LEFT_NAV.TELEMETRY.name, LEFT_NAV.TELEMETRY.NAV_ITEMS.CHARTS);
  120 |   }
  121 | 
  122 |   async navigateToTelemetryMetrics() {
  123 |     await this.navigateToSubMenuItem(LEFT_NAV.TELEMETRY.name, LEFT_NAV.TELEMETRY.NAV_ITEMS.METRICS);
  124 |   }
  125 | 
  126 |   async navigateToLifecycle() {
  127 |     await this.navigateToMenu(LEFT_NAV.LIFECYCLE.name);
  128 |   }
  129 | 
  130 |   async navigateToConfiguration() {
  131 |     await this.navigateToMenu(LEFT_NAV.CONFIGURATION.name);
  132 |   }
  133 | 
  134 |   async navigateToConnections() {
  135 |     await this.navigateToSubMenuItem(
  136 |       LEFT_NAV.LIFECYCLE.name,
  137 |       LEFT_NAV.LIFECYCLE.NAV_ITEMS.CONNECTIONS,
  138 |     );
  139 |   }
  140 | 
  141 |   async navigateToEnvironment() {
  142 |     await this.navigateToSubMenuItem(
  143 |       LEFT_NAV.LIFECYCLE.name,
  144 |       LEFT_NAV.LIFECYCLE.NAV_ITEMS.ENVIRONMENT,
  145 |     );
  146 |   }
  147 | 
  148 |   async navigateToWorkspace() {
  149 |     await this.navigateToSubMenuItem(
  150 |       LEFT_NAV.LIFECYCLE.name,
  151 |       LEFT_NAV.LIFECYCLE.NAV_ITEMS.WORKSPACE,
  152 |     );
  153 |   }
  154 | 
  155 |   async navigateToAdapters() {
  156 |     await this.navigateToSubMenuItem(
  157 |       LEFT_NAV.LIFECYCLE.name,
  158 |       LEFT_NAV.LIFECYCLE.NAV_ITEMS.ADAPTERS,
  159 |     );
  160 |   }
  161 | 
  162 |   async navigateToProfiles() {
  163 |     await this.navigateToSubMenuItem(
  164 |       LEFT_NAV.PERFORMANCE.name,
  165 |       LEFT_NAV.PERFORMANCE.NAV_ITEMS.PROFILES,
  166 |     );
  167 |   }
  168 | 
  169 |   async navigateToHeaderItem(navItem) {
  170 |     await expect(this.headerMenu).toBeVisible();
  171 |     await this.headerMenu.click();
  172 |     const headerItem = this.page.getByTestId(navItem);
  173 |     await expect(headerItem).toBeVisible();
  174 |     await headerItem.click();
  175 |   }
  176 | 
  177 |   async navigateToSettings() {
  178 |     await this.navigateToHeaderItem(HEADER_NAV.NAV_ITEMS.SETTINGS);
  179 |   }
  180 | 
  181 |   async navigateToPreferences() {
  182 |     await this.navigateToHeaderItem(HEADER_NAV.NAV_ITEMS.PREFERENCES);
  183 |   }
  184 | 
  185 |   async navigateToDesigns() {
  186 |     await this.navigateToSubMenuItem(
  187 |       LEFT_NAV.CONFIGURATION.name,
  188 |       LEFT_NAV.CONFIGURATION.NAV_ITEMS.DESIGNS,
  189 |     );
  190 |   }
  191 | 
  192 |   async navigateToLogout() {
  193 |     await this.navigateToHeaderItem(HEADER_NAV.NAV_ITEMS.LOGOUT);
  194 |   }
  195 | }
  196 | 
```