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
    - generic [ref=e8]:
      - form "Authentication form" [ref=e9]:
        - heading "Logo" [level=1] [ref=e10]:
          - img "Logo" [ref=e11]
        - generic [ref=e12]: CONTINUE WITH
        - button "github icon Sign in with github" [ref=e14] [cursor=pointer]:
          - img "github icon" [ref=e15]
          - generic [ref=e16]: Sign in with github
        - button "google icon Sign in with google" [ref=e18] [cursor=pointer]:
          - img "google icon" [ref=e19]
          - generic [ref=e20]: Sign in with google
        - generic [ref=e21]: OR
        - generic [ref=e22]:
          - link "LOGIN" [ref=e23] [cursor=pointer]:
            - /url: /login
          - link "SIGN UP" [ref=e24] [cursor=pointer]:
            - /url: /registration
        - generic [ref=e25]:
          - textbox "E-Mail" [ref=e26]
          - generic: E-Mail
        - generic [ref=e28]:
          - textbox "Password" [ref=e29]
          - generic: Password
          - button "Show password" [ref=e30] [cursor=pointer]:
            - img [ref=e31]
        - button "Sign in with email" [ref=e33] [cursor=pointer]
        - paragraph [ref=e34]:
          - text: By signing in, you agree to the
          - link "terms of use" [ref=e35] [cursor=pointer]:
            - /url: /legal/terms-of-service.html
          - text: ","
          - link "privacy policy" [ref=e36] [cursor=pointer]:
            - /url: /legal/privacy-policy.html
          - text: ", and use of cookies."
      - generic [ref=e37]:
        - link "Forgot Password?" [ref=e38] [cursor=pointer]:
          - /url: /recovery
        - link "Resend Verification Email" [ref=e39] [cursor=pointer]:
          - /url: /verification
    - generic [ref=e41]:
      - generic [ref=e42]:
        - generic [ref=e43]:
          - img "Composable Infrastructure" [ref=e44]
          - img "Composable Infrastructure" [ref=e45]
        - heading "Composable Infrastructure" [level=3] [ref=e46]
        - paragraph [ref=e47]: Choose from thousands of versioned cloud native components.
      - list [ref=e48]:
        - listitem [ref=e49]:
          - button "Go to slide 1" [ref=e50] [cursor=pointer]
        - listitem [ref=e51]:
          - button "Go to slide 2" [ref=e52] [cursor=pointer]
        - listitem [ref=e53]:
          - button "Go to slide 3" [ref=e54] [cursor=pointer]
  - alert [ref=e55]
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