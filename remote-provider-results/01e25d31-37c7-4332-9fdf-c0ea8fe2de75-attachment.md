# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: security-credentials-form.spec.ts >> credentials create/edit — the secret object is the payload >> create posts the secret object itself, with no extra nesting and no name inside it
- Location: e2e/security-credentials-form.spec.ts:150:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('dialog').filter({ hasText: 'Generate Credential' }).getByRole('textbox', { name: 'URL', exact: true })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e7]:
        - link [ref=e9] [cursor=pointer]:
          - /url: /
          - paragraph [ref=e10]
        - generic [ref=e15]:
          - combobox [ref=e16] [cursor=pointer]:
            - generic [ref=e43]: Test Organization
          - textbox [aria-hidden]: org-1
          - group [aria-hidden]
        - generic [ref=e46] [cursor=pointer]
        - generic [ref=e59]:
          - button [ref=e60] [cursor=pointer]
          - generic [ref=e63] [cursor=pointer]
    - generic [ref=e67]:
      - heading [level=1] [ref=e68]: Credentials
      - tablist [ref=e71]:
        - tab [ref=e72] [cursor=pointer]: Overview
        - tab [disabled] [ref=e79]: Tokens
        - tab [disabled] [ref=e82]: Sessions
        - tab [selected] [ref=e86] [cursor=pointer]: Credentials
        - tab [ref=e89] [cursor=pointer]: Keys
        - tab [disabled] [ref=e92]: Keychains
    - generic [ref=e100]:
      - generic [ref=e101]:
        - button [ref=e105] [cursor=pointer]:
          - generic [ref=e115]: Create
        - generic [ref=e117]:
          - button [ref=e121] [cursor=pointer]
          - button [ref=e127] [cursor=pointer]
      - generic [ref=e131]:
        - grid [ref=e133]:
          - caption [ref=e134]
          - rowgroup [ref=e135]:
            - row [ref=e136]:
              - columnheader [ref=e137]:
                - button [ref=e139] [cursor=pointer]:
                  - generic [ref=e140]: Name
              - columnheader [ref=e142]:
                - button [ref=e144] [cursor=pointer]:
                  - generic [ref=e145]: Type
              - columnheader [ref=e147]:
                - button [ref=e149] [cursor=pointer]:
                  - generic [ref=e150]: Creation Date
              - columnheader [ref=e152]:
                - button [ref=e154] [cursor=pointer]:
                  - generic [ref=e155]:
                    - generic [ref=e156]: Updation Date
                    - button [ref=e158]
              - columnheader [ref=e161]:
                - generic [ref=e162]: Actions
          - rowgroup [ref=e163]:
            - row [ref=e164]:
              - gridcell [ref=e165]:
                - status [ref=e170]: No data available
        - table [ref=e171]:
          - rowgroup [ref=e172]:
            - row [ref=e173]:
              - cell [ref=e174]:
                - generic [ref=e177]:
                  - paragraph [ref=e178]: "Rows per page:"
                  - generic [ref=e179]:
                    - combobox [ref=e180] [cursor=pointer]: "10"
                    - textbox [aria-hidden]: "10"
                  - paragraph [ref=e181]: 0-0 of 0
                  - generic [ref=e182]:
                    - button [disabled]
                    - button [disabled]
    - navigation [ref=e184]:
      - heading [level=6] [ref=e186]:
        - text: Active Users
        - paragraph [ref=e187]: (0)
    - button [ref=e190] [cursor=pointer]: Feedback
    - generic [ref=e192]:
      - generic [ref=e193]:
        - paragraph [ref=e198]: Feedback
        - generic [ref=e205] [cursor=pointer]
      - generic [ref=e210]:
        - generic [ref=e211]:
          - button [ref=e212] [cursor=pointer]:
            - paragraph [ref=e216]: Issue
          - button [ref=e217] [cursor=pointer]:
            - paragraph [ref=e225]: Suggestion
          - button [ref=e226] [cursor=pointer]:
            - paragraph [ref=e233]: Meet Request
        - textbox [ref=e235]:
          - /placeholder: I’m having an issue with...
      - generic [ref=e237]:
        - generic [ref=e238]:
          - checkbox [ref=e240] [cursor=pointer]
          - paragraph [ref=e243]: We may email you for more information or updates
        - button [disabled]: Send
  - alert [ref=e244]
  - dialog [ref=e247]:
    - generic [ref=e248]:
      - generic [ref=e249]: Generate Credential
      - button [ref=e251] [cursor=pointer]
    - generic [ref=e255]:
      - heading "Generate Credential" [level=6] [ref=e256]
      - button "Schema_Changer" [ref=e258] [cursor=pointer]
    - generic [ref=e269]:
      - generic [ref=e270]:
        - text: Credential Name
        - generic [aria-hidden] [ref=e271]: "*"
      - generic [ref=e272]:
        - textbox "Credential Name" [active] [ref=e273]: prod prometheus
        - 'button "Credential Name: Human-readable name for the credential." [ref=e275] [cursor=pointer]'
        - group [aria-hidden]:
          - generic: Credential Name *
    - generic [ref=e280]:
      - button "Cancel" [ref=e281] [cursor=pointer]
      - button "Continue" [ref=e282] [cursor=pointer]
