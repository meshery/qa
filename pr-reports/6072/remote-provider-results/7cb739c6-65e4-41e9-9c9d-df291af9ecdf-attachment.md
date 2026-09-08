# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: design-import.spec.ts >> import design — canonical form contract at the product surface >> File Upload branch posts { save, patternData.name, patternData.patternFile } with the data-url prefix stripped
- Location: e2e/design-import.spec.ts:142:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('dialog').filter({ hasText: 'Import Design' }).getByLabel('Design file name')
Expected: visible
Error: strict mode violation: getByRole('dialog').filter({ hasText: 'Import Design' }).getByLabel('Design file name') resolved to 2 elements:
    1) <input required="" type="string" id="root_name" aria-invalid="false" class="MuiInputBase-input MuiOutlinedInput-input css-yzodeh"/> aka getByRole('textbox', { name: 'Design file name' })
    2) <span tabindex="0" role="button" data-testid="field-info" backgroundcolor="#3C494F" class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-1p874na" aria-label="Design file name: Provide a name for your design. This name will help you identify the design later. You can also change the name of your design after importing it.">…</span> aka getByRole('button', { name: 'Design file name: Provide a' })

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('dialog').filter({ hasText: 'Import Design' }).getByLabel('Design file name')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e7]:
        - link [ref=e9] [cursor=pointer]:
          - /url: /
          - paragraph [ref=e10]:
            - img [ref=e12]
        - generic [ref=e15]:
          - combobox [ref=e16] [cursor=pointer]:
            - img [ref=e18]
            - generic [ref=e43]: Test Organization
          - textbox: org-1
          - img
          - group
        - img [ref=e47] [cursor=pointer]
        - generic [ref=e59]:
          - button [ref=e60] [cursor=pointer]:
            - img [ref=e61]
          - img [ref=e64] [cursor=pointer]
    - generic [ref=e67]:
      - heading [level=1] [ref=e68]: My Designs
      - tablist [ref=e71]:
        - tab [ref=e72] [cursor=pointer]:
          - img [ref=e73]
          - text: Catalog
        - tab [ref=e78] [cursor=pointer]:
          - img [ref=e79]
          - text: Leaderboard
        - tab [selected] [ref=e83] [cursor=pointer]:
          - img [ref=e84]
          - text: My Designs
        - tab [disabled] [ref=e93]:
          - img [ref=e94]
          - text: My Views
        - tab [disabled] [ref=e99]:
          - img [ref=e100]
          - text: Requests
    - generic [ref=e106]:
      - generic [ref=e107]:
        - generic [ref=e108]:
          - generic [ref=e109]:
            - img [ref=e111]
            - searchbox [ref=e113]
            - paragraph [ref=e115]: "Total Designs: 0"
            - group
          - button [ref=e116] [cursor=pointer]:
            - img [ref=e118]
            - generic [ref=e120]: Create
          - button [ref=e121] [cursor=pointer]:
            - img [ref=e123]
            - generic [ref=e125]: Import
        - button [ref=e128] [cursor=pointer]:
          - img [ref=e129]
      - generic [ref=e131]:
        - generic [ref=e133]:
          - button [ref=e134] [cursor=pointer]:
            - paragraph [ref=e135]: SORT BY
            - img [ref=e136]
          - generic [ref=e141]:
            - combobox [ref=e142] [cursor=pointer]: Most Recently Updated
            - textbox: updatedAt desc
            - img
            - group
          - button [ref=e143] [cursor=pointer]:
            - paragraph [ref=e144]: OWNER
            - img [ref=e145]
          - generic [ref=e151]:
            - generic [ref=e154]:
              - generic: By Organization
              - generic [ref=e155]:
                - combobox [ref=e156]
                - group:
                  - generic: By Organization
            - generic [ref=e159]:
              - generic: By Teams
              - generic [ref=e160]:
                - combobox [ref=e161]
                - group:
                  - generic: By Teams
            - generic [ref=e164]:
              - generic: By Workspace
              - generic [ref=e165]:
                - combobox [ref=e166]
                - group:
                  - generic: By Workspace
          - button [ref=e167] [cursor=pointer]:
            - paragraph [ref=e168]: VISIBILITY
            - img [ref=e169]
          - generic [ref=e174]:
            - generic [ref=e175]:
              - generic [ref=e176]:
                - generic [ref=e177] [cursor=pointer]:
                  - checkbox [ref=e178]
                  - img [ref=e179]
                - paragraph [ref=e181]: Public
              - generic [ref=e182]: (0)
            - generic [ref=e183]:
              - generic [ref=e184]:
                - generic [ref=e185] [cursor=pointer]:
                  - checkbox [ref=e186]
                  - img [ref=e187]
                - paragraph [ref=e189]: Private
              - generic [ref=e190]: (0)
            - generic [ref=e191]:
              - generic [ref=e192]:
                - generic [ref=e193] [cursor=pointer]:
                  - checkbox [ref=e194]
                  - img [ref=e195]
                - paragraph [ref=e197]: Published
              - generic [ref=e198]: (0)
        - generic [ref=e200]:
          - paragraph [ref=e201]: No designs match your search term.
          - paragraph [ref=e202]:
            - text: Learn how to
            - link [ref=e203] [cursor=pointer]:
              - /url: "#"
              - text: create designs.
          - paragraph [ref=e204]:
            - text: Or see the
            - link [ref=e205] [cursor=pointer]:
              - /url: /catalog
              - text: catalog
            - text: for more designs.
    - navigation [ref=e206]:
      - generic [ref=e207]:
        - heading [level=6] [ref=e208]:
          - text: Active Users
          - paragraph [ref=e209]: (0)
        - img [ref=e210]
    - button [ref=e212] [cursor=pointer]: Feedback
    - generic [ref=e214]:
      - generic [ref=e215]:
        - img [ref=e217]
        - paragraph [ref=e220]: Feedback
        - generic [ref=e221]:
          - img [ref=e224]
          - img [ref=e228] [cursor=pointer]
      - generic [ref=e232]:
        - generic [ref=e233]:
          - button [ref=e234] [cursor=pointer]:
            - img [ref=e236]
            - paragraph [ref=e238]: Issue
          - button [ref=e239] [cursor=pointer]:
            - img [ref=e241]
            - paragraph [ref=e247]: Suggestion
          - button [ref=e248] [cursor=pointer]:
            - img [ref=e250]
            - paragraph [ref=e255]: Meet Request
        - textbox [ref=e257]:
          - /placeholder: I’m having an issue with...
      - generic [ref=e259]:
        - generic [ref=e260]:
          - generic [ref=e261] [cursor=pointer]:
            - checkbox [ref=e262]
            - img [ref=e263]
          - paragraph [ref=e265]: We may email you for more information or updates
        - button [disabled]: Send
  - alert [ref=e266]: /catalog/content/my-designs
  - dialog [active] [ref=e269]:
    - generic [ref=e270]:
      - img [ref=e272]
      - generic [ref=e274]: Import Design
      - button [ref=e276] [cursor=pointer]:
        - img [ref=e277]
    - generic [ref=e285]:
      - generic [ref=e289]:
        - generic:
          - text: Design file name
          - generic: "*"
        - generic [ref=e290]:
          - textbox "Design file name" [ref=e291]
          - 'button "Design file name: Provide a name for your design. This name will help you identify the design later. You can also change the name of your design after importing it." [ref=e293] [cursor=pointer]':
            - img [ref=e294]
          - group:
            - generic: Design file name *
      - generic [ref=e298]:
        - generic [ref=e299]:
          - text: Upload method
          - generic [ref=e300]: "*"
        - radiogroup [ref=e301]:
          - generic [ref=e302] [cursor=pointer]:
            - generic [ref=e303]:
              - radio "File Upload" [ref=e304]
              - img [ref=e306]
            - generic [ref=e308]: File Upload
          - generic [ref=e309] [cursor=pointer]:
            - generic [ref=e310]:
              - radio "URL Import" [checked] [ref=e311]
              - generic [ref=e312]:
                - img [ref=e313]
                - img [ref=e315]
            - generic [ref=e317]: URL Import
      - generic [ref=e321]:
        - generic:
          - text: URL
          - generic: "*"
        - generic [ref=e322]:
          - textbox "URL" [ref=e323]
          - 'button "URL: A direct URL to a single file, for example: https://raw.githubusercontent.com/your-design-file.yaml. Ensure the resource is in a supported format: Kubernetes Manifest, Helm Chart, Docker Compose, or Meshery Design." [ref=e325] [cursor=pointer]':
            - img [ref=e326]
          - group:
            - generic: URL *
    - generic [ref=e330]:
      - button "Cancel" [ref=e331] [cursor=pointer]
      - button "Import" [ref=e332] [cursor=pointer]
