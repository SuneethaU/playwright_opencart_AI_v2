import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  private readonly page: Page;

  // Locators
  private readonly productTable: Locator;
  private readonly totalsTable: Locator;
  private readonly cartHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.productTable = page.getByRole('table').first();
    this.totalsTable = page.getByRole('table').nth(1);
    this.cartHeading = page.getByRole('heading', { name: /^Shopping Cart/ });
  }

  /**
   * Checks that the shopping cart page is displayed.
   * @returns Promise<boolean> - true when the cart heading is visible
   */
  async isCartPageExists(): Promise<boolean> {
    await expect(this.cartHeading).toBeVisible();
    return true;
  }

  /**
   * Checks whether the expected product is present in the cart.
   * @param productName - Expected product name
   * @returns Promise<boolean> - true when its cart row is visible
   */
  async isProductPresent(productName: string): Promise<boolean> {
    await expect(this.productRow(productName)).toBeVisible();
    return true;
  }

  /**
   * Reads the quantity shown for a cart product.
   * @param productName - Product whose quantity to read
   * @returns Promise<string> - Quantity displayed in the cart
   */
  async getProductQuantity(productName: string): Promise<string> {
    return this.productRow(productName).getByRole('textbox').inputValue();
  }

  /**
   * Reads the unit price shown for a cart product.
   * @param productName - Product whose price to read
   * @returns Promise<string> - Unit price displayed in the cart
   */
  async getProductPrice(productName: string): Promise<string> {
    return this.productRow(productName).getByRole('cell').nth(4).innerText();
  }

  /**
   * Reads the grand total in the cart totals table.
   * @returns Promise<string> - Grand total displayed by OpenCart
   */
  async getCartTotal(): Promise<string> {
    const totalLabel = this.totalsTable.getByRole('cell', { name: 'Total:', exact: true });
    return totalLabel.locator('..').getByRole('cell').nth(1).innerText();
  }

  private productRow(productName: string): Locator {
    return this.productTable.getByRole('row').filter({ hasText: productName });
  }
}
