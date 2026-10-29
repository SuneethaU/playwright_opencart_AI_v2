# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\login-data-driven.spec.ts >> Invalid login - row 3 @master @regression @web @datadriven
- Location: tests\web\login-data-driven.spec.ts:23:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/^Warning: (No match for E-Mail Address and\/or Password\.|Your account has exceeded allowed number of login attempts\.)/)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText(/^Warning: (No match for E-Mail Address and\/or Password\.|Your account has exceeded allowed number of login attempts\.)/) with timeout 5000ms
  - waiting for getByText(/^Warning: (No match for E-Mail Address and\/or Password\.|Your account has exceeded allowed number of login attempts\.)/)

```

```yaml
- navigation:
  - button "$ Currency ":
    - strong: $
    - text: Currency 
  - list:
    - listitem:
      - link "":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/contact
      - text: "123456789"
    - listitem:
      - link " My Account":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
    - listitem:
      - link " Wish List (0)":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist
    - listitem:
      - link " Shopping Cart":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=checkout/cart
    - listitem:
      - link " Checkout":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=checkout/checkout
- banner:
  - link "naveenopencart":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=common/home
    - img "naveenopencart"
  - textbox "Search"
  - button ""
  - button " 0 item(s) - $0.00"
- navigation:
  - list:
    - listitem:
      - link "Desktops":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=20
    - listitem:
      - link "Laptops & Notebooks":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=18
    - listitem:
      - link "Components":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=25
    - listitem:
      - link "Tablets":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=57
    - listitem:
      - link "Software":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=17
    - listitem:
      - link "Phones & PDAs":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=24
    - listitem:
      - link "Cameras":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=33
    - listitem:
      - link "MP3 Players":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=34
- list:
  - listitem:
    - link "":
      - /url: https://naveenautomationlabs.com/opencart/index.php?route=common/home
  - listitem:
    - link "Account":
      - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
  - listitem:
    - link "Login":
      - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/login
- text: " Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour."
- heading "New Customer" [level=2]
- paragraph:
  - strong: Register Account
- paragraph: By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.
- link "Continue":
  - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/register
- heading "Returning Customer" [level=2]
- paragraph:
  - strong: I am a returning customer
- text: E-Mail Address
- textbox "E-Mail Address"
- text: Password
- textbox "Password": abcxyx
- link "Forgotten Password":
  - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/forgotten
- button "Login"
- complementary:
  - link "Login":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/login
  - link "Register":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/register
  - link "Forgotten Password":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/forgotten
  - link "My Account":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
  - link "Address Book":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/address
  - link "Wish List":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist
  - link "Order History":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/order
  - link "Downloads":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/download
  - link "Recurring payments":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/recurring
  - link "Reward Points":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/reward
  - link "Returns":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/return
  - link "Transactions":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/transaction
  - link "Newsletter":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/newsletter
- contentinfo:
  - heading "Information" [level=5]
  - list:
    - listitem:
      - link "About Us":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=4
    - listitem:
      - link "Delivery Information":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=6
    - listitem:
      - link "Privacy Policy":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=3
    - listitem:
      - link "Terms & Conditions":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=5
  - heading "Customer Service" [level=5]
  - list:
    - listitem:
      - link "Contact Us":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/contact
    - listitem:
      - link "Returns":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/return/add
    - listitem:
      - link "Site Map":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/sitemap
  - heading "Extras" [level=5]
  - list:
    - listitem:
      - link "Brands":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/manufacturer
    - listitem:
      - link "Gift Certificates":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/voucher
    - listitem:
      - link "Affiliate":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=affiliate/login
    - listitem:
      - link "Specials":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/special
  - heading "My Account" [level=5]
  - list:
    - listitem:
      - link "My Account":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
    - listitem:
      - link "Order History":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/order
    - listitem:
      - link "Wish List":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist
    - listitem:
      - link "Newsletter":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/newsletter
  - separator
  - paragraph:
    - text: Powered By
    - link "OpenCart":
      - /url: http://www.opencart.com
    - text: naveenopencart © 2026
```

# Test source

```ts
  1  | import { expect, Locator, Page } from '@playwright/test';
  2  | 
  3  | export class LoginPage {
  4  |   private readonly page: Page;
  5  | 
  6  |   // Locators
  7  |   private readonly emailInput: Locator;
  8  |   private readonly passwordInput: Locator;
  9  |   private readonly loginButton: Locator;
  10 |   private readonly loginHeading: Locator;
  11 |   private readonly invalidCredentialsWarning: Locator;
  12 |   private readonly loginFailureWarning: Locator;
  13 | 
  14 |   constructor(page: Page) {
  15 |     this.page = page;
  16 | 
  17 |     // Initialize locators with CSS selectors
  18 |     this.emailInput = page.getByRole('textbox', { name: 'E-Mail Address' });
  19 |     this.passwordInput = page.getByRole('textbox', { name: 'Password' });
  20 |     this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
  21 |     this.loginHeading = page.getByRole('heading', { name: 'Returning Customer', exact: true });
  22 |     this.invalidCredentialsWarning = page.getByText(
  23 |       'Warning: No match for E-Mail Address and/or Password.',
  24 |       { exact: true },
  25 |     );
  26 |     this.loginFailureWarning = page.getByText(
  27 |       /^Warning: (No match for E-Mail Address and\/or Password\.|Your account has exceeded allowed number of login attempts\.)/,
  28 |     );
  29 |   }
  30 | 
  31 |   /**
  32 |    * Checks that the customer login page is displayed.
  33 |    * @returns Promise<boolean> - true when the login heading is visible
  34 |    */
  35 |   async isLoginPageExists(): Promise<boolean> {
  36 |     await expect(this.loginHeading).toBeVisible();
  37 |     return true;
  38 |   }
  39 | 
  40 |   /**
  41 |    * Authenticates with the supplied customer credentials.
  42 |    * @param email - Registered customer email address
  43 |    * @param password - Registered customer password
  44 |    */
  45 |   async login(email: string, password: string): Promise<void> {
  46 |     await this.emailInput.fill(email);
  47 |     await this.passwordInput.fill(password);
  48 |     await this.loginButton.click();
  49 |   }
  50 | 
  51 |   /**
  52 |    * Checks the warning shown after a failed login attempt.
  53 |    * @returns Promise<boolean> - true when the invalid-credentials warning is visible
  54 |    */
  55 |   async isInvalidCredentialsWarningVisible(): Promise<boolean> {
  56 |     await expect(this.invalidCredentialsWarning).toBeVisible();
  57 |     return true;
  58 |   }
  59 | 
  60 |   /**
  61 |    * Checks a failed-login warning, including OpenCart's observed rate-limit warning.
  62 |    * @returns Promise<boolean> - true when a login failure warning is visible
  63 |    */
  64 |   async isLoginFailureWarningVisible(): Promise<boolean> {
> 65 |     await expect(this.loginFailureWarning).toBeVisible();
     |                                            ^ Error: expect(locator).toBeVisible() failed
  66 |     return true;
  67 |   }
  68 | }
  69 | 
```