# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: controllers-config.spec.ts >> Operator, MeshSync & Broker Settings >> Resolve each field through override, then server-wide default, then built-in
- Location: tests/e2e/controllers-config.spec.ts:519:7

# Error details

```
Test timeout of 180000ms exceeded.
```

```
Error: apiRequestContext.put: Request context disposed.
Call log:
  - → PUT http://localhost:9081/api/integrations/connections/a4995b80-11b4-cb2f-b580-014c0e2bdae5/controllers/config
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.7827.55 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - content-type: application/json
    - content-length: 2
    - cookie: token=eyJhY2Nlc3NfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5CMVlteHBZem81T1dJNE1XSTBOeTA1TTJaaExUUTBNRE10T0RjMU15MHhOelU1TkRGaFptWmpOV0lpTENKMGVYQWlPaUpLVjFRaWZRLmV5SmhkV1FpT2x0ZExDSmpiR2xsYm5SZmFXUWlPaUp0WlhOb1pYSjVMV05zYjNWa0lpd2laWGgwSWpwN2ZTd2lhV0YwSWpveE56ZzFPREUzTlRRd0xDSnBjM01pT2lKb2RIUndjem92TDJOc2IzVmtMbXhoZVdWeU5TNXBieTlvZVdSeVlTSXNJbXAwYVNJNkltSmxZekkxTm1OaUxXVTNaall0TkRZNE9DMDVPRE0yTFRRellXTm1ZMkZrWW1GbE5pSXNJbTFqWDNSdmEyVnVYM1Z6WlNJNkluQnpaWFZrYnlJc0ltNWlaaUk2TVRjNE5UZ3hOelUwTUN3aWMyTndJanBiSW05d1pXNXBaQ0lzSW05bVpteHBibVVpWFN3aWMzVmlJam9pWkdWaE9ESTRNVEV0TnpSaVlTMDBOelJtTFdJNVpUUXROREkyWlRjME1ERTNNRGRsSW4wLmpNdjdmT3BfTFdXbTY5YldlbXhCWlBmSklYRkd4S0pkT0hWM09fOXdCc0stNTdOSXA0cnZyNTUtN3ZEUWttY1FuYkpHLVBqaG15QUx1TW5LdGlrbmRlYnJ5U2dJUHMyNjMyaFZqbllsVlc0MVF0SnVwalVrNWphYURDaEFJTkpwTjZjdkdGNFl6Ul9vcjRqcGI0azNzRkNmWW5WdkgtWUx5RkJJWlJtcXdNclNUY3hncVZNOGRpbDF3aGFGbXMyUXFCdzRWN1JBMkVld0ZXQnFtR3cybmZKOVlRdzlaVllSX1hkcDdVam5RcF9kbGtVNXJ4dHNiWWlCcHZFQmd4czhvY2F5QVZYeklma3NidXA2WWRnQTI1ekI5YzF5NENBMEVDWVVTSnFLWlRRQ2NmMDBuN0JISzJIbDdaNXJ3OFhRR05rYkhadWxEc2JMYjdvOXVCaFJBVURPdnM5QVdadVgzMUwzZFF0VTNUN2dTYVdKOUFjcnRyd3hKUVRvakJ2XzRGc2xlRTloUWdNQWtCN3B1OURVUWJvTVBJUzZXaEJnS0UyTVFmNFoxVmVZZmlYQU5BZ2VPOGtvWWpTRktTVWh5aERqZ1Z2Y2x5YWJmWExNNHhVbi1WR2VsS2tpR29XdTRJOVM0WWJkZkwwRFBrNnVPSWtsLVE3elZYNEtaZmNLQk12WG15dXhvWTVUa2FHNTRncTFiaHdLWVF5Z2thSm9TMW54VWZmUG1BZWJKdmpfSGFpeWxfUlFIbURmSWhCTHNrRVVnRWtsUGNnZE5qN3Q5OVcxQmhxM05vd0dmVzEwTUpDc1poMjJ2RFBMcWNGSW9YS1FmaHA5M1R3MHI1cHNhY0NzdTk5UDEwVTZsME5IYm9JQk4wVl9CZEUzTnF2UndER1JWQXJONnRFIiwiYWxnIjoiUlMyNTYiLCJyZWZyZXNoX3Rva2VuIjoiIiwidG9rZW5fdHlwZSI6ImJlYXJlciJ9; meshery-provider=Meshery

```

# Test source