```

# Test source

```ts
  3   |  *
  4   |  * This is the product surface behind the design-import form contract. The modal
  5   |  * is rendered from the canonical `DesignImportRjsfSchemaV1Beta3`, and
  6   |  * `GenericRJSFModal` hands `handleImportDesign` the raw RJSF formData with no
  7   |  * remapping — so the field names the handler destructures (`uploadType`,
  8   |  * `name`, `url`, `file`) are joined to the schema only by string keys. The unit
  9   |  * guards pin that join statically:
  10  |  *
  11  |  *   - `__tests__/components/catalog/design-import-contract.test.ts` (runtime)
  12  |  *   - `__tests__/typetests/design-import-contract.typetest.ts` (tsc)
  13  |  *
  14  |  * This spec closes the loop at the level a user experiences: it opens the real
  15  |  * modal, drives BOTH uploadType branches, and asserts the exact body that
  16  |  * reaches `POST /api/content/patterns` — which is what would silently become
  17  |  * `{save: true, patternData: {name: undefined}}` if the formData shape ever
  18  |  * drifted from the schema (the failure mode #5863 describes for filters).
  19  |  */
  20  | 
  21  | import { expect, test } from "@playwright/test";
  22  | import path from "node:path";
  23  | import {
  24  |   createAuthenticatedShellHandlers,
  25  |   createDesignsHandlers,
  26  |   createFallbackHandlers,
  27  |   createPermissionKeysHandler,
  28  |   createSharedShellHandlers,
  29  |   mockApi
  30  | } from "./helpers/network";
  31  | 
  32  | const MY_DESIGNS_URL = "/catalog/content/my-designs";
  33  | 
  34  | /**
  35  |  * Where the reviewer-facing screenshots land. Defaults inside `test-results/`
  36  |  * (gitignored, cleaned with the rest of the run); override with
  37  |  * `DESIGN_IMPORT_EVIDENCE_DIR` to collect them somewhere durable.
  38  |  */
  39  | const EVIDENCE_DIR =
  40  |   process.env.DESIGN_IMPORT_EVIDENCE_DIR ??
  41  |   path.resolve(__dirname, "..", "test-results", "design-import-evidence");
  42  | 
  43  | const shot = (name: string) => path.join(EVIDENCE_DIR, `${name}.png`);
  44  | 
  45  | const authenticatedUser = {
  46  |   id: "user-1",
  47  |   first_name: "Test",
  48  |   last_name: "User",
  49  |   email: "test@example.com",
  50  |   preferences: { selectedOrg: "org-1" }
  51  | };
  52  | 
  53  | const organization = {
  54  |   id: "org-1",
  55  |   name: "Test Organization",
  56  |   domain: "localhost:3000"
  57  | };
  58  | 
  59  | const DESIGN_YAML = "apiVersion: v1\nkind: Namespace\nmetadata:\n  name: import-demo\n";
  60  | 
  61  | /**
  62  |  * Boots the My Designs page with an empty design list and the one permission
  63  |  * key the page gates on, and returns the array the upsert bodies land in.
  64  |  */
  65  | async function openMyDesigns(page: import("@playwright/test").Page) {
  66  |   const upsertBodies: Array<Record<string, unknown>> = [];
  67  | 
  68  |   await mockApi(page, [
  69  |     ...createSharedShellHandlers({
  70  |       user: authenticatedUser,
  71  |       organizations: [organization]
  72  |     }),
  73  |     ...createPermissionKeysHandler(["VIEW_CATALOG", "VIEW_DESIGNS"]),
  74  |     ...createAuthenticatedShellHandlers({ orgId: "org-1", skipKeys: true }),
  75  |     // Records the design-import request body, then falls through (returns
  76  |     // undefined) so `createDesignsHandlers` below still answers it.
  77  |     request => {
  78  |       if (
  79  |         request.method() === "POST" &&
  80  |         new URL(request.url()).pathname === "/api/content/patterns"
  81  |       ) {
  82  |         upsertBodies.push(JSON.parse(request.postData() ?? "{}"));
  83  |       }
  84  |       return undefined;
  85  |     },
  86  |     ...createDesignsHandlers({ patterns: [] }),
  87  |     ...createFallbackHandlers()
  88  |   ]);
  89  | 
  90  |   await page.goto(MY_DESIGNS_URL, { waitUntil: "domcontentloaded" });
  91  |   await expect(page.getByRole("button", { name: "Import" })).toBeVisible();
  92  | 
  93  |   return upsertBodies;
  94  | }
  95  | 
  96  | /** Opens the Import Design modal and waits for the RJSF chunk to render. */
  97  | async function openImportModal(page: import("@playwright/test").Page) {
  98  |   await page.getByRole("button", { name: "Import" }).click();
  99  |   const modal = page.getByRole("dialog").filter({ hasText: "Import Design" });
  100 |   await expect(modal).toBeVisible();
  101 |   // The RJSF form is code-split (`dynamic(() => import("../rjsf"))`); wait for
  102 |   // a real field rather than the spinner.
> 103 |   await expect(modal.getByLabel("Design file name")).toBeVisible();
      |                                                      ^ Error: expect(locator).toBeVisible() failed
  104 |   return modal;
  105 | }
  106 | 
  107 | test.describe("import design — canonical form contract at the product surface", () => {
  108 |   test("URL Import branch posts { save, url, patternData.name }", async ({ page }) => {
  109 |     const upsertBodies = await openMyDesigns(page);
  110 |     const modal = await openImportModal(page);
  111 | 
  112 |     // `uploadType` defaults to "URL Import" in the canonical schema, so the URL
  113 |     // branch is what a user sees first.
  114 |     await expect(modal.getByRole("radio", { name: "URL Import" })).toBeChecked();
  115 |     await expect(modal.getByRole("textbox", { name: "URL", exact: true })).toBeVisible();
  116 |     await modal.screenshot({ path: shot("import-modal-url-branch") });
  117 | 
  118 |     await modal.getByLabel("Design file name").fill("Imported From URL");
  119 |     await modal
  120 |       .getByRole("textbox", { name: "URL", exact: true })
  121 |       .fill("https://raw.githubusercontent.com/example/design.yaml");
  122 | 
  123 |     await modal.screenshot({ path: shot("import-modal-url-branch-filled") });
  124 | 
  125 |     await modal.getByRole("button", { name: "Import", exact: true }).click();
  126 | 
  127 |     await expect.poll(() => upsertBodies.length).toBe(1);
  128 |     expect(upsertBodies[0]).toEqual({
  129 |       save: true,
  130 |       url: "https://raw.githubusercontent.com/example/design.yaml",
  131 |       patternData: { name: "Imported From URL" }
  132 |     });
  133 | 
  134 |     // The user-visible outcome: success toast, and the imported design now in
  135 |     // the list — which only happens if `patternData.name` actually carried a
  136 |     // value through the form -> handler -> request-body chain.
  137 |     await expect(page.getByText("Design imported")).toBeVisible();
  138 |     await expect(page.getByText("Imported From URL").first()).toBeVisible();
  139 |     await page.screenshot({ path: shot("import-url-success-toast") });
  140 |   });
  141 | 
  142 |   test("File Upload branch posts { save, patternData.name, patternData.patternFile } with the data-url prefix stripped", async ({
  143 |     page
  144 |   }) => {
  145 |     const upsertBodies = await openMyDesigns(page);
  146 |     const modal = await openImportModal(page);
  147 | 
  148 |     // Switching the discriminator swaps the conditional branch: the URL text
  149 |     // field is replaced by the RJSF FileWidget.
  150 |     await modal.getByRole("radio", { name: "File Upload" }).check();
  151 |     await expect(modal.getByRole("textbox", { name: "URL", exact: true })).toHaveCount(0);
  152 | 
  153 |     const fileInput = modal.locator('input[type="file"]');
  154 |     await expect(fileInput).toBeAttached();
  155 |     await modal.screenshot({ path: shot("import-modal-file-branch") });
  156 | 
  157 |     await modal.getByLabel("Design file name").fill("Imported From File");
  158 |     await fileInput.setInputFiles({
  159 |       name: "namespace.yaml",
  160 |       mimeType: "application/x-yaml",
  161 |       buffer: Buffer.from(DESIGN_YAML, "utf8")
  162 |     });
  163 | 
  164 |     await modal.screenshot({ path: shot("import-modal-file-branch-filled") });
  165 | 
  166 |     await modal.getByRole("button", { name: "Import", exact: true }).click();
  167 | 
  168 |     await expect.poll(() => upsertBodies.length).toBe(1);
  169 |     // `patternFile` is the DECODED file, proving `getDecodedFile` stripped the
  170 |     // `data:<mime>;base64,` prefix the RJSF `format: data-url` widget emits.
  171 |     expect(upsertBodies[0]).toEqual({
  172 |       save: true,
  173 |       patternData: {
  174 |         name: "Imported From File",
  175 |         patternFile: DESIGN_YAML
  176 |       }
  177 |     });
  178 | 
  179 |     await expect(page.getByText("Design imported")).toBeVisible();
  180 |     await expect(page.getByText("Imported From File").first()).toBeVisible();
  181 |     await page.screenshot({ path: shot("import-file-success-toast") });
  182 |   });
  183 | });
  184 | 
```