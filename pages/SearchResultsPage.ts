import { expect, Locator, Page } from '@playwright/test';

export class SearchResultsPage {
  private readonly page: Page;

  // Locators
  private readonly searchResultsHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.searchResultsHeading = page.getByRole('heading', { name: /^Search - / });
  }

  /**
   * Checks that the product search results page is displayed.
   * @returns Promise<boolean> - true when its heading is visible
   */
  async isSearchResultsPageExists(): Promise<boolean> {
    await expect(this.searchResultsHeading).toBeVisible();
    return true;
  }

  /**
   * Checks that a matching product is present in the search results.
   * @param productName - Expected product name
   * @returns Promise<boolean> - true when the exact product link is visible
   */
  async isProductListed(productName: string): Promise<boolean> {
    const productHeading = this.page.getByRole('heading', { name: productName, exact: true });
    await expect(productHeading.getByRole('link', { name: productName, exact: true })).toBeVisible();
    return true;
  }

  /**
   * Opens the exact matching product from search results.
   * @param productName - Product name to open
   */
  async openProduct(productName: string): Promise<void> {
    const productHeading = this.page.getByRole('heading', { name: productName, exact: true });
    await productHeading.getByRole('link', { name: productName, exact: true }).click();
  }
}
