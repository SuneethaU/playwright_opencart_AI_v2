import { expect, Locator, Page } from '@playwright/test';

export class AccountPage {
  private readonly page: Page;

  // Locators
  private readonly accountContent: Locator;
  private readonly accountHeading: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.accountContent = page.locator('#content');
    this.accountHeading = this.accountContent.getByRole('heading', {
      name: 'My Account',
      exact: true,
    });
    this.logoutLink = page.getByRole('link', { name: 'Logout', exact: true });
  }

  /**
   * Checks that the authenticated My Account area is displayed.
   * @returns Promise<boolean> - true when the account heading is visible
   */
  async isAccountPageExists(): Promise<boolean> {
    await expect(this.accountHeading).toBeVisible();
    return true;
  }

  /**
   * Checks that the account navigation provides a logout option.
   * @returns Promise<boolean> - true when the logout link is visible
   */
  async isLogoutAvailable(): Promise<boolean> {
    await expect(this.logoutLink).toBeVisible();
    return true;
  }

  /**
   * Logs the customer out of the account.
   */
  async logout(): Promise<void> {
    await this.logoutLink.click();
  }
}