```ts
  52  |  */
  53  | export function annotateControllersCase(
  54  |   testInfo: TestInfo,
  55  |   { feature, story, wirePaths }: { feature: string; story: string; wirePaths: string[] },
  56  | ): void {
  57  |   testInfo.annotations.push(
  58  |     { type: 'epic', description: CONTROLLERS_EPIC },
  59  |     { type: 'client', description: CONTROLLERS_CLIENT },
  60  |     { type: 'feature', description: feature },
  61  |     { type: 'story', description: story },
  62  |   );
  63  |   for (const path of wirePaths) {
  64  |     testInfo.annotations.push({ type: 'wirePath', description: path });
  65  |   }
  66  | }
  67  | 
  68  | /** Grep-able Playwright tags, mirroring connections.testmap.ts's `connTags`. */
  69  | export const controllersTags = (componentUnderTest: string): string[] => [
  70  |   '@controllers-config',
  71  |   `@cut:${componentUnderTest
  72  |     .toLowerCase()
  73  |     .replace(/[^a-z0-9]+/g, '-')
  74  |     .replace(/(^-|-$)/g, '')}`,
  75  |   `@client:${CONTROLLERS_CLIENT.toLowerCase()}`,
  76  | ];
  77  | 
  78  | // --- The layered-configuration APIs -----------------------------------------
  79  | 
  80  | export const SYSTEM_CONFIG_API = '/api/system/controllers/config';
  81  | export const CONNECTIONS_API = '/api/integrations/connections';
  82  | 
  83  | /** The schema version every stored document carries back. */
  84  | export const SCHEMA_VERSION = 'controllers.meshery.io/v1alpha1';
  85  | 
  86  | /**
  87  |  * The compiled-in defaults, mirrored from `connections.BuiltInControllersConfig()`
  88  |  * and from `BUILT_IN_CONTROLLERS_CONFIG` in
  89  |  * ui/components/configuration/ControllersConfigForm.tsx. This is precedence
  90  |  * layer 3: what `effective` resolves to when neither editable layer sets a field.
  91  |  */
  92  | export const BUILT_IN = {
  93  |   deploymentMode: 'embedded',
  94  |   meshsyncReplicas: 1,
  95  |   brokerReplicas: 1,
  96  |   brokerServiceType: 'ClusterIP',
  97  | };
  98  | 
  99  | export type ConfigDoc = Record<string, unknown>;
  100 | 
  101 | /** The layered document for one connection: `override`, `default` and `effective`. */
  102 | export type LayeredConfig = {
  103 |   override?: ConfigDoc;
  104 |   default?: ConfigDoc;
  105 |   effective: ConfigDoc;
  106 | };
  107 | 
  108 | export async function getServerDefaults(request: APIRequestContext): Promise<ConfigDoc> {
  109 |   const response = await request.get(SYSTEM_CONFIG_API);
  110 |   expect(
  111 |     response.status(),
  112 |     `GET ${SYSTEM_CONFIG_API} returned ${response.status()}: ${await response.text()}`,
  113 |   ).toBe(200);
  114 |   return response.json();
  115 | }
  116 | 
  117 | export async function putServerDefaults(
  118 |   request: APIRequestContext,
  119 |   body: ConfigDoc,
  120 | ): Promise<ConfigDoc> {
  121 |   const response = await request.put(SYSTEM_CONFIG_API, { data: body });
  122 |   expect(
  123 |     response.status(),
  124 |     `PUT ${SYSTEM_CONFIG_API} returned ${response.status()}: ${await response.text()}`,
  125 |   ).toBe(200);
  126 |   return response.json();
  127 | }
  128 | 
  129 | /** Clear the server-wide layer so each case starts from the built-in defaults. */
  130 | export const clearServerDefaults = (request: APIRequestContext) => putServerDefaults(request, {});
  131 | 
  132 | const connectionConfigApi = (connectionId: string) =>
  133 |   `${CONNECTIONS_API}/${connectionId}/controllers/config`;
  134 | 
  135 | export async function getConnectionConfig(
  136 |   request: APIRequestContext,
  137 |   connectionId: string,
  138 | ): Promise<LayeredConfig> {
  139 |   const response = await request.get(connectionConfigApi(connectionId));
  140 |   expect(
  141 |     response.status(),
  142 |     `GET connection controllers config returned ${response.status()}: ${await response.text()}`,
  143 |   ).toBe(200);
  144 |   return response.json();
  145 | }
  146 | 
  147 | export async function putConnectionConfig(
  148 |   request: APIRequestContext,
  149 |   connectionId: string,
  150 |   body: ConfigDoc,
  151 | ): Promise<LayeredConfig> {
> 152 |   const response = await request.put(connectionConfigApi(connectionId), { data: body });
      |                                  ^ Error: apiRequestContext.put: Request context disposed.
  153 |   expect(
  154 |     response.status(),
  155 |     `PUT connection controllers config returned ${response.status()}: ${await response.text()}`,
  156 |   ).toBe(200);
  157 |   return response.json();
  158 | }
  159 | 
  160 | export type KubernetesConnection = { id: string; name: string; status: string };
  161 | 
  162 | /**
  163 |  * Kubernetes connections known to this server. The per-connection layer is a row
  164 |  * in the connections table, so cases that exercise it need a registered
  165 |  * connection but not a reachable cluster - a connection in any state carries an
  166 |  * override. Only the propagation case additionally requires `connected`.
  167 |  */
  168 | export async function kubernetesConnections(
  169 |   request: APIRequestContext,
  170 | ): Promise<KubernetesConnection[]> {
  171 |   const response = await request.get(`${CONNECTIONS_API}?page=0&pagesize=100`);
  172 |   if (response.status() !== 200) return [];
  173 |   const body = await response.json();
  174 |   const connections: Record<string, string>[] = body?.connections ?? [];
  175 |   return connections
  176 |     .filter((connection) => connection.kind === 'kubernetes')
  177 |     .map((connection) => ({
  178 |       id: connection.id,
  179 |       name: connection.name,
  180 |       status: connection.status,
  181 |     }));
  182 | }
  183 | 
  184 | // --- Locating controls in the rendered editor -------------------------------
  185 | //
  186 | // Field labels are Typography (a bare `<p>`), not `<label for>`, so they cannot
  187 | // be reached through getByLabel. Each label sits in a Box next to its control
  188 | // inside one grid item, and every field of a section shares one grid container -
  189 | // which is what tells the MeshSync "Replicas" field from the Broker one without
  190 | // depending on DOM order.
  191 | 
  192 | /** Quote a label for use as an XPath string literal. */
  193 | const xpathLiteral = (value: string): string => `"${value}"`;
  194 | 
  195 | export const fieldByLabel = (page: Page, label: string): Locator =>
  196 |   page.locator(`xpath=//p[normalize-space(text())=${xpathLiteral(label)}]/../..`);
  197 | 
  198 | /** The grid container holding every field of the section `uniqueLabel` is in. */
  199 | const sectionGrid = (page: Page, uniqueLabel: string): Locator =>
  200 |   fieldByLabel(page, uniqueLabel).locator('xpath=..');
  201 | 
  202 | export const fieldIn = (grid: Locator, label: string): Locator =>
  203 |   grid.locator(`xpath=.//p[normalize-space(text())=${xpathLiteral(label)}]/../..`);
  204 | 
  205 | export const operatorGrid = (page: Page) => sectionGrid(page, 'Operator version');
  206 | export const meshsyncGrid = (page: Page) => sectionGrid(page, 'MeshSync version');
  207 | export const brokerGrid = (page: Page) => sectionGrid(page, 'Broker version');
  208 | 
  209 | /** Pick an option from a Sistent/MUI select by its exact visible text. */
  210 | export async function chooseOption(page: Page, control: Locator, option: string): Promise<void> {
  211 |   await control.click();
  212 |   await page.getByRole('option', { name: option, exact: true }).click();
  213 |   // The listbox is a portal that intercepts pointer events until it unmounts.
  214 |   await expect(page.getByRole('listbox')).toHaveCount(0);
  215 | }
  216 | 
  217 | /** Wait for the server-wide defaults GET that hydrates the editor. */
  218 | export const waitForDefaultsLoad = (page: Page) =>
  219 |   page.waitForResponse(
  220 |     (response) =>
  221 |       response.request().method() === 'GET' &&
  222 |       response.url().includes(SYSTEM_CONFIG_API) &&
  223 |       response.status() === 200,
  224 |   );
  225 | 
  226 | /** Wait for the save PUT the editor issues. */
  227 | const waitForDefaultsSave = (page: Page) =>
  228 |   page.waitForResponse(
  229 |     (response) =>
  230 |       response.request().method() === 'PUT' && response.url().includes(SYSTEM_CONFIG_API),
  231 |   );
  232 | 
  233 | /** Deep-link straight to Settings -> Operator, MeshSync & Broker. */
  234 | export async function openControllersSettings(page: Page): Promise<void> {
  235 |   const loaded = waitForDefaultsLoad(page);
  236 |   await page.goto('/settings?settingsCategory=Controllers', { waitUntil: 'domcontentloaded' });
  237 |   await expect(
  238 |     page.getByRole('heading', { name: 'Meshery Operator, MeshSync & Broker' }),
  239 |   ).toBeVisible();
  240 |   await loaded;
  241 |   // The mode banner is the first thing the form renders, so its presence means
  242 |   // the editor is mounted with a resolved governing mode rather than mid-hydration.
  243 |   await expect(page.getByTestId('controllers-config-mode-banner')).toBeVisible();
  244 | }
  245 | 
  246 | /**
  247 |  * Save the editor and return the document the server stored.
  248 |  *
  249 |  * The save does not settle when the PUT resolves. `useControllersConfigDraft`
  250 |  * clears `dirty` at that point, which re-seeds the draft from the RTK query
  251 |  * cache - still holding the pre-save document - and the editor briefly shows
  252 |  * every field back on Inherit. The mutation invalidates
```