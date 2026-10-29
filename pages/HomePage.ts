import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  private readonly page: Page;

  // Locators
  private readonly accountMenu: Locator;
  private readonly loginLink: Locator;
  private readonly registerLink: Locator;
  private readonly logoutLink: Locator;
  private readonly searchInput: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly storeLogo: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    const topNavigation = page.getByRole('navigation').first();
    this.accountMenu = topNavigation.getByRole('link', { name: /My Account/ });
    this.loginLink = topNavigation.getByRole('link', { name: 'Login', exact: true });
    this.registerLink = topNavigation.getByRole('link', { name: 'Register', exact: true });
    this.logoutLink = topNavigation.getByRole('link', { name: 'Logout', exact: true });
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.shoppingCartLink = topNavigation.getByRole('link', { name: /Shopping Cart/ });
    this.storeLogo = page.getByRole('img', { name: 'naveenopencart' });
  }

  /**
   * Checks that the storefront homepage is displayed.
   * @returns Promise<boolean> - true when the store logo is visible
   */
  async isHomePageExists(): Promise<boolean> {
    await expect(this.storeLogo).toBeVisible();
    return true;
  }

  /**
   * Opens the registration page through the My Account menu.
   */
  async goToRegister(): Promise<void> {
    await this.accountMenu.click();
    await this.page.getByRole('link', { name: 'Register', exact: true }).click();
  }

  /**
   * Opens the login page through the My Account menu.
   */
  async goToLogin(): Promise<void> {
    await this.accountMenu.click();
    await this.page.getByRole('link', { name: 'Login', exact: true }).click();
  }

  /**
   * Searches the catalog for a product.
   * @param productName - Product text to search for
   */
  async searchForProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchInput.press('Enter');
  }

  /**
   * Opens the shopping cart from the top navigation.
   */
  async openShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  /**
   * Verifies that the account menu provides guest options instead of logout.
   * @returns Promise<boolean> - true when login and register are visible and logout is absent
   */
  async isGuestAccountMenuAvailable(): Promise<boolean> {
    await this.accountMenu.click();
    await expect(this.loginLink).toBeVisible();
    await expect(this.registerLink).toBeVisible();
    await expect(this.logoutLink).toBeHidden();
    return true;
  }
}
