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
  - main [ref=e3]:
    - generic [ref=e5]:
      - form "Authentication form" [ref=e6]:
        - heading "Logo" [level=1] [ref=e7]:
          - img "Logo" [ref=e8]
        - generic [ref=e9]: CONTINUE WITH
        - button "github icon Sign in with github" [ref=e11] [cursor=pointer]:
          - img "github icon" [ref=e12]
          - generic [ref=e13]: Sign in with github
        - button "google icon Sign in with google" [ref=e15] [cursor=pointer]:
          - img "google icon" [ref=e16]
          - generic [ref=e17]: Sign in with google
        - generic [ref=e18]: OR
        - generic [ref=e19]:
          - link "LOGIN" [ref=e20] [cursor=pointer]:
            - /url: /login
          - link "SIGN UP" [ref=e21] [cursor=pointer]:
            - /url: /registration
        - generic [ref=e22]:
          - textbox "E-Mail" [ref=e23]
          - generic: E-Mail
        - generic [ref=e25]:
          - textbox "Password" [ref=e26]
          - generic: Password
          - button "Show password" [ref=e27] [cursor=pointer]:
            - img [ref=e28]
        - button "Sign in with email" [ref=e30] [cursor=pointer]
        - paragraph [ref=e31]:
          - text: By signing in, you agree to the
          - link "terms of use" [ref=e32] [cursor=pointer]:
            - /url: /legal/terms-of-service.html
          - text: ","
          - link "privacy policy" [ref=e33] [cursor=pointer]:
            - /url: /legal/privacy-policy.html
          - text: ", and use of cookies."
      - generic [ref=e34]:
        - link "Forgot Password?" [ref=e35] [cursor=pointer]:
          - /url: /recovery
        - link "Resend Verification Email" [ref=e36] [cursor=pointer]:
          - /url: /verification
    - generic [ref=e38]:
      - generic [ref=e39]:
        - generic [ref=e40]:
          - img "Composable Infrastructure" [ref=e41]
          - img "Composable Infrastructure" [ref=e42]
        - heading "Composable Infrastructure" [level=3] [ref=e43]
        - paragraph [ref=e44]: Choose from thousands of versioned cloud native components.
      - list [ref=e45]:
        - listitem [ref=e46]:
          - button "Go to slide 1" [ref=e47] [cursor=pointer]
        - listitem [ref=e48]:
          - button "Go to slide 2" [ref=e49] [cursor=pointer]
        - listitem [ref=e50]:
          - button "Go to slide 3" [ref=e51] [cursor=pointer]
  - alert [ref=e52]
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