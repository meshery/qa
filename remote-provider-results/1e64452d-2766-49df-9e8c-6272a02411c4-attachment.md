# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: invitations.spec.ts >> invitations flow >> supports list, create, update, and delete invitation flows
- Location: e2e/invitations.spec.ts:78:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByLabel(/^Name$/i)

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
      - heading [level=1] [ref=e68]: Invitations
      - tablist [ref=e71]:
        - tab [ref=e72] [cursor=pointer]:
          - img [ref=e73]
          - text: Overview
        - tab [disabled] [ref=e76]:
          - img [ref=e77]
          - text: Users
        - tab [disabled] [ref=e80]:
          - img [ref=e81]
          - text: Teams
        - tab [disabled] [ref=e85]:
          - img [ref=e86]
          - text: Roles
        - tab [disabled] [ref=e89]:
          - img [ref=e90]
          - text: Organizations
        - tab [selected] [ref=e97] [cursor=pointer]:
          - img [ref=e98]
          - text: Invitations
        - tab [disabled] [ref=e102]:
          - img [ref=e103]
          - text: Requests
    - generic [ref=e110]:
      - generic [ref=e111]:
        - button [ref=e113] [cursor=pointer]:
          - img [ref=e115]
          - text: Create New Invitation
        - generic [ref=e118]:
          - button [ref=e122] [cursor=pointer]:
            - img [ref=e123]
          - button [ref=e128] [cursor=pointer]:
            - img [ref=e129]
      - generic [ref=e132]:
        - grid [ref=e134]:
          - caption [ref=e135]
          - rowgroup [ref=e136]:
            - row [ref=e137]:
              - columnheader [ref=e138]:
                - button [ref=e140] [cursor=pointer]:
                  - generic [ref=e142]: Invite
              - columnheader [ref=e143]:
                - button [ref=e145] [cursor=pointer]:
                  - generic [ref=e147]: Owner
              - columnheader [ref=e148]:
                - button [ref=e150] [cursor=pointer]:
                  - generic [ref=e152]: Expires At
              - columnheader [ref=e153]:
                - button [ref=e155] [cursor=pointer]:
                  - generic [ref=e157]: Quota
              - columnheader [ref=e158]:
                - button [ref=e160] [cursor=pointer]:
                  - generic [ref=e162]: Organization
              - columnheader [ref=e163]:
                - button [ref=e165] [cursor=pointer]:
                  - generic [ref=e167]: Roles
              - columnheader [ref=e168]:
                - button [ref=e170] [cursor=pointer]:
                  - generic [ref=e172]: Teams
              - columnheader [ref=e173]:
                - button [ref=e175] [cursor=pointer]:
                  - generic [ref=e177]: Status
              - columnheader [ref=e178]:
                - generic [ref=e179]: Actions
          - rowgroup [ref=e180]:
            - row [ref=e181]:
              - gridcell [ref=e182]:
                - generic [ref=e184]:
                  - paragraph [ref=e186]: Engineering Team Invite
                  - paragraph [ref=e188]: Open seats for backend engineers
                  - generic [ref=e189]:
                    - paragraph [ref=e190]: http://localhost:3000/invitations/invite-1/accept
                    - img [ref=e192] [cursor=pointer]
              - gridcell [ref=e194]:
                - generic [ref=e196]:
                  - img [ref=e198] [cursor=pointer]
                  - paragraph [ref=e201]: N/A
              - gridcell [ref=e202]:
                - generic [ref=e203]: Never
              - gridcell [ref=e204]:
                - paragraph [ref=e207]: 0 / 5
              - gridcell [ref=e208]:
                - paragraph [ref=e210]: Test Organization
              - gridcell [ref=e211]
              - gridcell [ref=e212]
              - gridcell [ref=e213]:
                - generic [ref=e215]: enabled
              - gridcell [ref=e216]:
                - generic [ref=e218]:
                  - button [ref=e219] [cursor=pointer]:
                    - img [ref=e220]
                  - button [ref=e222] [cursor=pointer]:
                    - img [ref=e223]
        - table [ref=e226]:
          - rowgroup [ref=e227]:
            - row [ref=e228]:
              - cell [ref=e229]:
                - generic [ref=e232]:
                  - paragraph [ref=e233]: "Rows per page:"
                  - generic [ref=e234]:
                    - combobox [ref=e235] [cursor=pointer]: "10"
                    - textbox: "10"
                    - img
                  - paragraph [ref=e236]: 1-1 of 1
                  - generic [ref=e237]:
                    - button [disabled]:
                      - img
                    - button [disabled]:
                      - img
    - navigation [ref=e239]:
      - generic [ref=e240]:
        - heading [level=6] [ref=e241]:
          - text: Active Users
          - paragraph [ref=e242]: (0)
        - img [ref=e243]
    - button [ref=e245] [cursor=pointer]: Feedback
    - generic [ref=e247]:
      - generic [ref=e248]:
        - img [ref=e250]
        - paragraph [ref=e253]: Feedback
        - generic [ref=e254]:
          - img [ref=e257]
          - img [ref=e261] [cursor=pointer]
      - generic [ref=e265]:
        - generic [ref=e266]:
          - button [ref=e267] [cursor=pointer]:
            - img [ref=e269]
            - paragraph [ref=e271]: Issue
          - button [ref=e272] [cursor=pointer]:
            - img [ref=e274]
            - paragraph [ref=e280]: Suggestion
          - button [ref=e281] [cursor=pointer]:
            - img [ref=e283]
            - paragraph [ref=e288]: Meet Request
        - textbox [ref=e290]:
          - /placeholder: I’m having an issue with...
      - generic [ref=e292]:
        - generic [ref=e293]:
          - generic [ref=e294] [cursor=pointer]:
            - checkbox [ref=e295]
            - img [ref=e296]
          - paragraph [ref=e298]: We may email you for more information or updates
        - button [disabled]: Send
  - alert [ref=e299]
  - dialog [active] [ref=e302]:
    - generic [ref=e303]:
      - img [ref=e305]
      - generic [ref=e308]: Edit Invitation
      - button [ref=e310] [cursor=pointer]:
        - img [ref=e311]
    - generic [ref=e319]:
      - generic [ref=e322]:
        - generic [ref=e324]:
          - generic [ref=e325]: Emails
          - generic [ref=e326]:
            - button "engineer@example.com" [ref=e327]:
              - generic [ref=e328]: engineer@example.com
              - img [ref=e329] [cursor=pointer]
            - combobox "Emails" [ref=e331]
            - group:
              - generic: Emails
        - button [ref=e334] [cursor=pointer]:
          - img [ref=e335]
      - generic [ref=e340]:
        - generic: roles
        - generic [ref=e342]:
          - combobox [ref=e343] [cursor=pointer]
          - textbox
          - img
          - button [ref=e345] [cursor=pointer]:
            - img [ref=e346]
          - group:
            - generic: roles
      - generic [ref=e351]:
        - generic: teams
        - generic [ref=e353]:
          - combobox [ref=e354] [cursor=pointer]
          - textbox
          - img
          - button [ref=e356] [cursor=pointer]:
            - img [ref=e357]
          - group:
            - generic: teams
      - generic [ref=e363]:
        - generic [ref=e364]: quota
        - generic [ref=e365]:
          - spinbutton "quota" [ref=e366]: "5"
          - group:
            - generic: quota
      - generic [ref=e370]:
        - generic: expiresAt
        - generic [ref=e371]:
          - textbox "expiresAt" [ref=e372]
          - group:
            - generic: expiresAt
      - generic [ref=e375]:
        - generic [ref=e376]:
          - text: status
          - generic [ref=e377]: "*"
        - generic [ref=e378]:
          - combobox "status" [ref=e379] [cursor=pointer]:
            - generic [ref=e381]: enabled
          - textbox: "0"
          - img
          - group:
            - generic: status *
      - generic [ref=e385]:
        - generic [ref=e386]:
          - text: name
          - generic [ref=e387]: "*"
        - generic [ref=e388]:
          - textbox "name" [ref=e389]: Engineering Team Invite
          - group:
            - generic: name *
      - generic [ref=e393]:
        - generic [ref=e394]: description
        - generic [ref=e395]:
          - textbox "description" [ref=e396]: Open seats for backend engineers
          - group:
            - generic: description
      - generic [ref=e399] [cursor=pointer]:
        - generic [ref=e400]:
          - checkbox "isDefault" [ref=e401]
          - img [ref=e402]
        - generic [ref=e405]:
          - text: isDefault
          - button [ref=e406]:
            - img [ref=e407]
    - generic [ref=e410]:
      - button [ref=e411] [cursor=pointer]:
        - img [ref=e412]
      - generic [ref=e414]:
        - button "Cancel" [ref=e415] [cursor=pointer]
        - button "Update Invitation" [ref=e416] [cursor=pointer]
