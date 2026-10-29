import { expect, Locator, Page } from '@playwright/test';

export class ProductPage {
  private readonly page: Page;

  // Locators
  private readonly quantityInput: Locator;
  private readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.quantityInput = page.getByRole('textbox', { name: 'Qty' });
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart', exact: true });
  }

  /**
   * Checks that the expected product details are displayed.
   * @param productName - Expected product name
   * @returns Promise<boolean> - true when the product heading is visible
   */
  async isProductPageExists(productName: string): Promise<boolean> {
    await expect(this.page.getByRole('heading', { name: productName, exact: true })).toBeVisible();
    return true;
  }

  /**
   * Checks the product's displayed price.
   * @param price - Expected price text
   * @returns Promise<boolean> - true when the price heading is visible
   */
  async isPriceDisplayed(price: string): Promise<boolean> {
    await expect(this.page.getByRole('heading', { name: price, exact: true })).toBeVisible();
    return true;
  }

  /**
   * Sets the requested product quantity.
   * @param quantity - Quantity to add
   */
  async setQuantity(quantity: string): Promise<void> {
    await this.quantityInput.fill(quantity);
  }

  /**
   * Adds the configured product quantity to the cart.
   */
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  /**
   * Checks whether OpenCart displays the add-to-cart confirmation.
   * @returns Promise<boolean> - true when the success message is visible
   */
  async isAddedToCart(): Promise<boolean> {
    await expect(this.page.getByText(/Success: You have added/)).toBeVisible();
    return true;
  }
}
