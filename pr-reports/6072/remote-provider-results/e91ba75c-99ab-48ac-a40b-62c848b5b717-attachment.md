# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: help-and-support-modal.spec.ts >> help & support modal >> posts the description the user typed as memberFormOne.message
- Location: e2e/help-and-support-modal.spec.ts:70:7

# Error details

```
Error: locator.fill: Error: strict mode violation: getByRole('dialog').getByLabel('Subject') resolved to 2 elements:
    1) <input required="" type="string" id="root_subject" aria-invalid="false" class="MuiInputBase-input MuiOutlinedInput-input css-yzodeh"/> aka getByRole('textbox', { name: 'Subject' })
    2) <span tabindex="0" role="button" data-testid="field-info" backgroundcolor="#3C494F" class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-1p874na" aria-label="Subject: Enter a concise and descriptive title for your support request. This will help us quickly understand the nature of your inquiry.">…</span> aka getByRole('button', { name: 'Subject: Enter a concise and' })

Call log:
  - waiting for getByRole('dialog').getByLabel('Subject')

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
    - main [ref=e67]:
      - heading [level=4] [ref=e69]: 404 | Page Not Found
      - img [ref=e73]
      - generic [ref=e74]:
        - link [ref=e75] [cursor=pointer]:
          - /url: /
          - text: Return to Dashboard
        - button [ref=e76] [cursor=pointer]: Contact Us
      - paragraph [ref=e77]:
        - text: For more help, please in
        - link [ref=e78] [cursor=pointer]:
          - /url: https://discuss.meshery.io
          - text: discussion forum
        - text: or in the
        - link [ref=e79] [cursor=pointer]:
          - /url: https://slack.layer5.io
          - text: Slack workspace
        - text: .
    - navigation [ref=e80]:
      - generic [ref=e81]:
        - heading [level=6] [ref=e82]:
          - text: Active Users
          - paragraph [ref=e83]: (0)
        - img [ref=e84]
    - button [ref=e86] [cursor=pointer]: Feedback
    - generic [ref=e88]:
      - generic [ref=e89]:
        - img [ref=e91]
        - paragraph [ref=e94]: Feedback
        - generic [ref=e95]:
          - img [ref=e98]
          - img [ref=e102] [cursor=pointer]
      - generic [ref=e106]:
        - generic [ref=e107]:
          - button [ref=e108] [cursor=pointer]:
            - img [ref=e110]
            - paragraph [ref=e112]: Issue
          - button [ref=e113] [cursor=pointer]:
            - img [ref=e115]
            - paragraph [ref=e121]: Suggestion
          - button [ref=e122] [cursor=pointer]:
            - img [ref=e124]
            - paragraph [ref=e129]: Meet Request
        - textbox [ref=e131]:
          - /placeholder: I’m having an issue with...
      - generic [ref=e133]:
        - generic [ref=e134]:
          - generic [ref=e135] [cursor=pointer]:
            - checkbox [ref=e136]
            - img [ref=e137]
          - paragraph [ref=e139]: We may email you for more information or updates
        - button [disabled]: Send
  - alert [ref=e140]
  - dialog [active] [ref=e143]:
    - generic [ref=e144]:
      - img [ref=e146]
      - generic [ref=e161]: Help & Support
      - button [ref=e163] [cursor=pointer]:
        - img [ref=e164]
    - generic [ref=e172]:
      - generic [ref=e176]:
        - generic:
          - text: Subject
          - generic: "*"
        - generic [ref=e177]:
          - textbox "Subject" [ref=e178]
          - 'button "Subject: Enter a concise and descriptive title for your support request. This will help us quickly understand the nature of your inquiry." [ref=e180] [cursor=pointer]':
            - img [ref=e181]
          - group:
            - generic: Subject *
      - generic [ref=e187]:
        - generic:
          - text: Description
          - generic: "*"
        - generic [ref=e188]:
          - textbox "Description" [ref=e189]
          - 'button "Description: Please provide a detailed description of your issue or question. Include any relevant information that will help us assist you more effectively." [ref=e191] [cursor=pointer]':
            - img [ref=e192]
          - group:
            - generic: Description *
      - generic [ref=e196]:
        - text: Scope of Questions
        - radiogroup [ref=e197]:
          - generic [ref=e198] [cursor=pointer]:
            - generic [ref=e199]:
              - radio "Support" [ref=e200]
              - img [ref=e202]
            - generic [ref=e204]: Support
          - generic [ref=e205] [cursor=pointer]:
            - generic [ref=e206]:
              - radio "Community" [ref=e207]
              - img [ref=e209]
            - generic [ref=e211]: Community
          - generic [ref=e212] [cursor=pointer]:
            - generic [ref=e213]:
              - radio "Account" [ref=e214]
              - img [ref=e216]
            - generic [ref=e218]: Account
          - generic [ref=e219] [cursor=pointer]:
            - generic [ref=e220]:
              - radio "Commercial" [ref=e221]
              - img [ref=e223]
            - generic [ref=e225]: Commercial
    - generic [ref=e227]:
      - button "Cancel" [ref=e228] [cursor=pointer]
      - button "Submit" [ref=e229] [cursor=pointer]
```

