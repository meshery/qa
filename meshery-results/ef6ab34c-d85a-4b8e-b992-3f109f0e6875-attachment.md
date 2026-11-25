# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: designConfig.spec.ts >> Design Configurator Tests >> should edit design in Design Configurator
- Location: tests/e2e/designConfig.spec.ts:168:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:9081/configuration/designs/configurator?design_id=test-design
Call log:
  - navigating to "http://localhost:9081/configuration/designs/configurator?design_id=test-design", waiting until "load"

```

# Test source

```ts
  1  | export class DesignConfiguratorPage {
  2  |   constructor(page) {
  3  |     this.page = page;
  4  | 
  5  |     this.appBar = page.getByTestId('design-configurator-app-bar');
  6  |     this.codeEditor = page.getByTestId('design-configurator-code-editor');
  7  |     this.categorySelector = page.getByTestId('category-selector');
  8  |     this.databaseCategory = page.getByTestId('Database');
  9  |     this.analyticsCategory = page.getByTestId('Analytics');
  10 |     this.modelSelector = page.getByTestId('model-selector');
  11 |     this.modelAzure = page.getByTestId('azure-db-for-mysql');
  12 |     this.modelContainer = page.getByTestId('model-component-list');
  13 |     this.saveButton = page.getByTestId('design-configurator-save-design-btn');
  14 |     this.updateButton = page.getByTestId('design-configurator-update-design-btn');
  15 |   }
  16 | 
  17 |   async navigateTo(designId) {
  18 |     const query = designId ? `?design_id=${designId}` : '';
> 19 |     await this.page.goto(`/configuration/designs/configurator${query}`);
     |                     ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:9081/configuration/designs/configurator?design_id=test-design
  20 |   }
  21 | 
  22 |   async saveDesign() {
  23 |     await this.saveButton.click();
  24 |   }
  25 | 
  26 |   async updateDesign() {
  27 |     await this.updateButton.click();
  28 |   }
  29 | }
  30 | 
```