```

# Test source

```ts
  66  |  * accident. 8 such rows are live in production.
  67  |  */
  68  | const legacyPrometheusCredential = {
  69  |   id: "c0000000-0000-4000-8000-000000000001",
  70  |   name: "prod prometheus",
  71  |   userId: "user-1",
  72  |   type: "prometheus",
  73  |   secret: {
  74  |     credentialName: "prod prometheus",
  75  |     secret: { prometheusURL: "https://prom.example" }
  76  |   },
  77  |   createdAt: "2026-01-01T00:00:00Z",
  78  |   updatedAt: "2026-01-01T00:00:00Z"
  79  | };
  80  | 
  81  | type RecordedRequest = {
  82  |   method: string;
  83  |   body: Record<string, unknown>;
  84  | };
  85  | 
  86  | async function openCredentials(page: Page, credentials: Array<Record<string, unknown>>) {
  87  |   const mutations: RecordedRequest[] = [];
  88  | 
  89  |   await mockApi(page, [
  90  |     ...createSharedShellHandlers({
  91  |       user: authenticatedUser,
  92  |       organizations: [organization]
  93  |     }),
  94  |     ...createPermissionKeysHandler([...credentialPermissions]),
  95  |     ...createAuthenticatedShellHandlers({ orgId: "org-1", skipKeys: true }),
  96  |     request => {
  97  |       const method = request.method();
  98  |       const pathname = new URL(request.url()).pathname;
  99  | 
  100 |       if (pathname === "/api/integrations/credentials") {
  101 |         if (method === "GET") {
  102 |           return {
  103 |             status: 200,
  104 |             contentType: "application/json",
  105 |             body: {
  106 |               credentials,
  107 |               page: 0,
  108 |               pageSize: 10,
  109 |               totalCount: credentials.length
  110 |             }
  111 |           };
  112 |         }
  113 |         if (method === "POST" || method === "PUT") {
  114 |           mutations.push({
  115 |             method,
  116 |             body: JSON.parse(request.postData() ?? "{}") as Record<string, unknown>
  117 |           });
  118 |           return { status: 200, contentType: "application/json", body: {} };
  119 |         }
  120 |       }
  121 | 
  122 |       return undefined;
  123 |     },
  124 |     ...createFallbackHandlers()
  125 |   ]);
  126 | 
  127 |   await page.goto("/security/credentials", { waitUntil: "domcontentloaded" });
  128 | 
  129 |   return mutations;
  130 | }
  131 | 
  132 | /**
  133 |  * `RJSFWrapper` propagates form state to its parent through a 300 ms DEBOUNCED
  134 |  * effect (`ui/components/general/rjsf/index.tsx`), so the page's `formData` /
  135 |  * `credentialName` state trails the rendered fields. A submit inside that
  136 |  * window posts the PREVIOUS value — which is a real defect for a fast user, not
  137 |  * a test artifact, and is filed separately as meshery-cloud#5930. Wait it out
  138 |  * here rather than racing it, so this spec fails for shape reasons only.
  139 |  */
  140 | const waitForFormDebounce = (page: Page) => page.waitForTimeout(500);
  141 | 
  142 | /** Waits for the code-split RJSF chunk to render a real field, not the spinner. */
  143 | async function waitForForm(modal: ReturnType<Page["getByRole"]>) {
  144 |   await expect(
  145 |     modal.getByRole("textbox", { name: "Credential Name", exact: true })
  146 |   ).toBeVisible();
  147 | }
  148 | 
  149 | test.describe("credentials create/edit — the secret object is the payload", () => {
  150 |   test("create posts the secret object itself, with no extra nesting and no name inside it", async ({
  151 |     page
  152 |   }) => {
  153 |     const mutations = await openCredentials(page, []);
  154 | 
  155 |     await page.getByRole("button", { name: /^create$/i }).click();
  156 | 
  157 |     const modal = page.getByRole("dialog").filter({ hasText: "Generate Credential" });
  158 |     await expect(modal).toBeVisible();
  159 |     await waitForForm(modal);
  160 | 
  161 |     await modal
  162 |       .getByRole("textbox", { name: "Credential Name", exact: true })
  163 |       .fill("prod prometheus");
  164 |     await modal
  165 |       .getByRole("textbox", { name: "URL", exact: true })
> 166 |       .fill("https://prom.example");
      |        ^ Error: locator.fill: Test timeout of 60000ms exceeded.
  167 |     await modal.screenshot({ path: shot("create-modal-filled") });
  168 | 
  169 |     await waitForFormDebounce(page);
  170 |     await modal.getByRole("button", { name: "Continue", exact: true }).click();
  171 | 
  172 |     await expect.poll(() => mutations.length).toBe(1);
  173 |     expect(mutations[0].method).toBe("POST");
  174 |     expect(mutations[0].body).toEqual({
  175 |       name: "prod prometheus",
  176 |       type: "prometheus",
  177 |       // NOT `{credentialName, secret: {...}}`. The canonical schema says the
  178 |       // form's `secret` object IS the persisted value.
  179 |       secret: { prometheusURL: "https://prom.example" }
  180 |     });
  181 |     // Stated separately because it is the user-visible harm: the credential's
  182 |     // name was being duplicated inside its own secret blob.
  183 |     expect(JSON.stringify(mutations[0].body.secret)).not.toContain("credentialName");
  184 |   });
  185 | 
  186 |   test("edit prefills a legacy double-nested row with the real secret, and saves it canonically", async ({
  187 |     page
  188 |   }) => {
  189 |     const mutations = await openCredentials(page, [legacyPrometheusCredential]);
  190 | 
  191 |     await expect(page.getByText("prod prometheus").first()).toBeVisible();
  192 | 
  193 |     // `L5EditIcon` renders a Sistent IconButton with a default aria-label, so
  194 |     // the row action is reachable by role without adding a test-only hook (its
  195 |     // React `key` is not a selector, and its `dataTestId` prop is opt-in).
  196 |     await page.getByRole("button", { name: "Edit" }).first().click();
  197 | 
  198 |     const modal = page.getByRole("dialog").filter({ hasText: "Update Credential" });
  199 |     await expect(modal).toBeVisible();
  200 |     await waitForForm(modal);
  201 | 
  202 |     // The populate direction. This form opened completely blank.
  203 |     await expect(
  204 |       modal.getByRole("textbox", { name: "Credential Name", exact: true })
  205 |     ).toHaveValue("prod prometheus");
  206 |     await expect(modal.getByRole("textbox", { name: "URL", exact: true })).toHaveValue(
  207 |       "https://prom.example"
  208 |     );
  209 |     await modal.screenshot({ path: shot("edit-modal-prefilled") });
  210 | 
  211 |     await modal
  212 |       .getByRole("textbox", { name: "URL", exact: true })
  213 |       .fill("https://prom2.example");
  214 |     await waitForFormDebounce(page);
  215 |     await modal.getByRole("button", { name: "Continue", exact: true }).click();
  216 | 
  217 |     await expect.poll(() => mutations.length).toBe(1);
  218 |     expect(mutations[0].method).toBe("PUT");
  219 |     expect(mutations[0].body).toEqual({
  220 |       id: legacyPrometheusCredential.id,
  221 |       name: "prod prometheus",
  222 |       type: "prometheus",
  223 |       secret: { prometheusURL: "https://prom2.example" }
  224 |     });
  225 |   });
  226 | });
  227 | 
```