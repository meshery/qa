# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: models.spec.ts >> Model Workflow Tests >> Create a Model
- Location: tests/e2e/models.spec.ts:59:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ModelImportedSection-ModelHeader-test-model-1794127641883')
Expected: visible
Timeout: 540000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 540000ms
  - waiting for getByTestId('ModelImportedSection-ModelHeader-test-model-1794127641883')

```

```yaml
- dialog:
  - text: Create Model
  - button:
    - img
  - list:
    - listitem:
      - img
      - text: Model Details
    - listitem:
      - img
      - text: Model Categorization
    - listitem:
      - img
      - text: Styling
    - listitem:
      - img
      - text: Source
    - listitem: Additional Details
    - listitem:
      - img
      - text: Finalize Generation
    - listitem:
      - img
      - text: Finish
  - paragraph:
    - strong: Details
  - list:
    - listitem:
      - paragraph: "unable to get latest release tag | Short Description: Could not fetch latest stable release from github | Probable Cause: Failed to make GET request to github.Invalid response received on github.com///releases/stable | Suggested Remediation: Make sure Github is reachable.Make sure a valid response is available on github.com///releases/stable | Probable Cause: sourceURL provided might be invalid.provided repo/version tag does not exist | Suggested Remediation: ensure sourceURL follows the format: git://////"
  - paragraph:
    - strong: Probable Cause
  - list:
    - listitem:
      - paragraph: invalid sourceURL provided
    - listitem:
      - paragraph: repository might be private
  - paragraph:
    - strong: Suggested Remediation
  - list:
    - listitem:
      - paragraph: provide sourceURL according to the format
    - listitem:
      - paragraph: provide appropriate credentials to clone a private repository
  - button "Back"
  - button "Finish"
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import path from 'path';
  3   | import { DashboardPage } from './pages/DashboardPage';
  4   | 
  5   | // Strongly typed inline to avoid JS linter false positives
  6   | const model: {
  7   |   MODEL_URL: string;
  8   |   MODEL_NAME: string;
  9   |   MODEL_DISPLAY_NAME: string;
  10  | } = {
  11  |   MODEL_URL: 'git://github.com/aws-controllers-k8s/apigatewayv2-controller/main/helm',
  12  |   MODEL_NAME: `test-model-${Date.now()}`,
  13  |   MODEL_DISPLAY_NAME: `Test Model ${Date.now()}`,
  14  | };
  15  | 
  16  | // Strongly typed inline
  17  | const model_import: {
  18  |   MODEL_NAME: string;
  19  |   MODEL_URL_IMPORT: string;
  20  |   MODEL_FILE_IMPORT: string;
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
> 98  |     ).toBeVisible({ timeout: 540_000 });
      |       ^ Error: expect(locator).toBeVisible() failed
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