# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: branded-tenant-no-provider-brand.spec.ts >> branded tenant host: no provider brand on any reachable page >> /identity/organizations names nothing of the provider
- Location: e2e/branded-tenant-no-provider-brand.spec.ts:137:9

# Error details

```
Error: provider brand on /identity/organizations for a branded tenant

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "link: https://docs.meshery.io/reference/references/permissions/",
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e7]:
        - link [ref=e9] [cursor=pointer]:
          - /url: /account/profile
          - paragraph [ref=e10]: Blowhorn
        - generic [ref=e13]:
          - combobox [ref=e14] [cursor=pointer]:
            - generic [ref=e41]: Blowhorn
          - textbox [aria-hidden]: org-blowhorn
          - group [aria-hidden]
        - generic [ref=e44]:
          - button [ref=e45] [cursor=pointer]
          - generic "Profile" [ref=e48] [cursor=pointer]
    - generic [ref=e52]:
      - heading "Organizations" [level=1] [ref=e53]
      - tablist "scrollable auto tabs example" [ref=e56]:
        - tab "Overview" [ref=e57] [cursor=pointer]
        - tab "Users" [disabled] [ref=e61]
        - tab "Teams" [disabled] [ref=e65]
        - tab "Roles" [disabled] [ref=e70]
        - tab "Organizations" [disabled] [selected] [ref=e74]
        - tab "Invitations" [disabled] [ref=e82]
        - tab "Requests" [disabled] [ref=e87]
    - main [ref=e96]:
      - heading "Oops! It seems like you don't have the necessary permissions to view this page." [level=4] [ref=e98]
      - generic [ref=e100]:
        - generic [ref=e101]:
          - heading "YOUR ACCESS" [level=5] [ref=e102]
          - generic [ref=e103]:
            - paragraph [ref=e104]: Authorization Required
            - paragraph [ref=e105]: "Needs any of: View All Organizations, View Org"
            - generic [ref=e107]:
              - button "Copy key ID for View All Organizations" [ref=e108] [cursor=pointer]
              - paragraph [ref=e111]: View All Organizations
            - paragraph [ref=e113]: See all organizations within a Cloud deployment. See all organizations, teams, and users.
            - generic [ref=e114]:
              - button "Copy key ID for View Org" [ref=e115] [cursor=pointer]
              - paragraph [ref=e118]: View Org
            - paragraph [ref=e120]: See only organizations to which you are a member. See all other members within your membership teams.
            - generic [ref=e122]:
              - generic [ref=e123]:
                - generic [ref=e124]: Identity & Access Management
                - generic [ref=e126]: Organizations
              - link [ref=e128] [cursor=pointer]:
                - /url: https://docs.meshery.io/reference/references/permissions/
            - generic [ref=e133]:
              - generic [ref=e134]:
                - paragraph [ref=e139]: User
                - paragraph [ref=e140]: avery@example.com
              - generic [ref=e141]:
                - paragraph [ref=e148]: Org
                - paragraph [ref=e149]: Blowhorn
              - generic [ref=e150]:
                - paragraph [ref=e155]: Role(s)
                - paragraph [ref=e156]: None
            - paragraph [ref=e157]: Seeing this message in error? Contact your Admins to request access.
        - separator [ref=e158]
        - generic [ref=e159]:
          - heading "YOUR OPTIONS" [level=5] [ref=e160]
          - generic [ref=e161]:
            - paragraph [ref=e162]: To view the content of this page, switch to an organization where you have the required access using the ‘Switch Organization’ field below.
            - group [ref=e163]:
              - heading "Switch Organization" [level=6] [ref=e164]
              - paragraph [ref=e166]: You do not have the required permission in any of your organizations.
      - generic [ref=e167]:
        - link "Return to Dashboard" [ref=e168] [cursor=pointer]:
          - /url: /
        - button "Contact Us" [ref=e169] [cursor=pointer]
    - navigation [ref=e170]:
      - heading [level=6] [ref=e172]:
        - text: Active Users
        - paragraph [ref=e173]: (0)
    - generic:
      - button "Feedback" [ref=e176] [cursor=pointer]
      - generic [ref=e178]:
        - generic [ref=e179]:
          - paragraph [ref=e184]: Feedback
          - generic [ref=e191] [cursor=pointer]
        - generic [ref=e196]:
          - generic [ref=e197]:
            - button [ref=e198] [cursor=pointer]:
              - paragraph [ref=e202]: Issue
            - button [ref=e203] [cursor=pointer]:
              - paragraph [ref=e211]: Suggestion
            - button [ref=e212] [cursor=pointer]:
              - paragraph [ref=e219]: Meet Request
          - textbox "I’m having an issue with..." [ref=e221]
        - generic [ref=e223]:
          - generic [ref=e224]:
            - checkbox [ref=e226] [cursor=pointer]
            - paragraph [ref=e229]: We may email you for more information or updates
          - button "Send" [disabled]
  - alert [ref=e230]
```