```

# Test source

```ts
  4   |   createAuthenticatedShellHandlers,
  5   |   createFallbackHandlers,
  6   |   createInvitationsHandlers,
  7   |   createSharedShellHandlers,
  8   |   mockApi
  9   | } from "./helpers/network";
  10  | 
  11  | const manageInvitationsKey = {
  12  |   id: Keys.IdentityAccessManagementManageInvitations.id,
  13  |   function: Keys.IdentityAccessManagementManageInvitations.function
  14  | };
  15  | 
  16  | /**
  17  |  * TP-016 Invitation flow coverage. The invitations management page lists,
  18  |  * creates, edits, and deletes organization invitations through the
  19  |  * `/api/organizations/invitations*` RTK Query surface.
  20  |  */
  21  | 
  22  | const authenticatedUser = {
  23  |   id: "user-1",
  24  |   first_name: "Test",
  25  |   last_name: "User",
  26  |   email: "test@example.com",
  27  |   preferences: { selectedOrg: "org-1" }
  28  | };
  29  | 
  30  | const organization = {
  31  |   id: "org-1",
  32  |   name: "Test Organization",
  33  |   domain: "localhost:3000"
  34  | };
  35  | 
  36  | const existingInvitation = {
  37  |   id: "invite-1",
  38  |   owner: "user-1",
  39  |   name: "Engineering Team Invite",
  40  |   description: "Open seats for backend engineers",
  41  |   emails: ["engineer@example.com"],
  42  |   status: "enabled",
  43  |   orgId: "org-1",
  44  |   quota: 5,
  45  |   acceptedBy: [],
  46  |   roles: [],
  47  |   teams: [],
  48  |   createdAt: "2026-01-01T00:00:00Z",
  49  |   updatedAt: "2026-01-01T00:00:00Z",
  50  |   deletedAt: ""
  51  | };
  52  | 
  53  | test.describe("invitations flow", () => {
  54  |   test("shows empty state and create action when no invitations exist", async ({
  55  |     page
  56  |   }) => {
  57  |     await mockApi(page, [
  58  |       ...createSharedShellHandlers({
  59  |         user: authenticatedUser,
  60  |         organizations: [organization]
  61  |       }),
  62  |       ...createAuthenticatedShellHandlers({
  63  |         orgId: "org-1",
  64  |         keys: [manageInvitationsKey]
  65  |       }),
  66  |       ...createInvitationsHandlers({ invitations: [] }),
  67  |       ...createFallbackHandlers()
  68  |     ]);
  69  | 
  70  |     await page.goto("/identity/invitations");
  71  | 
  72  |     await expect(
  73  |       page.getByRole("button", { name: /Create New Invitation/i })
  74  |     ).toBeVisible();
  75  |     await expect(page.getByText("No Invitations Found").first()).toBeVisible();
  76  |   });
  77  | 
  78  |   test("supports list, create, update, and delete invitation flows", async ({ page }) => {
  79  |     const createdInvitationName = "Platform Team Invite";
  80  |     const updatedInvitationName = "Platform Admin Invite";
  81  | 
  82  |     await mockApi(page, [
  83  |       ...createSharedShellHandlers({
  84  |         user: authenticatedUser,
  85  |         organizations: [organization]
  86  |       }),
  87  |       ...createAuthenticatedShellHandlers({
  88  |         orgId: "org-1",
  89  |         keys: [manageInvitationsKey]
  90  |       }),
  91  |       ...createInvitationsHandlers({ invitations: [existingInvitation] }),
  92  |       ...createFallbackHandlers()
  93  |     ]);
  94  | 
  95  |     await page.goto("/identity/invitations");
  96  | 
  97  |     const existingInvitationRow = page.getByRole("row", {
  98  |       name: new RegExp(existingInvitation.name)
  99  |     });
  100 |     await expect(existingInvitationRow).toBeVisible();
  101 |     await existingInvitationRow.getByTitle("Edit Invitation").click();
  102 | 
  103 |     await expect(page.getByRole("dialog").getByText("Edit Invitation")).toBeVisible();
> 104 |     await page.getByLabel(/^Name$/i).fill(updatedInvitationName);
      |                                      ^ Error: locator.fill: Test timeout of 60000ms exceeded.
  105 |     await page
  106 |       .getByLabel(/^Description$/i)
  107 |       .fill("Updated invite for platform administrators");
  108 |     await page.getByRole("button", { name: "Update Invitation" }).click();
  109 | 
  110 |     const updatedInvitationRow = page.getByRole("row", {
  111 |       name: new RegExp(updatedInvitationName)
  112 |     });
  113 |     await expect(updatedInvitationRow).toBeVisible();
  114 | 
  115 |     await page.getByRole("button", { name: /Create New Invitation/i }).click();
  116 | 
  117 |     await expect(
  118 |       page.getByRole("dialog").getByText("Create New Invitation")
  119 |     ).toBeVisible();
  120 |     await page.getByLabel(/^Name$/i).fill(createdInvitationName);
  121 |     await page
  122 |       .getByLabel(/^Description$/i)
  123 |       .fill("Invite for the platform engineering team");
  124 |     await page.getByLabel(/^Quota$/i).fill("3");
  125 |     await page.getByRole("button", { name: "Create Invitation" }).click();
  126 | 
  127 |     const createdInvitationRow = page.getByRole("row", {
  128 |       name: new RegExp(createdInvitationName)
  129 |     });
  130 |     await expect(createdInvitationRow).toBeVisible();
  131 | 
  132 |     await createdInvitationRow.getByTitle("Delete Invitation").click();
  133 | 
  134 |     await expect(
  135 |       page.getByRole("row", {
  136 |         name: new RegExp(createdInvitationName)
  137 |       })
  138 |     ).toHaveCount(0);
  139 |     await expect(updatedInvitationRow).toBeVisible();
  140 |   });
  141 | });
  142 | 
```