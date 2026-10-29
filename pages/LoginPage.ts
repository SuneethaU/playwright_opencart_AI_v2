import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  // Locators
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly loginHeading: Locator;
  private readonly invalidCredentialsWarning: Locator;
  private readonly loginFailureWarning: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.emailInput = page.getByRole('textbox', { name: 'E-Mail Address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
    this.loginHeading = page.getByRole('heading', { name: 'Returning Customer', exact: true });
    this.invalidCredentialsWarning = page.getByText(
      'Warning: No match for E-Mail Address and/or Password.',
      { exact: true },
    );
    this.loginFailureWarning = page.getByText(
      /Warning: (No match for E-Mail Address and\/or Password\.|Your account has exceeded allowed number of login attempts\.)/,
    );
  }

  /**
   * Checks that the customer login page is displayed.
   * @returns Promise<boolean> - true when the login heading is visible
   */
  async isLoginPageExists(): Promise<boolean> {
    await expect(this.loginHeading).toBeVisible();
    return true;
  }

  /**
   * Authenticates with the supplied customer credentials.
   * @param email - Registered customer email address
   * @param password - Registered customer password
   */
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Checks the warning shown after a failed login attempt.
   * @returns Promise<boolean> - true when the invalid-credentials warning is visible
   */
  async isInvalidCredentialsWarningVisible(): Promise<boolean> {
    await expect(this.invalidCredentialsWarning).toBeVisible();
    return true;
  }

  /**
   * Checks a failed-login warning, including OpenCart's observed rate-limit warning.
   * @returns Promise<boolean> - true when a login failure warning is visible
   */
  async isLoginFailureWarningVisible(): Promise<boolean> {
    await expect(this.loginFailureWarning).toBeVisible();
    return true;
  }
}
