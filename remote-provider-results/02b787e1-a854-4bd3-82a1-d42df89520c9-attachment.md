# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: invitations.spec.ts >> invitations flow >> updates an existing invitation
- Location: e2e/invitations.spec.ts:165:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('row', { name: /Platform Admin Invite/ })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('row', { name: /Platform Admin Invite/ })

```

```yaml
- dialog:
  - img
  - text: Edit Invitation
  - button:
    - img
  - text: Emails
  - button "engineer@example.com"
  - combobox "Emails"
  - button:
    - img
  - text: roles
  - combobox
  - button:
    - img
  - text: teams
  - combobox
  - button:
    - img
  - text: quota
  - spinbutton "quota": "5"
  - text: expiresAt
  - textbox "expiresAt" [invalid]
  - text: status
  - combobox "status": enabled
  - text: name
  - textbox "name": Platform Admin Invite
  - text: description
  - textbox "description": Updated invite for platform administrators
  - checkbox "isDefault"
  - img
  - text: isDefault
  - button:
    - img
  - button:
    - img
  - button "Cancel"
  - button "Update Invitation"
```

# Test source

```ts
  90  |     await expect(
  91  |       page.getByRole("button", { name: /Create New Invitation/i })
  92  |     ).toBeVisible();
  93  |     await expect(page.getByText("No Invitations Found").first()).toBeVisible();
  94  |   });
  95  | 
  96  |   const invitationHandlers = () => [
  97  |     ...createSharedShellHandlers({
  98  |       user: authenticatedUser,
  99  |       organizations: [organization]
  100 |     }),
  101 |     ...createAuthenticatedShellHandlers({
  102 |       orgId: "org-1",
  103 |       keys: [manageInvitationsKey]
  104 |     }),
  105 |     ...createInvitationsHandlers({ invitations: [existingInvitation] }),
  106 |     ...createFallbackHandlers()
  107 |   ];
  108 | 
  109 |   test("supports list, create, and delete invitation flows", async ({ page }) => {
  110 |     const createdInvitationName = "Platform Team Invite";
  111 | 
  112 |     await mockApi(page, invitationHandlers());
  113 |     await page.goto("/identity/invitations");
  114 | 
  115 |     await expect(
  116 |       page.getByRole("row", { name: new RegExp(existingInvitation.name) })
  117 |     ).toBeVisible();
  118 | 
  119 |     await page.getByRole("button", { name: /Create New Invitation/i }).click();
  120 |     await expect(
  121 |       page.getByRole("dialog").getByText("Create New Invitation")
  122 |     ).toBeVisible();
  123 |     await invitationField(page, "name").fill(createdInvitationName);
  124 |     await invitationField(page, "description").fill(
  125 |       "Invite for the platform engineering team"
  126 |     );
  127 |     await invitationField(page, "quota").fill("3");
  128 |     await page.getByRole("button", { name: "Create Invitation" }).click();
  129 | 
  130 |     const createdInvitationRow = page.getByRole("row", {
  131 |       name: new RegExp(createdInvitationName)
  132 |     });
  133 |     await expect(createdInvitationRow).toBeVisible();
  134 | 
  135 |     await createdInvitationRow.getByTitle("Delete Invitation").click();
  136 | 
  137 |     await expect(
  138 |       page.getByRole("row", { name: new RegExp(createdInvitationName) })
  139 |     ).toHaveCount(0);
  140 |     await expect(
  141 |       page.getByRole("row", { name: new RegExp(existingInvitation.name) })
  142 |     ).toBeVisible();
  143 |   });
  144 | 
  145 |   // EXPECTED TO FAIL - a live product defect, not a harness one:
  146 |   // https://github.com/layer5io/meshery-cloud/issues/5969
  147 |   //
  148 |   // `test.fail()` rather than `test.skip()` deliberately: the test still RUNS
  149 |   // and still reports, and the run goes RED the moment the defect is fixed,
  150 |   // which forces this annotation to be removed rather than outliving the bug. A
  151 |   // skip would be indistinguishable from a pass, which is the failure mode this
  152 |   // whole branch exists to remove.
  153 |   //
  154 |   // Measured: opening Edit Invitation, changing `root_name` and clicking
  155 |   // "Update Invitation" issues NO PUT at all (only the analytics beacon). The
  156 |   // dialog stays open and RJSF renders no validation message, so nothing on
  157 |   // screen tells the user why their edit did not save. That is the documented
  158 |   // dead-Save-button shape - RJSF refuses a submit naming a required property it
  159 |   // is not rendering - the same class as #5916 (Create/Edit Workspace) and #5917
  160 |   // (badge modal); see AGENTS.md "Schema-Driven Development" and
  161 |   // docs/contracts/form-schema-source-of-truth.md. Filling `emails` first does
  162 |   // not unblock it, so the missing required property is something else and
  163 |   // finding it needs the modal's schema/uiSchema pair read against the
  164 |   // construct, which is out of scope here.
  165 |   test("updates an existing invitation", async ({ page }) => {
  166 |     // Inside the body on purpose: a bare `test.fail()` in the describe scope is
  167 |     // a modifier on the whole SUITE, and it silently marked the two passing
  168 |     // sibling cases as expected-failures too.
  169 |     test.fail();
  170 |     const updatedInvitationName = "Platform Admin Invite";
  171 | 
  172 |     await mockApi(page, invitationHandlers());
  173 |     await page.goto("/identity/invitations");
  174 | 
  175 |     const existingInvitationRow = page.getByRole("row", {
  176 |       name: new RegExp(existingInvitation.name)
  177 |     });
  178 |     await expect(existingInvitationRow).toBeVisible();
  179 |     await existingInvitationRow.getByTitle("Edit Invitation").click();
  180 | 
  181 |     await expect(page.getByRole("dialog").getByText("Edit Invitation")).toBeVisible();
  182 |     await invitationField(page, "name").fill(updatedInvitationName);
  183 |     await invitationField(page, "description").fill(
  184 |       "Updated invite for platform administrators"
  185 |     );
  186 |     await page.getByRole("button", { name: "Update Invitation" }).click();
  187 | 
  188 |     await expect(
  189 |       page.getByRole("row", { name: new RegExp(updatedInvitationName) })
> 190 |     ).toBeVisible();
      |       ^ Error: expect(locator).toBeVisible() failed
  191 |   });
  192 | });
  193 | 
```