# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: models.spec.ts >> Model Workflow Tests >> Import a Model via CSV Import
- Location: tests/e2e/models.spec.ts:150:7

# Error details

```
Test timeout of 240000ms exceeded.
```

```
Error: locator.click: Test timeout of 240000ms exceeded.
Call log:
  - waiting for getByTestId('TabBar-Button-ImportModel')

```

# Page snapshot

```yaml
- generic [ref=e1]:
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
            - generic [ref=e53] [cursor=pointer]: Catalog
            - generic [ref=e55] [cursor=pointer]: Designs
          - generic [ref=e56]:
            - link "Telemetry Expand" [ref=e57] [cursor=pointer]:
              - /url: /telemetry
              - generic [ref=e58]:
                - img [ref=e60]
                - generic [ref=e64]: Telemetry
              - button "Expand" [ref=e65]
            - generic [ref=e67] [cursor=pointer]: Charts
            - generic [ref=e69] [cursor=pointer]: Metrics
          - generic [ref=e70]:
            - link "Performance Expand" [ref=e71] [cursor=pointer]:
              - /url: /performance
              - generic [ref=e72]:
                - img [ref=e74]
                - generic [ref=e100]: Performance
              - button "Expand" [ref=e101]
            - generic [ref=e103] [cursor=pointer]: Profiles
          - link "Extensions" [ref=e105] [cursor=pointer]:
            - /url: /extensions
            - generic [ref=e106]:
              - img [ref=e108]
              - generic [ref=e135]: Extensions
          - generic [ref=e136]:
            - separator [ref=e137]
            - button "Kanvas icon Kanvas" [ref=e139] [cursor=pointer]:
              - link "Kanvas icon Kanvas" [ref=e140]:
                - /url: /extension/meshmap
                - generic [ref=e142]:
                  - img "Kanvas icon" [ref=e144]
                  - generic [ref=e146]: Kanvas
          - separator [ref=e147]
        - generic [ref=e148]:
          - button "Toggle sidebar navigation" [expanded] [ref=e149] [cursor=pointer]:
            - img [ref=e151]
          - group [ref=e153]:
            - listitem [ref=e154]:
              - link [ref=e155] [cursor=pointer]:
                - /url: https://docs.meshery.io
                - img [ref=e157]
            - listitem [ref=e159]:
              - link [ref=e160] [cursor=pointer]:
                - /url: https://slack.meshery.io
                - img [ref=e162]
            - listitem [ref=e171]:
              - link [ref=e172] [cursor=pointer]:
                - /url: https://discuss.meshery.io
                - img [ref=e174]
            - listitem [ref=e176]:
              - link [ref=e177] [cursor=pointer]:
                - /url: https://github.com/meshery/meshery/issues/new/choose
                - img [ref=e179]
          - listitem [ref=e181]:
            - generic [ref=e182]:
              - text: undefined
              - link [ref=e184] [cursor=pointer]:
                - /url: https://docs.meshery.io/project/releases/undefined
                - img [ref=e185]
              - generic [ref=e187]:
                - text: Update available
                - link [ref=e188] [cursor=pointer]:
                  - /url: https://docs.meshery.io/project/releases/v1.0.83
                  - img [ref=e189]
    - generic [ref=e191]:
      - banner [ref=e192]:
        - generic [ref=e194]:
          - generic [ref=e196]:
            - button [ref=e198] [cursor=pointer]:
              - img [ref=e199]
            - text: /
            - button [ref=e208] [cursor=pointer]:
              - img [ref=e209]
            - group [ref=e213]:
              - generic [ref=e218]:
                - combobox [ref=e219] [cursor=pointer]:
                  - generic [ref=e220]: My Workspace
                - textbox: 47e67b82-133f-4c4a-aaab-534e83afd8b5
                - img
                - group
            - heading "Settings" [level=5] [ref=e221]
          - generic [ref=e223]:
            - button "contexts" [ref=e226] [cursor=pointer]:
              - generic [ref=e227]:
                - img [ref=e228]
                - generic [ref=e229]: "29"
            - button [ref=e232] [cursor=pointer]:
              - generic [ref=e233]:
                - img [ref=e234]
                - generic [ref=e237]: 99+
            - button [ref=e241] [cursor=pointer]:
              - img [ref=e243]
            - button [ref=e245] [cursor=pointer]:
              - img [ref=e246]
      - generic [ref=e248]:
        - main [ref=e249]:
          - generic [ref=e250]:
            - tablist [ref=e254]:
              - tab "Meshery logo Overview" [selected] [ref=e255] [cursor=pointer]:
                - img "Meshery logo" [ref=e256]
                - text: Overview
              - tab "Adapters" [ref=e257] [cursor=pointer]:
                - img [ref=e258]
                - text: Adapters
              - tab "Registry" [active] [ref=e260] [cursor=pointer]:
                - img [ref=e261]
                - text: Registry
              - tab "Operator, MeshSync & Broker" [ref=e263] [cursor=pointer]:
                - img [ref=e264]
                - text: Operator, MeshSync & Broker
              - tab "Reset" [ref=e266] [cursor=pointer]:
                - img [ref=e267]
                - text: Reset
            - generic [ref=e271]:
              - generic [ref=e272]:
                - generic [ref=e273]:
                  - heading "Current Provider" [level=6] [ref=e274]
                  - paragraph [ref=e275]: Meshery (remote)
                - link "Learn about providers" [ref=e276] [cursor=pointer]:
                  - /url: https://docs.meshery.io/extensibility/providers
              - generic [ref=e277]:
                - link "Models by Category" [ref=e279] [cursor=pointer]:
                  - /url: /settings?settingsCategory=Registry&tab=Models
                  - generic [ref=e280]:
                    - generic [ref=e281]:
                      - heading "Models by Category" [level=6] [ref=e282]
                      - img [ref=e285]
                    - img [ref=e289]:
                      - generic [ref=e292]:
                        - generic [ref=e293]: Modelsby Category
                        - generic [ref=e294]:
                          - generic: "51"
                        - generic [ref=e300]:
                          - generic: "61"
                        - generic [ref=e303]:
                          - generic: "32"
                        - generic [ref=e306]:
                          - generic: "17"
                        - generic [ref=e312]:
                          - generic: "31"
                        - generic [ref=e315]:
                          - generic: "39"
                        - generic [ref=e324]:
                          - generic: "26"
                - link "Registry" [ref=e340] [cursor=pointer]:
                  - /url: /settings?settingsCategory=Registry
                  - generic [ref=e341]:
                    - generic [ref=e342]:
                      - heading "Registry" [level=6] [ref=e343]
                      - img [ref=e346]
                    - img [ref=e350]:
                      - generic [ref=e353]:
                        - generic [ref=e354]: RegisteredCapabilitiesby Type
                        - generic [ref=e355]:
                          - generic: 5.9%
                        - generic [ref=e358]:
                          - generic: 82.0%
                        - generic [ref=e361]:
                          - generic: 12.1%
                      - generic [ref=e367]:
                        - generic [ref=e368]:
                          - generic: Models
                        - generic [ref=e370]:
                          - generic: Components
                        - generic [ref=e372]:
                          - generic: Relationships
                        - generic [ref=e374]:
                          - generic: Registrants
              - generic [ref=e376]:
                - link "Connections" [ref=e378] [cursor=pointer]:
                  - /url: /management/connections
                  - generic [ref=e379]:
                    - generic [ref=e380]:
                      - heading "Connections" [level=6] [ref=e381]
                      - img [ref=e384]
                    - img [ref=e388]:
                      - generic [ref=e391]:
                        - generic [ref=e392]: Connections by Status
                        - generic [ref=e393]:
                          - generic: "29"
                        - generic [ref=e396]:
                          - generic: "5"
                      - generic [ref=e399]:
                        - generic [ref=e400]:
                          - generic: not found
                        - generic [ref=e402]:
                          - generic: connected
                - link "Configuration" [ref=e405] [cursor=pointer]:
                  - /url: /configuration/designs
                  - generic [ref=e406]:
                    - generic [ref=e407]:
                      - heading "Configuration" [level=6] [ref=e408]
                      - img [ref=e411]
                    - img [ref=e415]:
                      - generic [ref=e418]:
                        - generic [ref=e419]: Contentby Type
                        - generic [ref=e420]:
                          - generic: "52158"
                      - generic [ref=e426]:
                        - generic [ref=e427]:
                          - generic: Designs
                        - generic [ref=e429]:
                          - generic: Filters
        - contentinfo [ref=e431]:
          - paragraph [ref=e432]:
            - generic [ref=e433] [cursor=pointer]:
              - text: Built with
              - img [ref=e434]
              - text: by the Meshery Community
  - alert [ref=e437]: Settings | Meshery
  - tooltip "Registry" [ref=e438]:
    - paragraph [ref=e440]: Registry
```

