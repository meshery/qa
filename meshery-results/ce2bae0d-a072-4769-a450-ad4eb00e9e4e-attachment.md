# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: models.spec.ts >> Model Workflow Tests >> Import a Model via File Import
- Location: tests/e2e/models.spec.ts:119:7

# Error details

```
Test timeout of 240000ms exceeded.
```

```
Error: locator.click: Test timeout of 240000ms exceeded.
Call log:
  - waiting for getByRole('heading', { name: 'File Import', exact: true })

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
                  - /url: https://docs.meshery.io/project/releases/v1.0.79
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
                - generic [ref=e229]: "20"
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
              - tab "Meshery logo Overview" [ref=e255] [cursor=pointer]:
                - img "Meshery logo" [ref=e256]
                - text: Overview
              - tab "Adapters" [ref=e257] [cursor=pointer]:
                - img [ref=e258]
                - text: Adapters
              - tab "Registry" [selected] [ref=e260] [cursor=pointer]:
                - img [ref=e261]
                - text: Registry
              - tab "Operator, MeshSync & Broker" [ref=e263] [cursor=pointer]:
                - img [ref=e264]
                - text: Operator, MeshSync & Broker
              - tab "Reset" [ref=e266] [cursor=pointer]:
                - img [ref=e267]
                - text: Reset
            - generic [ref=e272]:
              - generic [ref=e274]:
                - button "Create Model" [ref=e275] [cursor=pointer]:
                  - img [ref=e277]
                  - text: Create Model
                - button "Import Model" [active] [ref=e279] [cursor=pointer]:
                  - img [ref=e281]
                  - text: Import Model
              - generic [ref=e283]:
                - button "(295) Models" [pressed] [ref=e284] [cursor=pointer]:
                  - generic [ref=e285]: (295)
                  - text: Models
                - button "(4,130) Components" [ref=e286] [cursor=pointer]:
                  - generic [ref=e287]: (4,130)
                  - text: Components
                - button "(614) Relationships" [ref=e288] [cursor=pointer]:
                  - generic [ref=e289]: (614)
                  - text: Relationships
                - button "(3) Registrants" [ref=e290] [cursor=pointer]:
                  - generic [ref=e291]: (3)
                  - text: Registrants
                - button "(5) Connections" [ref=e292] [cursor=pointer]:
                  - generic [ref=e293]: (5)
                  - text: Connections
              - generic [ref=e294]:
                - generic [ref=e296]:
                  - generic [ref=e297]:
                    - generic [ref=e299]:
                      - button [ref=e301] [cursor=pointer]:
                        - img [ref=e302]
                      - button [ref=e309] [cursor=pointer]:
                        - img [ref=e310]
                      - generic [ref=e317] [cursor=pointer]:
                        - switch "Duplicates" [ref=e320]
                        - generic [ref=e323]: Duplicates
                      - button "View duplicate entries information" [ref=e324] [cursor=pointer]:
                        - img [ref=e325]
                    - generic [ref=e328]:
                      - generic:
                        - generic:
                          - textbox "Search"
                      - button [ref=e329] [cursor=pointer]:
                        - img [ref=e330]
                  - tree "controlled" [ref=e333]:
                    - treeitem "AMD GPU" [ref=e334]:
                      - generic [ref=e335] [cursor=pointer]:
                        - img [ref=e337]
                        - generic [ref=e343]:
                          - img [ref=e344]
                          - generic [ref=e345]: AMD GPU
                    - treeitem "APISIX Ingress Controller" [ref=e346]:
                      - generic [ref=e347] [cursor=pointer]:
                        - img [ref=e349]
                        - generic [ref=e355]:
                          - img [ref=e356]
                          - generic [ref=e357]: APISIX Ingress Controller
                    - treeitem "AWS API Gateway" [ref=e358]:
                      - generic [ref=e359] [cursor=pointer]:
                        - img [ref=e361]
                        - generic [ref=e368]: AWS API Gateway
                    - treeitem "AWS API Gateway v2" [ref=e369]:
                      - generic [ref=e370] [cursor=pointer]:
                        - img [ref=e372]
                        - generic [ref=e378]:
                          - img [ref=e379]
                          - generic [ref=e380]: AWS API Gateway v2
                    - treeitem "AWS App Mesh" [ref=e381]:
                      - generic [ref=e382] [cursor=pointer]:
                        - img [ref=e384]
                        - generic [ref=e390]:
                          - img [ref=e391]
                          - generic [ref=e392]: AWS App Mesh
                    - treeitem "AWS Applilcation Autoscaling" [ref=e393]:
                      - generic [ref=e394] [cursor=pointer]:
                        - img [ref=e396]
                        - generic [ref=e402]:
                          - img [ref=e403]
                          - generic [ref=e404]: AWS Applilcation Autoscaling
                    - treeitem "AWS CloudFront" [ref=e405]:
                      - generic [ref=e406] [cursor=pointer]:
                        - img [ref=e408]
                        - generic [ref=e414]:
                          - img [ref=e415]
                          - generic [ref=e416]: AWS CloudFront
                    - treeitem "AWS CloudTrail" [ref=e417]:
                      - generic [ref=e418] [cursor=pointer]:
                        - img [ref=e420]
                        - generic [ref=e426]:
                          - img [ref=e427]
                          - generic [ref=e428]: AWS CloudTrail
                    - treeitem "AWS CloudWatch" [ref=e429]:
                      - generic [ref=e430] [cursor=pointer]:
                        - img [ref=e432]
                        - generic [ref=e438]:
                          - img [ref=e439]
                          - generic [ref=e440]: AWS CloudWatch
                    - treeitem "AWS CloudWatch Logs" [ref=e441]:
                      - generic [ref=e442] [cursor=pointer]:
                        - img [ref=e444]
                        - generic [ref=e450]:
                          - img [ref=e451]
                          - generic [ref=e452]: AWS CloudWatch Logs
                    - treeitem "AWS DocumentDB" [ref=e453]:
                      - generic [ref=e454] [cursor=pointer]:
                        - img [ref=e456]
                        - generic [ref=e462]:
                          - img [ref=e463]
                          - generic [ref=e464]: AWS DocumentDB
                    - treeitem "AWS DynamoDB" [ref=e465]:
                      - generic [ref=e466] [cursor=pointer]:
                        - img [ref=e468]
                        - generic [ref=e474]:
                          - img [ref=e475]
                          - generic [ref=e476]: AWS DynamoDB
                    - treeitem "AWS EC2" [ref=e477]:
                      - generic [ref=e478] [cursor=pointer]:
                        - img [ref=e480]
                        - generic [ref=e486]:
                          - img [ref=e487]
                          - generic [ref=e488]: AWS EC2
                    - treeitem "AWS EMR Containers" [ref=e489]:
                      - generic [ref=e490] [cursor=pointer]:
                        - img [ref=e492]
                        - generic [ref=e498]:
                          - img [ref=e499]
                          - generic [ref=e500]: AWS EMR Containers
                    - treeitem "AWS ElastiCache" [ref=e501]:
                      - generic [ref=e502] [cursor=pointer]:
                        - img [ref=e504]
                        - generic [ref=e510]:
                          - img [ref=e511]
                          - generic [ref=e512]: AWS ElastiCache
                    - treeitem "AWS Elastic Container Registry" [ref=e513]:
                      - generic [ref=e514] [cursor=pointer]:
                        - img [ref=e516]
                        - generic [ref=e522]:
                          - img [ref=e523]
                          - generic [ref=e524]: AWS Elastic Container Registry
                    - treeitem "AWS Elastic Container Service" [ref=e525]:
                      - generic [ref=e526] [cursor=pointer]:
                        - img [ref=e528]
                        - generic [ref=e534]:
                          - img [ref=e535]
                          - generic [ref=e536]: AWS Elastic Container Service
                    - treeitem "AWS Elastic File System" [ref=e537]:
                      - generic [ref=e538] [cursor=pointer]:
                        - img [ref=e540]
                        - generic [ref=e546]:
                          - img [ref=e547]
                          - generic [ref=e548]: AWS Elastic File System
                    - treeitem "AWS Elastic Kubernetes Service" [ref=e549]:
                      - generic [ref=e550] [cursor=pointer]:
                        - img [ref=e552]
                        - generic [ref=e558]:
                          - img [ref=e559]
                          - generic [ref=e560]: AWS Elastic Kubernetes Service
                    - treeitem "AWS ElasticSearch Service" [ref=e561]:
                      - generic [ref=e562] [cursor=pointer]:
                        - img [ref=e564]
                        - generic [ref=e570]:
                          - img [ref=e571]
                          - generic [ref=e572]: AWS ElasticSearch Service
                    - treeitem "AWS EventBridge" [ref=e573]:
                      - generic [ref=e574] [cursor=pointer]:
                        - img [ref=e576]
                        - generic [ref=e582]:
                          - img [ref=e583]
                          - generic [ref=e584]: AWS EventBridge
                    - treeitem "AWS Identity and Access Management" [ref=e585]:
                      - generic [ref=e586] [cursor=pointer]:
                        - img [ref=e588]
                        - generic [ref=e594]:
                          - img [ref=e595]
                          - generic [ref=e596]: AWS Identity and Access Management
                    - treeitem "AWS KMS" [ref=e597]:
                      - generic [ref=e598] [cursor=pointer]:
                        - img [ref=e600]
                        - generic [ref=e606]:
                          - img [ref=e607]
                          - generic [ref=e608]: AWS KMS
                    - treeitem "AWS Kinesis" [ref=e609]:
                      - generic [ref=e610] [cursor=pointer]:
                        - img [ref=e612]
                        - generic [ref=e618]:
                          - img [ref=e619]
                          - generic [ref=e620]: AWS Kinesis
                    - treeitem "AWS Lambda" [ref=e621]:
                      - generic [ref=e622] [cursor=pointer]:
                        - img [ref=e624]
                        - generic [ref=e630]:
                          - img [ref=e631]
                          - generic [ref=e632]: AWS Lambda
                - paragraph [ref=e635]: No Models selected
        - contentinfo [ref=e636]:
          - paragraph [ref=e637]:
            - generic [ref=e638] [cursor=pointer]:
              - text: Built with
              - img [ref=e639]
              - text: by the Meshery Community
  - alert [ref=e642]: Settings | Meshery
```