# Test source

```ts
  73  |   id: "user-1",
  74  |   first_name: "Avery",
  75  |   last_name: "Tenant",
  76  |   email: "avery@example.com",
  77  |   preferences: { selectedOrg: "org-child" }
  78  | };
  79  | 
  80  | // The pages a new tenant user can reach from sign-up on: the dashboard and
  81  | // onboarding, their account and settings, and every error surface.
  82  | const PAGES = [
  83  |   "/dashboard",
  84  |   "/account",
  85  |   "/identity/organizations",
  86  |   "/support",
  87  |   "/error",
  88  |   "/404",
  89  |   "/settings"
  90  | ];
  91  | 
  92  | // Known leaks that live outside this repository, each with its tracking issue.
  93  | // A page listed here is EXPECTED to fail (test.fail): the day the leak is fixed
  94  | // the test starts passing, Playwright reports that as an error, and the entry
  95  | // must be removed. Nothing here is skipped.
  96  | const KNOWN_EXTERNAL_LEAKS: Record<string, string> = {
  97  |   // Sistent's PermissionShield hard-codes the Meshery permissions docs link.
  98  |   "/identity/organizations": "https://github.com/layer5io/sistent/issues/1883",
  99  |   // /dashboard is not served on a white-label host: it lands on
  100 |   // /account/profile, which carries the same PermissionShield link.
  101 |   "/dashboard": "https://github.com/layer5io/sistent/issues/1883"
  102 | };
  103 | 
  104 | async function providerBrandOccurrences(page: Page): Promise<string[]> {
  105 |   return page.evaluate(source => {
  106 |     const pattern = new RegExp(source, "i");
  107 |     const found: string[] = [];
  108 |     const context = (text: string) => {
  109 |       const m = text.match(pattern);
  110 |       if (!m || m.index === undefined) return text.slice(0, 120);
  111 |       return text.slice(Math.max(0, m.index - 50), m.index + 50).replace(/\s+/g, " ");
  112 |     };
  113 |     if (pattern.test(document.title)) found.push(`title: ${document.title}`);
  114 |     const text = document.body?.innerText || "";
  115 |     if (pattern.test(text)) found.push(`text: ...${context(text)}...`);
  116 |     document.querySelectorAll("link[rel~='icon']").forEach(el => {
  117 |       const href = (el as HTMLLinkElement).href;
  118 |       if (pattern.test(href)) found.push(`favicon: ${href}`);
  119 |     });
  120 |     document.querySelectorAll("img").forEach(el => {
  121 |       const img = el as HTMLImageElement;
  122 |       const visible = img.offsetParent !== null;
  123 |       if (visible && (pattern.test(img.currentSrc || img.src) || pattern.test(img.alt))) {
  124 |         found.push(`img: ${img.currentSrc || img.src} alt=${img.alt}`);
  125 |       }
  126 |     });
  127 |     document.querySelectorAll("a[href]").forEach(el => {
  128 |       const a = el as HTMLAnchorElement;
  129 |       if (a.offsetParent !== null && pattern.test(a.href)) found.push(`link: ${a.href}`);
  130 |     });
  131 |     return Array.from(new Set(found));
  132 |   }, PROVIDER_BRAND.source);
  133 | }
  134 | 
  135 | test.describe("branded tenant host: no provider brand on any reachable page", () => {
  136 |   for (const path of PAGES) {
  137 |     test(`${path} names nothing of the provider`, async ({ page }) => {
  138 |       const knownLeak = KNOWN_EXTERNAL_LEAKS[path];
  139 |       test.fail(Boolean(knownLeak), `known external leak: ${knownLeak}`);
  140 |       await page.route(`${tenantBase}/tenant-assets/**`, route =>
  141 |         route.fulfill({
  142 |           status: 200,
  143 |           contentType: "image/svg+xml",
  144 |           body: "<svg xmlns='http://www.w3.org/2000/svg'/>"
  145 |         })
  146 |       );
  147 |       await mockApi(page, [
  148 |         request => {
  149 |           const url = new URL(request.url());
  150 |           if (url.pathname === "/api/identity/orgs/by-domain") {
  151 |             return { status: 200, contentType: "application/json", body: blowhorn };
  152 |           }
  153 |           return undefined;
  154 |         },
  155 |         ...createSharedShellHandlers({ user, organizations: [child, blowhorn] }),
  156 |         ...createAuthenticatedShellHandlers({
  157 |           orgId: "org-child",
  158 |           skipKeys: true,
  159 |           preferences: { theme: blowhornTheme }
  160 |         }),
  161 |         ...createFallbackHandlers()
  162 |       ]);
  163 | 
  164 |       await page.goto(path, { waitUntil: "domcontentloaded" });
  165 |       await page
  166 |         .waitForLoadState("networkidle", { timeout: 10_000 })
  167 |         .catch(() => undefined);
  168 |       // Settle: the provider-host decision and the organization both resolve
  169 |       // after mount.
  170 |       await page.waitForTimeout(1500);
  171 | 
  172 |       const leaks = await providerBrandOccurrences(page);
> 173 |       expect(leaks, `provider brand on ${path} for a branded tenant`).toEqual([]);
      |                                                                       ^ Error: provider brand on /identity/organizations for a branded tenant
  174 |     });
  175 |   }
  176 | });
  177 | 
  178 | // The product's own pages are not a white-label organization's: on its host
  179 | // the dashboard, the root and the catalog route to the organization's page,
  180 | // and the product's content (catalog counts, the product onboarding) never
  181 | // renders on the way. utility/white-label.ts decides; the server makes the
  182 | // same decision for a direct request (HandleHome), which this static export
  183 | // does not run.
  184 | const PRODUCT_ONLY_PAGES = ["/dashboard", "/", "/catalog"];
  185 | const PRODUCT_CONTENT =
  186 |   /catalog designs|visualize your cluster|multi-player|where do you want to start/i;
  187 | 
  188 | test.describe("branded tenant host: product-only pages route to the organization's page", () => {
  189 |   for (const path of PRODUCT_ONLY_PAGES) {
  190 |     test(`${path} lands on /account/profile`, async ({ page }) => {
  191 |       await page.route(`${tenantBase}/tenant-assets/**`, route =>
  192 |         route.fulfill({
  193 |           status: 200,
  194 |           contentType: "image/svg+xml",
  195 |           body: "<svg xmlns='http://www.w3.org/2000/svg'/>"
  196 |         })
  197 |       );
  198 |       await mockApi(page, [
  199 |         request => {
  200 |           const url = new URL(request.url());
  201 |           if (url.pathname === "/api/identity/orgs/by-domain") {
  202 |             return { status: 200, contentType: "application/json", body: blowhorn };
  203 |           }
  204 |           return undefined;
  205 |         },
  206 |         ...createSharedShellHandlers({ user, organizations: [child, blowhorn] }),
  207 |         ...createAuthenticatedShellHandlers({
  208 |           orgId: "org-child",
  209 |           skipKeys: true,
  210 |           preferences: { theme: blowhornTheme }
  211 |         }),
  212 |         ...createFallbackHandlers()
  213 |       ]);
  214 |       const seenProductContent: string[] = [];
  215 |       page.on("framenavigated", async frame => {
  216 |         if (frame !== page.mainFrame()) return;
  217 |         const text = await frame
  218 |           .evaluate(() => document.body?.innerText || "")
  219 |           .catch(() => "");
  220 |         if (PRODUCT_CONTENT.test(text)) seenProductContent.push(frame.url());
  221 |       });
  222 | 
  223 |       await page.goto(path, { waitUntil: "domcontentloaded" });
  224 |       await expect(page).toHaveURL(/\/account\/profile$/, { timeout: 15_000 });
  225 |       await expect(page.getByText(PRODUCT_CONTENT)).toHaveCount(0);
  226 |       expect(seenProductContent).toEqual([]);
  227 |     });
  228 |   }
  229 | });
  230 | 
  231 | // The sign-up journey itself, before there is a session: the pages a new
  232 | // tenant user sees on the tenant host on the way in.
  233 | const AUTH_PAGES = [
  234 |   "/login",
  235 |   "/registration",
  236 |   "/verification",
  237 |   "/recovery",
  238 |   "/registered"
  239 | ];
  240 | 
  241 | test.describe("branded tenant host: no provider brand on the sign-up pages", () => {
  242 |   for (const path of AUTH_PAGES) {
  243 |     test(`${path} names nothing of the provider`, async ({ page }) => {
  244 |       await page.route(`${tenantBase}/tenant-assets/**`, route =>
  245 |         route.fulfill({
  246 |           status: 200,
  247 |           contentType: "image/svg+xml",
  248 |           body: "<svg xmlns='http://www.w3.org/2000/svg'/>"
  249 |         })
  250 |       );
  251 |       await mockApi(page, [
  252 |         request => {
  253 |           const url = new URL(request.url());
  254 |           if (url.pathname === "/api/identity/orgs/by-domain") {
  255 |             return { status: 200, contentType: "application/json", body: blowhorn };
  256 |           }
  257 |           return undefined;
  258 |         },
  259 |         ...createFallbackHandlers()
  260 |       ]);
  261 |       await page.goto(path, { waitUntil: "domcontentloaded" });
  262 |       await page
  263 |         .waitForLoadState("networkidle", { timeout: 10_000 })
  264 |         .catch(() => undefined);
  265 |       await page.waitForTimeout(1500);
  266 |       const leaks = await providerBrandOccurrences(page);
  267 |       expect(leaks, `provider brand on ${path} for a branded tenant`).toEqual([]);
  268 |     });
  269 |   }
  270 | });
  271 | 
  272 | // The detector is not vacuous: the same crawl on a PROVIDER host finds the
  273 | // provider's brand, so a branded-host pass means the brand is really gone.
```