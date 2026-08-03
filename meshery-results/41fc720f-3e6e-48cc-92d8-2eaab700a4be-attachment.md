# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: connections.spec.ts >> Connection Management Tests >> Discover multiple kubeconfig contexts in the wizard
- Location: tests/e2e/connections.spec.ts:143:7

# Error details

```
Test timeout of 180000ms exceeded while running "beforeEach" hook.
```

```
Error: locator.click: Test timeout of 180000ms exceeded.
Call log:
  - waiting for getByTestId('connection')
    - locator resolved to <a tabindex="0" role="button" data-testid="connection" class="MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters css-1ks2hge">…</a>
  - attempting click action
    - waiting for element to be visible, enabled and stable
  - element was detached from the DOM, retrying
    - locator resolved to <a tabindex="0" role="button" data-testid="connection" class="MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters css-wv1wog">…</a>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    239 × waiting for element to be visible, enabled and stable
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
              - button "Expand" [ref=e30]:
                - img [ref=e31]:
                  - img [ref=e32]
            - generic [ref=e35] [cursor=pointer]: Connections
            - generic:
              - generic: Credentials
            - generic [ref=e37] [cursor=pointer]: Environments
            - generic [ref=e39] [cursor=pointer]: Workspaces
            - generic [ref=e41] [cursor=pointer]: Adapters
          - generic [ref=e42]:
            - link "Configuration Expand" [ref=e43] [cursor=pointer]:
              - /url: /configuration/designs
              - generic [ref=e44]:
                - img [ref=e46]
                - generic [ref=e51]: Configuration
              - button "Expand" [ref=e52]
            - generic:
              - generic: Catalog
            - generic [ref=e54] [cursor=pointer]: Designs
          - generic [ref=e55]:
            - link "Telemetry Expand" [ref=e56] [cursor=pointer]:
              - /url: /telemetry
              - generic [ref=e57]:
                - img [ref=e59]
                - generic [ref=e63]: Telemetry
              - button "Expand" [ref=e64]
            - generic [ref=e66] [cursor=pointer]: Charts
            - generic [ref=e68] [cursor=pointer]: Metrics
          - generic [ref=e69]:
            - link "meshery-button-2 Performance Expand" [ref=e70] [cursor=pointer]:
              - /url: /performance
              - generic [ref=e71]:
                - img "meshery-button-2" [ref=e73]
                - generic [ref=e99]: Performance
              - button "Expand" [ref=e100]
            - generic [ref=e102] [cursor=pointer]: Profiles
          - link "Extensions" [ref=e104] [cursor=pointer]:
            - /url: /extensions
            - generic [ref=e105]:
              - img [ref=e107]
              - generic [ref=e134]: Extensions
          - separator [ref=e135]
        - generic [ref=e136]:
          - img [ref=e139] [cursor=pointer]
          - group [ref=e141]:
            - listitem [ref=e142]:
              - link [ref=e143] [cursor=pointer]:
                - /url: https://docs.meshery.io
                - img [ref=e145]
            - listitem [ref=e147]:
              - link [ref=e148] [cursor=pointer]:
                - /url: https://slack.meshery.io
                - img [ref=e150]
            - listitem [ref=e159]:
              - link [ref=e160] [cursor=pointer]:
                - /url: https://meshery.io/community#community-forums
                - img [ref=e162]
            - listitem [ref=e164]:
              - link [ref=e165] [cursor=pointer]:
                - /url: https://github.com/meshery/meshery/issues/new/choose
                - img [ref=e167]
          - listitem [ref=e169]:
            - generic [ref=e170]:
              - text: undefined
              - link [ref=e172] [cursor=pointer]:
                - /url: https://docs.meshery.io/project/releases/undefined
                - img [ref=e173]
              - generic [ref=e175]:
                - text: Update available
                - link [ref=e176] [cursor=pointer]:
                  - /url: https://docs.meshery.io/project/releases/v1.0.63
                  - img [ref=e177]
    - generic [ref=e179]:
      - banner [ref=e180]:
        - generic [ref=e182]:
          - generic [ref=e184]:
            - button [ref=e186] [cursor=pointer]:
              - img [ref=e187]
            - text: /
            - button [ref=e196] [cursor=pointer]:
              - img [ref=e197]
            - text: /
            - heading "Lifecycle" [level=5] [ref=e201]
          - generic [ref=e203]:
            - button "contexts" [ref=e206] [cursor=pointer]:
              - generic [ref=e207]:
                - img [ref=e208]
                - generic [ref=e209]: "0"
            - button [ref=e212] [cursor=pointer]:
              - img [ref=e213]
            - button [ref=e220] [cursor=pointer]:
              - img [ref=e222]
            - button [ref=e225] [cursor=pointer]:
              - img [ref=e226]
      - generic [ref=e228]:
        - main [ref=e229]:
          - generic [ref=e230]:
            - tablist [ref=e234]:
              - tab "Connections" [selected] [ref=e235] [cursor=pointer]:
                - generic [ref=e236]:
                  - generic [ref=e237]: Connections
                  - img [ref=e238]
              - tab "MeshSync" [ref=e272] [cursor=pointer]:
                - generic [ref=e273]:
                  - generic [ref=e274]: MeshSync
                  - img [ref=e275]
                  - img [ref=e286]
            - generic [ref=e289]:
              - button "Create Connection" [ref=e292] [cursor=pointer]:
                - img [ref=e293]
                - paragraph [ref=e296]: Create Connection
              - generic [ref=e297]:
                - generic [ref=e299]:
                  - generic:
                    - generic:
                      - textbox "Search Connections..."
                  - button [ref=e301] [cursor=pointer]:
                    - img [ref=e302]
                - button [ref=e307] [cursor=pointer]:
                  - img [ref=e308]
                - button [ref=e313] [cursor=pointer]:
                  - img [ref=e314]
            - generic [ref=e316]:
              - grid [ref=e318]:
                - caption [ref=e319]
                - rowgroup [ref=e320]:
                  - row "Name Environments Kind Category Discovered At Status Actions" [ref=e321]:
                    - columnheader [ref=e322]:
                      - generic [ref=e324] [cursor=pointer]:
                        - checkbox [ref=e325]
                        - img [ref=e326]
                    - columnheader "Name" [ref=e328]:
                      - generic [ref=e329]:
                        - generic [ref=e330]:
                          - paragraph [ref=e331]: Name
                          - button [ref=e333] [cursor=pointer]:
                            - img [ref=e334]
                        - button [ref=e336] [cursor=pointer]:
                          - img [ref=e337]
                    - columnheader "Environments" [ref=e339]:
                      - generic [ref=e341]:
                        - paragraph [ref=e342]: Environments
                        - button [ref=e344] [cursor=pointer]:
                          - img [ref=e345]
                    - columnheader "Kind" [ref=e347]:
                      - generic [ref=e348]:
                        - generic [ref=e349]:
                          - paragraph [ref=e350]: Kind
                          - button [ref=e352] [cursor=pointer]:
                            - img [ref=e353]
                        - button [ref=e355] [cursor=pointer]:
                          - img [ref=e356]
                    - columnheader "Category" [ref=e358]:
                      - generic [ref=e359]:
                        - generic [ref=e360]:
                          - paragraph [ref=e361]: Category
                          - button [ref=e363] [cursor=pointer]:
                            - img [ref=e364]
                        - button [ref=e366] [cursor=pointer]:
                          - img [ref=e367]
                    - columnheader "Discovered At" [ref=e369]:
                      - generic [ref=e370]:
                        - generic [ref=e371]:
                          - paragraph [ref=e372]: Discovered At
                          - button [ref=e374] [cursor=pointer]:
                            - img [ref=e375]
                        - button [ref=e377] [cursor=pointer]:
                          - img [ref=e378]
                    - columnheader "Status" [ref=e380]:
                      - generic [ref=e381]:
                        - generic [ref=e382]:
                          - paragraph [ref=e383]: Status
                          - button [ref=e385] [cursor=pointer]:
                            - img [ref=e386]
                        - button [ref=e388] [cursor=pointer]:
                          - img [ref=e389]
                    - columnheader "Actions" [ref=e391]
                - rowgroup [ref=e392]:
                  - row "meshery Select or create an environment meshery 3 minutes ago -" [ref=e393] [cursor=pointer]:
                    - gridcell [ref=e394]:
                      - generic [ref=e396]:
                        - checkbox [ref=e397]
                        - img [ref=e398]
                    - gridcell "meshery" [ref=e400]:
                      - button "meshery" [ref=e403]:
                        - img [ref=e407]
                        - generic [ref=e409]: meshery
                        - img [ref=e410]
                    - gridcell "Select or create an environment" [ref=e412]:
                      - generic [ref=e417]:
                        - log [ref=e419]
                        - generic [ref=e420]:
                          - generic [ref=e421]:
                            - generic [ref=e422]: Select or create an environment
                            - combobox [ref=e424]
                          - img [ref=e428]
                    - gridcell "meshery" [ref=e430]:
                      - generic [ref=e431]: meshery
                    - gridcell [ref=e432]
                    - gridcell "3 minutes ago" [ref=e433]:
                      - generic [ref=e435]: 3 minutes ago
                    - gridcell [ref=e436]:
                      - generic [ref=e439]:
                        - combobox [ref=e440]:
                          - generic [ref=e441]:
                            - img [ref=e442]
                            - generic [ref=e444]: registered
                        - textbox: registered
                        - img
                        - group
                    - gridcell "-" [ref=e445]:
                      - generic [ref=e447]: "-"
                  - row "Artifact Hub Select or create an environment artifacthub source 3 minutes ago -" [ref=e448] [cursor=pointer]:
                    - gridcell [ref=e449]:
                      - generic [ref=e451]:
                        - checkbox [ref=e452]
                        - img [ref=e453]
                    - gridcell "Artifact Hub" [ref=e455]:
                      - button "Artifact Hub" [ref=e458]:
                        - img [ref=e462]
                        - generic [ref=e464]: Artifact Hub
                        - img [ref=e465]
                    - gridcell "Select or create an environment" [ref=e467]:
                      - generic [ref=e472]:
                        - log [ref=e474]
                        - generic [ref=e475]:
                          - generic [ref=e476]:
                            - generic [ref=e477]: Select or create an environment
                            - combobox [ref=e479]
                          - img [ref=e483]
                    - gridcell "artifacthub" [ref=e485]:
                      - generic [ref=e486]: artifacthub
                    - gridcell "source" [ref=e487]:
                      - generic [ref=e488]: source
                    - gridcell "3 minutes ago" [ref=e489]:
                      - generic [ref=e491]: 3 minutes ago
                    - gridcell [ref=e492]:
                      - generic [ref=e495]:
                        - combobox [ref=e496]:
                          - generic [ref=e497]:
                            - img [ref=e498]
                            - generic [ref=e500]: registered
                        - textbox: registered
                        - img
                        - group
                    - gridcell "-" [ref=e501]:
                      - generic [ref=e503]: "-"
                  - row "GitHub Select or create an environment github source 3 minutes ago -" [ref=e504] [cursor=pointer]:
                    - gridcell [ref=e505]:
                      - generic [ref=e507]:
                        - checkbox [ref=e508]
                        - img [ref=e509]
                    - gridcell "GitHub" [ref=e511]:
                      - button "GitHub" [ref=e514]:
                        - img [ref=e518]
                        - generic [ref=e520]: GitHub
                        - img [ref=e521]
                    - gridcell "Select or create an environment" [ref=e523]:
                      - generic [ref=e528]:
                        - log [ref=e530]
                        - generic [ref=e531]:
                          - generic [ref=e532]:
                            - generic [ref=e533]: Select or create an environment
                            - combobox [ref=e535]
                          - img [ref=e539]
                    - gridcell "github" [ref=e541]:
                      - generic [ref=e542]: github
                    - gridcell "source" [ref=e543]:
                      - generic [ref=e544]: source
                    - gridcell "3 minutes ago" [ref=e545]:
                      - generic [ref=e547]: 3 minutes ago
                    - gridcell [ref=e548]:
                      - generic [ref=e551]:
                        - combobox [ref=e552]:
                          - generic [ref=e553]:
                            - img [ref=e554]
                            - generic [ref=e556]: registered
                        - textbox: registered
                        - img
                        - group
                    - gridcell "-" [ref=e557]:
                      - generic [ref=e559]: "-"
                  - row "Artifact Hub Select or create an environment artifacthub 3 minutes ago -" [ref=e560] [cursor=pointer]:
                    - gridcell [ref=e561]:
                      - generic [ref=e563]:
                        - checkbox [ref=e564]
                        - img [ref=e565]
                    - gridcell "Artifact Hub" [ref=e567]:
                      - button "Artifact Hub" [ref=e570]:
                        - img [ref=e574]
                        - generic [ref=e576]: Artifact Hub
                        - img [ref=e577]
                    - gridcell "Select or create an environment" [ref=e579]:
                      - generic [ref=e584]:
                        - log [ref=e586]
                        - generic [ref=e587]:
                          - generic [ref=e588]:
                            - generic [ref=e589]: Select or create an environment
                            - combobox [ref=e591]
                          - img [ref=e595]
                    - gridcell "artifacthub" [ref=e597]:
                      - generic [ref=e598]: artifacthub
                    - gridcell [ref=e599]
                    - gridcell "3 minutes ago" [ref=e600]:
                      - generic [ref=e602]: 3 minutes ago
                    - gridcell [ref=e603]:
                      - generic [ref=e606]:
                        - combobox [ref=e607]:
                          - generic [ref=e608]:
                            - img [ref=e609]
                            - generic [ref=e611]: registered
                        - textbox: registered
                        - img
                        - group
                    - gridcell "-" [ref=e612]:
                      - generic [ref=e614]: "-"
              - table [ref=e615]:
                - rowgroup [ref=e616]:
                  - 'row "Rows per page: 1-4 of 4 Previous Page Next Page" [ref=e617]':
                    - 'cell "Rows per page: 1-4 of 4 Previous Page Next Page" [ref=e618]':
                      - generic [ref=e621]:
                        - paragraph [ref=e622]: "Rows per page:"
                        - generic [ref=e623]:
                          - combobox "Rows per page:" [ref=e624] [cursor=pointer]: "10"
                          - textbox: "10"
                          - img
                        - paragraph [ref=e625]: 1-4 of 4
                        - generic [ref=e626]:
                          - button "Previous Page" [disabled]:
                            - img
                          - button "Next Page" [disabled]:
                            - img
        - contentinfo [ref=e628]:
          - paragraph [ref=e629]:
            - generic [ref=e630] [cursor=pointer]:
              - text: Built with
              - img [ref=e631]
              - text: by the Meshery Community
  - alert [ref=e634]
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