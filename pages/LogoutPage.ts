import { expect, Locator, Page } from '@playwright/test';

export class LogoutPage {
  private readonly page: Page;

  // Locators
  private readonly logoutHeading: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.logoutHeading = page.getByRole('heading', { name: 'Account Logout', exact: true });
    this.continueButton = page.getByRole('link', { name: 'Continue', exact: true });
  }

  /**
   * Checks that the logout confirmation page is displayed.
   * @returns Promise<boolean> - true when the logout heading is visible
   */
  async isLogoutPageExists(): Promise<boolean> {
    await expect(this.logoutHeading).toBeVisible();
    return true;
  }

  /**
   * Continues from logout confirmation to the storefront.
   */
  async continueToStore(): Promise<void> {
    await this.continueButton.click();
  }
}
