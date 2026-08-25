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
        - generic [ref=e120]:
          - button [ref=e124] [cursor=pointer]:
            - img [ref=e125]
          - button [ref=e130] [cursor=pointer]:
            - img [ref=e131]
      - generic [ref=e134]:
        - grid [ref=e136]:
          - caption [ref=e137]
          - rowgroup [ref=e138]:
            - row [ref=e139]:
              - columnheader [ref=e140]:
                - button [ref=e142] [cursor=pointer]:
                  - generic [ref=e144]: Invite
              - columnheader [ref=e145]:
                - button [ref=e147] [cursor=pointer]:
                  - generic [ref=e149]: Owner
              - columnheader [ref=e150]:
                - button [ref=e152] [cursor=pointer]:
                  - generic [ref=e154]: Expires At
              - columnheader [ref=e155]:
                - button [ref=e157] [cursor=pointer]:
                  - generic [ref=e159]: Quota
              - columnheader [ref=e160]:
                - button [ref=e162] [cursor=pointer]:
                  - generic [ref=e164]: Organization
              - columnheader [ref=e165]:
                - button [ref=e167] [cursor=pointer]:
                  - generic [ref=e169]: Roles
              - columnheader [ref=e170]:
                - button [ref=e172] [cursor=pointer]:
                  - generic [ref=e174]: Teams
              - columnheader [ref=e175]:
                - button [ref=e177] [cursor=pointer]:
                  - generic [ref=e179]: Status
              - columnheader [ref=e180]:
                - generic [ref=e181]: Actions
          - rowgroup [ref=e182]:
            - row [ref=e183]:
              - gridcell [ref=e184]:
                - generic [ref=e186]:
                  - paragraph [ref=e188]: Engineering Team Invite
                  - paragraph [ref=e190]: Open seats for backend engineers
                  - generic [ref=e191]:
                    - paragraph [ref=e192]: http://localhost:3000/invitations/invite-1/accept
                    - img [ref=e194] [cursor=pointer]
              - gridcell [ref=e196]:
                - generic [ref=e198]:
                  - img [ref=e200] [cursor=pointer]
                  - paragraph [ref=e203]: N/A
              - gridcell [ref=e204]:
                - generic [ref=e205]: Never
              - gridcell [ref=e206]:
                - paragraph [ref=e209]: 0 / 5
              - gridcell [ref=e210]:
                - paragraph [ref=e212]: Test Organization
              - gridcell [ref=e213]
              - gridcell [ref=e214]
              - gridcell [ref=e215]:
                - generic [ref=e217]: enabled
              - gridcell [ref=e218]:
                - generic [ref=e220]:
                  - button [ref=e221] [cursor=pointer]:
                    - img [ref=e222]
                  - button [ref=e224] [cursor=pointer]:
                    - img [ref=e225]
        - table [ref=e228]:
          - rowgroup [ref=e229]:
            - row [ref=e230]:
              - cell [ref=e231]:
                - generic [ref=e234]:
                  - paragraph [ref=e235]: "Rows per page:"
                  - generic [ref=e236]:
                    - combobox [ref=e237] [cursor=pointer]: "10"
                    - textbox: "10"
                    - img
                  - paragraph [ref=e238]: 1-1 of 1
                  - generic [ref=e239]:
                    - button [disabled]:
                      - img
                    - button [disabled]:
                      - img
    - navigation [ref=e241]:
      - generic [ref=e242]:
        - heading [level=6] [ref=e243]:
          - text: Active Users
          - paragraph [ref=e244]: (0)
        - img [ref=e245]
    - button [ref=e247] [cursor=pointer]: Feedback
    - generic [ref=e249]:
      - generic [ref=e250]:
        - img [ref=e252]
        - paragraph [ref=e255]: Feedback
        - generic [ref=e256]:
          - img [ref=e259]
          - img [ref=e263] [cursor=pointer]
      - generic [ref=e267]:
        - generic [ref=e268]:
          - button [ref=e269] [cursor=pointer]:
            - img [ref=e271]
            - paragraph [ref=e273]: Issue
          - button [ref=e274] [cursor=pointer]:
            - img [ref=e276]
            - paragraph [ref=e282]: Suggestion
          - button [ref=e283] [cursor=pointer]:
            - img [ref=e285]
            - paragraph [ref=e290]: Meet Request
        - textbox [ref=e292]:
          - /placeholder: I’m having an issue with...
      - generic [ref=e294]:
        - generic [ref=e295]:
          - generic [ref=e296] [cursor=pointer]:
            - checkbox [ref=e297]
            - img [ref=e298]
          - paragraph [ref=e300]: We may email you for more information or updates
        - button [disabled]: Send
  - alert [ref=e301]
  - dialog [active] [ref=e304]:
    - generic [ref=e305]:
      - img [ref=e307]
      - generic [ref=e310]: Edit Invitation
      - button [ref=e312] [cursor=pointer]:
        - img [ref=e313]
    - generic [ref=e321]:
      - generic [ref=e324]:
        - generic [ref=e326]:
          - generic [ref=e327]: Emails
          - generic [ref=e328]:
            - button "engineer@example.com" [ref=e329]:
              - generic [ref=e330]: engineer@example.com
              - img [ref=e331] [cursor=pointer]
            - combobox "Emails" [ref=e333]
            - group:
              - generic: Emails
        - button [ref=e336] [cursor=pointer]:
          - img [ref=e337]
      - generic [ref=e342]:
        - generic: roles
        - generic [ref=e344]:
          - combobox [ref=e345] [cursor=pointer]
          - textbox
          - img
          - button [ref=e347] [cursor=pointer]:
            - img [ref=e348]
          - group:
            - generic: roles
      - generic [ref=e353]:
        - generic: teams
        - generic [ref=e355]:
          - combobox [ref=e356] [cursor=pointer]
          - textbox
          - img
          - button [ref=e358] [cursor=pointer]:
            - img [ref=e359]
          - group:
            - generic: teams
      - generic [ref=e365]:
        - generic [ref=e366]: quota
        - generic [ref=e367]:
          - spinbutton "quota" [ref=e368]: "5"
          - group:
            - generic: quota
      - generic [ref=e372]:
        - generic: expiresAt
        - generic [ref=e373]:
          - textbox "expiresAt" [ref=e374]
          - group:
            - generic: expiresAt
      - generic [ref=e377]:
        - generic [ref=e378]:
          - text: status
          - generic [ref=e379]: "*"
        - generic [ref=e380]:
          - combobox "status" [ref=e381] [cursor=pointer]:
            - generic [ref=e383]: enabled
          - textbox: "0"
          - img
          - group:
            - generic: status *
      - generic [ref=e387]:
        - generic [ref=e388]:
          - text: name
          - generic [ref=e389]: "*"
        - generic [ref=e390]:
          - textbox "name" [ref=e391]: Engineering Team Invite
          - group:
            - generic: name *
      - generic [ref=e395]:
        - generic [ref=e396]: description
        - generic [ref=e397]:
          - textbox "description" [ref=e398]: Open seats for backend engineers
          - group:
            - generic: description
      - generic [ref=e401] [cursor=pointer]:
        - generic [ref=e402]:
          - checkbox "isDefault" [ref=e403]
          - img [ref=e404]
        - generic [ref=e407]:
          - text: isDefault
          - button [ref=e408]:
            - img [ref=e409]
    - generic [ref=e412]:
      - button [ref=e413] [cursor=pointer]:
        - img [ref=e414]
      - generic [ref=e416]:
        - button "Cancel" [ref=e417] [cursor=pointer]
        - button "Update Invitation" [ref=e418] [cursor=pointer]
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