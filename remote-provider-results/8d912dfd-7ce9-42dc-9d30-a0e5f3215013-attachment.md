# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth/oauth-deeplink-entry.spec.ts >> deep-link entry: on-etld-non-byoc (on-eTLD/non-BYOC) >> routes google to the cloud-brokered anchor for digitalocean.layer5.io
- Location: e2e/auth/oauth-deeplink-entry.spec.ts:106:11

# Error details

```
Error: digitalocean.layer5.io/oidc/start/google should 302 to the provider

expect(received).toBe(expected) // Object.is equality

Expected: 302
Received: 502
```

# Test source

```ts
  35  | //
  36  | // Everything here is unauthenticated GETs against a deployment. No login is
  37  | // completed, so nothing is written.
  38  | 
  39  | // Deliberately NOT serial. Every cell is an independent read-only GET, and the
  40  | // point of a host matrix is that each host reports its own verdict - a serial
  41  | // run stops at the first red host and hides the blast radius. The suite that
  42  | // preceded this one reported "8 passed" while three hosts were broken; a matrix
  43  | // that can only tell you about its first cell has the same failure mode.
  44  | test.describe.configure({ mode: "parallel" });
  45  | 
  46  | // A catalog design deep link - the shape a visitor arrives with when they hit
  47  | // "Login" from a shared design page. The slug does not need to resolve: what is
  48  | // under test is whether the auth chain PRESERVES the destination and mints a
  49  | // challenge, not what the destination renders.
  50  | const DEEP_LINK = "/catalog/content/catalog/deep-link-entry-probe";
  51  | 
  52  | // A syntactically valid but unknown flow id. This is the load-bearing half of
  53  | // the entry shape: `/login?flow=<unknown>` makes the server's flow lookup fail,
  54  | // and pre-fix that branch re-inited a CHALLENGE-FREE flow instead of restarting
  55  | // through Hydra. Real users reach it via a stale flow id left in the URL by an
  56  | // earlier visit or a client-side route change into /login.
  57  | const STALE_FLOW_ID = "00000000-0000-0000-0000-000000000000";
  58  | 
  59  | function deepLinkEntryURL(host: string): string {
  60  |   const params = new URLSearchParams({ return_to: DEEP_LINK, flow: STALE_FLOW_ID });
  61  |   return `https://${host}/login?${params.toString()}`;
  62  | }
  63  | 
  64  | for (const cell of oauthHostMatrix()) {
  65  |   test.describe(`deep-link entry: ${cell.key} (${cell.etld}/${cell.byoc})`, () => {
  66  |     test(`mints a login_challenge and preserves the destination on ${cell.host}`, async () => {
  67  |       // A cookie jar is required: the chain runs /login -> Hydra /oauth2/auth
  68  |       // -> /login?login_challenge=... -> /api/auth/flow/init -> /login?flow=...
  69  |       // and Hydra sets its login CSRF cookie mid-chain.
  70  |       const ctx = await request.newContext();
  71  |       try {
  72  |         const res = await ctx.get(deepLinkEntryURL(cell.host), {
  73  |           failOnStatusCode: false
  74  |         });
  75  |         expect(
  76  |           res.status(),
  77  |           `${cell.host} deep-link entry should render the login page`
  78  |         ).toBe(200);
  79  | 
  80  |         const landed = new URL(res.url());
  81  | 
  82  |         // (1) The challenge. Without it the React page silently downgrades to
  83  |         // legacy Kratos brokering, which is uncompletable on a custom domain.
  84  |         expect(
  85  |           landed.searchParams.get("login_challenge") ?? "",
  86  |           `${cell.host}: deep-link entry must land on a login page carrying a ` +
  87  |             `login_challenge. Without one the page falls back to legacy Kratos ` +
  88  |             `brokering, whose host-scoped ory_kratos_continuity cookie cannot ` +
  89  |             `reach a canonical-host callback - the custom-domain stranding defect. ` +
  90  |             `Landed on: ${landed.pathname}${landed.search.slice(0, 120)}`
  91  |         ).not.toBe("");
  92  | 
  93  |         // (2) The destination. Even with the challenge restored, dropping
  94  |         // return_to lands the user on /dashboard instead of the design they
  95  |         // clicked. The login page forwards this to /oidc/start as `ref`.
  96  |         expect(
  97  |           landed.searchParams.get("return_to") ?? "",
  98  |           `${cell.host}: the caller's return_to must survive the Hydra round trip`
  99  |         ).toBe(DEEP_LINK);
  100 |       } finally {
  101 |         await ctx.dispose();
  102 |       }
  103 |     });
  104 | 
  105 |     for (const provider of OAUTH_PROVIDERS) {
  106 |       test(`routes ${provider} to the cloud-brokered anchor for ${cell.host}`, async () => {
  107 |         const ctx = await request.newContext();
  108 |         try {
  109 |           // Re-drive the deep-link entry, then start the OIDC flow exactly as
  110 |           // the login page would: forward the challenge it landed with, and
  111 |           // translate return_to -> ref (see KratosNode.buildOidcStartHref).
  112 |           const entry = await ctx.get(deepLinkEntryURL(cell.host), {
  113 |             failOnStatusCode: false
  114 |           });
  115 |           const landed = new URL(entry.url());
  116 |           const challenge = landed.searchParams.get("login_challenge") ?? "";
  117 |           expect(
  118 |             challenge,
  119 |             `${cell.host}: deep-link entry produced no login_challenge, so the OIDC ` +
  120 |               `click cannot take the cloud-brokered route at all`
  121 |           ).not.toBe("");
  122 | 
  123 |           const startParams = new URLSearchParams({
  124 |             login_challenge: challenge,
  125 |             ref: landed.searchParams.get("return_to") ?? DEEP_LINK
  126 |           });
  127 |           const res = await ctx.get(
  128 |             `https://${cell.host}/oidc/start/${provider}?${startParams.toString()}`,
  129 |             { maxRedirects: 0, failOnStatusCode: false }
  130 |           );
  131 | 
  132 |           expect(
  133 |             res.status(),
  134 |             `${cell.host}/oidc/start/${provider} should 302 to the provider`
> 135 |           ).toBe(302);
      |             ^ Error: digitalocean.layer5.io/oidc/start/google should 302 to the provider
  136 |           const loc = new URL(res.headers()["location"] ?? "");
  137 |           expect(loc.hostname, `Location host for ${provider}`).toBe(
  138 |             providerAuthorizeHost(provider)
  139 |           );
  140 | 
  141 |           // The brokering contract, asserted on a challenge that came from the
  142 |           // DEEP-LINK entry rather than a bare /login: non-BYOC anchors at the
  143 |           // canonical host, BYOC anchors at its own.
  144 |           const redirectUri = loc.searchParams.get("redirect_uri") ?? "";
  145 |           expect(redirectUri, "authorize URL must carry a redirect_uri").not.toBe("");
  146 |           expect(
  147 |             new URL(redirectUri).hostname,
  148 |             `${cell.key} deep-link redirect_uri must anchor at ${cell.expectedCallbackHost}`
  149 |           ).toBe(cell.expectedCallbackHost);
  150 | 
  151 |           // The eTLD-blind server-side state store keys off this nonce. Its
  152 |           // presence is what distinguishes the cloud-brokered path from the
  153 |           // legacy Kratos one that depends on a host-scoped cookie.
  154 |           expect(
  155 |             loc.searchParams.get("state") ?? "",
  156 |             "cloud-brokered authorize URL must carry state (the server-side store key)"
  157 |           ).not.toBe("");
  158 |         } finally {
  159 |           await ctx.dispose();
  160 |         }
  161 |       });
  162 |     }
  163 |   });
  164 | }
  165 | 
  166 | // Guard the entry shape itself: bare /login has always minted a challenge, and
  167 | // it is the control that proves the deep-link assertions above are measuring
  168 | // the ENTRY and not some ambient property of the host.
  169 | for (const cell of oauthHostMatrix() as OAuthHostCell[]) {
  170 |   test(`control - bare /login on ${cell.host} mints a challenge`, async () => {
  171 |     const ctx = await request.newContext();
  172 |     try {
  173 |       const res = await ctx.get(`https://${cell.host}/login`, {
  174 |         failOnStatusCode: false
  175 |       });
  176 |       expect(res.status()).toBe(200);
  177 |       expect(
  178 |         new URL(res.url()).searchParams.get("login_challenge") ?? "",
  179 |         `${cell.host}: bare /login must mint a challenge (it did even while the ` +
  180 |           `deep-link entry did not - that asymmetry WAS the bug)`
  181 |       ).not.toBe("");
  182 |     } finally {
  183 |       await ctx.dispose();
  184 |     }
  185 |   });
  186 | }
  187 | 
```