# Test source

```ts
  9   | 
  10  | /**
  11  |  * End-user reproduction and regression guard for meshery-cloud#5911.
  12  |  *
  13  |  * The Help & Support modal renders the canonical
  14  |  * `SupportRequestRjsfSchemaV1Beta1` form, whose description field is named
  15  |  * `message`. `handleSubmit` built its payload by spreading the emitted formData
  16  |  * and THEN assigning `message: data.description` - a property the schema does
  17  |  * not emit - so the real description the user typed was overwritten with
  18  |  * `undefined` and dropped entirely by `JSON.stringify`. Every support request
  19  |  * reached intake with a subject and an empty body, behind a success toast.
  20  |  *
  21  |  * This spec drives the real surface: it opens the modal from the 404 page's
  22  |  * "Contact Us" button, types into the rendered RJSF fields, submits, and reads
  23  |  * the bytes actually posted to `POST /api/webhook/support`. Asserting the wire
  24  |  * payload - rather than the shape of the handler - is what makes it a
  25  |  * reproduction: it fails against the pre-fix component for the same reason a
  26  |  * user's request arrived empty.
  27  |  *
  28  |  * The second assertion covers the latent half of the same defect: `...data`
  29  |  * forwarded every emitted property verbatim into a payload the server decodes
  30  |  * with `DisallowUnknownFields()` (`server/handlers/webhooks.go`), so the moment
  31  |  * the form schema gains a field `models.MemberFormOne` lacks, the whole
  32  |  * submission is rejected with a 400. The payload must therefore carry exactly
  33  |  * the Go model's keys and nothing else.
  34  |  */
  35  | 
  36  | // `createSharedShellHandlers` serves this object verbatim as
  37  | // `GET /api/identity/users/profile`, whose canonical response is
  38  | // `GetUserApiResponse` - camelCase `firstName`/`lastName`, which is what the
  39  | // component reads. Most specs in this directory still spell it `first_name`;
  40  | // that is inert for them because they never read the name, but a fixture
  41  | // carrying a key the client does not read would quietly turn the two name
  42  | // assertions below into assertions about `""`.
  43  | const authenticatedUser = {
  44  |   id: "user-1",
  45  |   firstName: "Test",
  46  |   lastName: "User",
  47  |   email: "test@example.com",
  48  |   preferences: { selectedOrg: "org-1" }
  49  | };
  50  | 
  51  | const organization = {
  52  |   id: "org-1",
  53  |   name: "Test Organization",
  54  |   // Must equal the PLAYWRIGHT_BASE_URL host or the shell bounces to
  55  |   // /auth/switch-domain, so it is derived rather than hardcoded to :3000 -
  56  |   // the same shape `academy-instructor-console` and `dashboard-welcome-modal`
  57  |   // already use. Hardcoding it makes the spec unrunnable on any other port,
  58  |   // which matters because a second checkout holding :3000 does not fail the
  59  |   // run: Playwright reuses *that* server and the spec reports on code from a
  60  |   // different worktree.
  61  |   domain: new URL(process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000").host
  62  | };
  63  | 
  64  | const SUBJECT = "Cannot connect my Kubernetes cluster";
  65  | const DESCRIPTION =
  66  |   "The connect wizard reports a timeout after I upload my kubeconfig, " +
  67  |   "and the connection never leaves the discovered state.";
  68  | 
  69  | test.describe("help & support modal", () => {
  70  |   test("posts the description the user typed as memberFormOne.message", async ({
  71  |     page
  72  |   }) => {
  73  |     let submitted: Record<string, unknown> | undefined;
  74  | 
  75  |     await mockApi(page, [
  76  |       // Ahead of the shell/fallback handlers. `createFallbackHandlers` ends in
  77  |       // a terminal `return jsonResponse({})` that claims EVERY path it has not
  78  |       // already matched - not just the `listWords` ones - so registering the
  79  |       // capture after it would let the fallback answer this route and the
  80  |       // assertions below would never see the payload. A path being absent from
  81  |       // `listWords` is no reason to place it later: the catch-all takes it too.
  82  |       request => {
  83  |         if (
  84  |           request.method() !== "POST" ||
  85  |           new URL(request.url()).pathname !== "/api/webhook/support"
  86  |         ) {
  87  |           return undefined;
  88  |         }
  89  |         submitted = request.postDataJSON();
  90  |         return { body: { message: "ok" }, contentType: "application/json", status: 200 };
  91  |       },
  92  |       ...createSharedShellHandlers({
  93  |         user: authenticatedUser,
  94  |         organizations: [organization]
  95  |       }),
  96  |       ...createAuthenticatedShellHandlers({ orgId: "org-1" }),
  97  |       ...createFallbackHandlers()
  98  |     ]);
  99  | 
  100 |     await page.goto("/404", { waitUntil: "domcontentloaded" });
  101 | 
  102 |     await page.getByRole("button", { name: "Contact Us" }).click();
  103 | 
  104 |     const modal = page.getByRole("dialog");
  105 |     await expect(modal.getByText("Help & Support")).toBeVisible();
  106 | 
  107 |     // The RJSF chunk is code-split in via `next/dynamic`, so wait for the
  108 |     // fields themselves rather than for the modal frame.
> 109 |     await modal.getByLabel("Subject").fill(SUBJECT);
      |                                       ^ Error: locator.fill: Error: strict mode violation: getByRole('dialog').getByLabel('Subject') resolved to 2 elements:
  110 |     await modal.getByLabel("Description").fill(DESCRIPTION);
  111 |     await modal.getByRole("radio", { name: "Support" }).check();
  112 | 
  113 |     await modal.getByRole("button", { name: "Submit" }).click();
  114 | 
  115 |     await expect.poll(() => submitted).toBeDefined();
  116 | 
  117 |     const memberFormOne = (submitted as { memberFormOne: Record<string, unknown> })
  118 |       .memberFormOne;
  119 | 
  120 |     // The defect: this was `undefined`, so `JSON.stringify` dropped the key and
  121 |     // intake received an empty body.
  122 |     expect(memberFormOne.message).toBe(DESCRIPTION);
  123 |     expect(memberFormOne.subject).toBe(SUBJECT);
  124 |     expect(memberFormOne.scope).toBe("Support");
  125 |     expect(memberFormOne.form).toBe("contact");
  126 |     expect(memberFormOne.email).toBe("test@example.com");
  127 |     expect(memberFormOne.firstname).toBe("Test");
  128 |     expect(memberFormOne.lastname).toBe("User");
  129 | 
  130 |     // The latent half: nothing outside `models.MemberFormOne` may be forwarded,
  131 |     // or the server's strict decoder rejects the whole submission. The key set
  132 |     // comes from the one module the jest guards read, so there is a single
  133 |     // hand-maintained copy of the Go struct's tags.
  134 |     expect(Object.keys(memberFormOne).sort()).toEqual([...MEMBER_FORM_ONE_KEYS].sort());
  135 |   });
  136 | });
  137 | 
```