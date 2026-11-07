# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: models.spec.ts >> Model Workflow Tests >> Import a Model via CSV Import
- Location: tests/e2e/models.spec.ts:150:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ModelImportedSection-ModelHeader-couchbase')
Expected: visible
Timeout: 60000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 60000ms
  - waiting for getByTestId('ModelImportedSection-ModelHeader-couchbase')

```

```yaml
- dialog:
  - text: Import CSV
  - button:
    - img
  - list:
    - listitem:
      - img
      - text: Model CSV
    - listitem:
      - img
      - text: Component CSV
    - listitem:
      - img
      - text: Relationship CSV
    - listitem:
      - img
      - text: Finish
  - paragraph: "SUMMARY: Import encountered error for 1 entity (1 unknown entity)."
  - paragraph: "MODEL: ."
  - link "Registry":
    - /url: settings?settingsCategory=Registry&tab=Models&searchText=.
    - heading "Registry" [level=5]:
      - text: Registry
      - superscript:
        - img
  - paragraph: Import did not occur for 1 entity of type unknown.
  - paragraph:
    - strong: Details
  - list:
    - listitem:
      - paragraph: No component found in model provided. Models must have at least one component.
  - button "Back"
  - button "Finish"
```

# Test source

```ts
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
> 168 |     ).toBeVisible();
      |       ^ Error: expect(locator).toBeVisible() failed
  169 |     await expect(page.getByTestId('ModelImportMessages-Wrapper')).toBeVisible();
  170 |     await page.getByRole('button', { name: 'Finish' }).click();
  171 |   });
  172 | });
  173 | 
```