# Test source

```ts
  21  |   MODEL_CSV_IMPORT: {
  22  |     Model_Name: string;
  23  |     Models: string;
  24  |     Components: string;
  25  |     Relationships: string;
  26  |   };
  27  | } = {
  28  |   MODEL_NAME: `test`,
  29  |   MODEL_URL_IMPORT:
  30  |     'https://raw.githubusercontent.com/meshery/meshery/master/ui/tests/e2e/assets/test.tar',
  31  |   MODEL_FILE_IMPORT: path.resolve('tests/e2e/assets/test.tar'),
  32  |   MODEL_CSV_IMPORT: {
  33  |     Model_Name: 'couchbase',
  34  |     Models: path.resolve('tests/e2e/assets/models.csv'),
  35  |     Components: path.resolve('tests/e2e/assets/components.csv'),
  36  |     Relationships: path.resolve('tests/e2e/assets/relationships.csv'),
  37  |   },
  38  | };
  39  | 
  40  | test.describe.serial('Model Workflow Tests', () => {
  41  |   // "Create a Model" downloads a model from GitHub during the test body
  42  |   // and extends its own timeout to 600s via test.setTimeout. The shared
  43  |   // beforeEach calls navigateToDashboard() + navigateToSettings() + waits
  44  |   // on settings-tab-registry, each with their own 120s inner timeouts.
  45  |   // Default BASE_TIMEOUT=60s is too short for the hook on slow CI.
  46  |   // Configure 240s as the describe default so the hook has enough room on
  47  |   // every test in this group; Create a Model still extends further in its
  48  |   // body for the GitHub fetch.
  49  |   test.describe.configure({ timeout: 240_000 });
  50  | 
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
> 121 |     await page.getByRole('heading', { name: 'File Import', exact: true }).click();
      |                                                                           ^ Error: locator.click: Test timeout of 240000ms exceeded.
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
  151 |     await page.getByTestId('TabBar-Button-ImportModel').click();
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