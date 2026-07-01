# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: remote.setup.js >> authenticate with Remote Provider
- Location: tests/e2e/remote.setup.js:12:6

# Error details

```
Error: Email is required for login
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e4]: Loading...
  - main [ref=e6]:
    - progressbar [ref=e9]:
      - img [ref=e10]
    - generic [ref=e13]:
      - generic [ref=e14]:
        - generic [ref=e15]:
          - img "Composable Infrastructure" [ref=e16]
          - img "Composable Infrastructure" [ref=e17]
        - heading "Composable Infrastructure" [level=3] [ref=e18]
        - paragraph [ref=e19]: Choose from thousands of versioned cloud native components.
      - list [ref=e20]:
        - listitem [ref=e21]:
          - button "Go to slide 1" [ref=e22] [cursor=pointer]
        - listitem [ref=e23]:
          - button "Go to slide 2" [ref=e24] [cursor=pointer]
        - listitem [ref=e25]:
          - button "Go to slide 3" [ref=e26] [cursor=pointer]
```

# Test source

```ts
  1  | export const waitForAuthRedirection = async (page) => {
  2  |   await page.waitForURL((url) => {
  3  |     const pathname = new URL(url).pathname;
  4  |     return ['/', '/dashboard'].includes(pathname);
  5  |   });
  6  | };
  7  | 
  8  | export class LoginPage {
  9  |   constructor(page) {
  10 |     this.page = page;
  11 |     this.emailInput = this.page.locator('input[name="identifier"]');
  12 |     this.passwordInput = this.page.locator('input[name="password"]');
  13 |     this.loginButton = this.page.locator('button[name="method"][value="password"]');
  14 |   }
  15 | 
  16 |   async navigateToLogin() {
  17 |     await this.page.goto('/login');
  18 |   }
  19 | 
  20 |   async loginWithToken(token, baseURL, provider = 'Meshery') {
  21 |     if (!token) {
  22 |       throw new Error('Token is required for token-based authentication');
  23 |     }
  24 |     if (!baseURL) {
  25 |       throw new Error('Base URL is required for token-based authentication');
  26 |     }
  27 | 
  28 |     await this.page.context().addCookies([
  29 |       {
  30 |         name: 'token',
  31 |         value: token,
  32 |         url: baseURL,
  33 |         expires: Math.floor(Date.now() / 1000) + 60 * 60,
  34 |       },
  35 |       {
  36 |         name: 'meshery-provider',
  37 |         value: provider,
  38 |         url: baseURL,
  39 |         expires: -1,
  40 |       },
  41 |     ]);
  42 | 
  43 |     // Navigate to the baseURL after setting cookies
  44 |     await this.page.goto(baseURL);
  45 |   }
  46 | 
  47 |   async loginWithEmail(email, password) {
  48 |     if (!email) {
> 49 |       throw new Error('Email is required for login');
     |             ^ Error: Email is required for login
  50 |     }
  51 |     if (!password) {
  52 |       throw new Error('Password is required for login');
  53 |     }
  54 | 
  55 |     await this.emailInput.evaluate((el, value) => {
  56 |       el.value = value;
  57 |     }, email);
  58 |     await this.passwordInput.evaluate((el, value) => {
  59 |       el.value = value;
  60 |     }, password);
  61 |     await this.loginButton.click();
  62 |   }
  63 | 
  64 |   async waitForRedirection() {
  65 |     await waitForAuthRedirection(this.page);
  66 |   }
  67 | }
  68 | 
```