# Test source

```ts
  51  |   test.beforeEach(async ({ page }) => {
  52  |     const dashboardPage = new DashboardPage(page);
  53  |     await dashboardPage.navigateToDashboard();
  54  |     await dashboardPage.navigateToSettings();
  55  |     await expect(page.getByTestId('settings-tab-registry')).toBeVisible();
  56  |     await page.getByTestId('settings-tab-registry').click();
  57  |   });
  58  | 
  59  |   test('Create a Model', async ({ page }) => {
  60  |     // Model generation downloads from GitHub and can be very slow in CI.
  61  |     // test.slow() triples the default timeout (60s → 180s).
  62  |     test.slow();
  63  |     test.setTimeout(600_000);
  64  | 
  65  |     await page.getByTestId('TabBar-Button-CreateModel').click();
  66  | 
  67  |     await page.locator('#model-name').fill(model.MODEL_NAME);
  68  |     await page.locator('#model-display-name').fill(model.MODEL_DISPLAY_NAME);
  69  | 
  70  |     await page.getByTestId('UrlStepper-Button-Next').click();
  71  | 
  72  |     await expect(page.getByTestId('UrlStepper-Select-Category')).toBeVisible();
  73  |     await expect(page.getByTestId('UrlStepper-Select-Subcategory')).toBeVisible();
  74  | 
  75  |     await page.getByTestId('UrlStepper-Button-Next').click();
  76  | 
  77  |     await expect(page.getByTestId('UrlStepper-Select-Logo-Dark-Theme')).toBeVisible();
  78  |     await expect(page.getByTestId('UrlStepper-Select-Logo-Light-Theme')).toBeVisible();
  79  | 
  80  |     await expect(page.getByTestId('UrlStepper-Select-Primary-Color')).toBeVisible();
  81  |     await expect(page.getByTestId('UrlStepper-Select-Secondary-Color')).toBeVisible();
  82  |     await expect(page.getByTestId('UrlStepper-Select-Shape')).toBeVisible();
  83  | 
  84  |     await page.getByTestId('UrlStepper-Button-Next').click();
  85  | 
  86  |     await page.getByTestId('UrlStepper-Select-Source-GitHub').check();
  87  |     await page.locator('#model-url').fill(model.MODEL_URL);
  88  | 
  89  |     await page.getByTestId('UrlStepper-Button-Next').click();
  90  |     await page.getByTestId('UrlStepper-Visual-Annotation-Checkbox').check();
  91  |     await page.getByTestId('UrlStepper-Button-Next').click();
  92  | 
  93  |     await page.getByTestId('UrlStepper-Button-Generate').click();
  94  | 
  95  |     // Model generation fetches from GitHub — wait with extended timeout
  96  |     await expect(
  97  |       page.getByTestId(`ModelImportedSection-ModelHeader-${model.MODEL_NAME}`),
  98  |     ).toBeVisible({ timeout: 540_000 });
  99  |     await expect(page.getByTestId('ModelImportMessages-Wrapper')).toBeVisible();
  100 | 
  101 |     await page.getByTestId('UrlStepper-Button-Finish').click();
  102 |   });
  103 | 
  104 |   test('Search a Model and Export it', async ({ page }) => {
  105 |     await page.getByTestId('search-icon').click();
  106 |     await page.locator('#searchClick').click();
  107 |     await page.locator('#searchClick').fill(model.MODEL_DISPLAY_NAME);
  108 |     await page.getByText(model.MODEL_DISPLAY_NAME).click();
  109 | 
  110 |     const downloadPromise = page.waitForEvent('download');
  111 |     await page.getByTestId('export-model-button').click();
  112 |     const download = await downloadPromise;
  113 |     expect(download).toBeDefined();
  114 |     await page.getByRole('combobox', { name: 'Model status' }).click();
  115 |     await page.getByRole('option', { name: 'ignored' }).click();
  116 |     await expect(page.getByRole('combobox', { name: 'Model status' })).toHaveText(/ignored/i);
  117 |   });
  118 | 
  119 |   test('Import a Model via File Import', async ({ page }) => {
  120 |     await page.getByTestId('TabBar-Button-ImportModel').click();
  121 |     await page.getByRole('heading', { name: 'File Import', exact: true }).click();
  122 | 
  123 |     await page.setInputFiles('input[type="file"]', model_import.MODEL_FILE_IMPORT);
  124 | 
  125 |     await page.getByRole('button', { name: 'Next' }).click();
  126 | 
  127 |     await expect(
  128 |       page.getByTestId(`ModelImportedSection-ModelHeader-${model_import.MODEL_NAME}`),
  129 |     ).toBeVisible();
  130 |     await expect(page.getByTestId('ModelImportMessages-Wrapper')).toBeVisible();
  131 |     await page.getByRole('button', { name: 'Finish' }).click();
  132 |   });
  133 | 
  134 |   test('Import a Model via Url Import', async ({ page }) => {
  135 |     await page.getByTestId('TabBar-Button-ImportModel').click();
  136 |     await page.getByRole('heading', { name: 'URL Import', exact: true }).click();
  137 | 
  138 |     await page.getByRole('textbox', { name: 'URL' }).click();
  139 |     await page.getByRole('textbox', { name: 'URL' }).fill(model_import.MODEL_URL_IMPORT);
  140 | 
  141 |     await page.getByRole('button', { name: 'Next' }).click();
  142 | 
  143 |     await expect(
  144 |       page.getByTestId(`ModelImportedSection-ModelHeader-${model_import.MODEL_NAME}`),
  145 |     ).toBeVisible();
  146 |     await expect(page.getByTestId('ModelImportMessages-Wrapper')).toBeVisible();
  147 |     await page.getByRole('button', { name: 'Finish' }).click();
  148 |   });
  149 | 
  150 |   test('Import a Model via CSV Import', async ({ page }) => {
> 151 |     await page.getByTestId('TabBar-Button-ImportModel').click();
      |                                                         ^ Error: locator.click: Test timeout of 240000ms exceeded.
  152 |     await page.getByRole('heading', { name: 'CSV Import', exact: true }).click();
  153 | 
  154 |     await page.getByRole('button', { name: 'Next' }).click();
  155 | 
  156 |     await page.setInputFiles('input[type="file"]', model_import.MODEL_CSV_IMPORT.Models);
  157 |     await page.getByRole('button', { name: 'Next' }).click();
  158 |     await page.setInputFiles('input[type="file"]', model_import.MODEL_CSV_IMPORT.Components);
  159 |     await page.getByRole('button', { name: 'Next' }).click();
  160 |     await page.setInputFiles('input[type="file"]', model_import.MODEL_CSV_IMPORT.Relationships);
  161 | 
  162 |     await page.getByRole('button', { name: 'Generate' }).click();
  163 | 
  164 |     await expect(
  165 |       page.getByTestId(
  166 |         `ModelImportedSection-ModelHeader-${model_import.MODEL_CSV_IMPORT.Model_Name}`,
  167 |       ),
  168 |     ).toBeVisible();
  169 |     await expect(page.getByTestId('ModelImportMessages-Wrapper')).toBeVisible();
  170 |     await page.getByRole('button', { name: 'Finish' }).click();
  171 |   });
  172 | });
  173 | 
```