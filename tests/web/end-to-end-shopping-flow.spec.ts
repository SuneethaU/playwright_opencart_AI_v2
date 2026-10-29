/**
 * Test Case: Complete customer shopping journey
 *
 * Tags: @master @sanity @regression @web @end-to-end
 *
 * Steps:
 * 1) Open the storefront and register a unique customer
 * 2) Verify registration, log out, and log in with the new account
 * 3) Search for MacBook and open its product details
 * 4) Add the requested quantity to the cart
 * 5) Verify the cart product, quantity, price, and grand total
 */
import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('Complete customer shopping journey @master @sanity @regression @web @end-to-end', async ({
  homePage,
  registrationPage,
  loginPage,
  accountPage,
  logoutPage,
  searchResultsPage,
  productPage,
  cartPage,
  page,
}) => {
  test.setTimeout(60_000);

  const product = Helper.getProductDetails();
  const customer = {
    firstName: RandomDataUtil.getFirstName(),
    lastName: RandomDataUtil.getLastName(),
    email: `e2e-${Date.now()}-${RandomDataUtil.getEmail().replace(/[^a-zA-Z0-9]/g, '')}@example.com`,
    telephone: RandomDataUtil.getPhoneNumber(),
    password: RandomDataUtil.getPassword(16),
  };
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await test.step('1) Open the storefront', async () => {
    expect(await homePage.isHomePageExists()).toBeTruthy();
  });

  await test.step('2) Register a new customer with unique data', async () => {
    await homePage.goToRegister();
    expect(await registrationPage.isRegistrationPageExists()).toBeTruthy();
    await registrationPage.register(customer);
    expect(await registrationPage.isAccountCreated()).toBeTruthy();
  });

  await test.step('3) Continue to the account area and verify registration', async () => {
    await registrationPage.continueToAccount();
    expect(await accountPage.isAccountPageExists()).toBeTruthy();
    expect(await accountPage.isLogoutAvailable()).toBeTruthy();
  });

  await test.step('4) Log out of the newly created account', async () => {
    await accountPage.logout();
    expect(await logoutPage.isLogoutPageExists()).toBeTruthy();
    await logoutPage.continueToStore();
    expect(await homePage.isHomePageExists()).toBeTruthy();
  });

  await test.step('5) Log in again with the new customer credentials', async () => {
    await homePage.goToLogin();
    expect(await loginPage.isLoginPageExists()).toBeTruthy();
    await loginPage.login(customer.email, customer.password);
    expect(await accountPage.isAccountPageExists()).toBeTruthy();
  });

  await test.step('6) Search for the known product', async () => {
    await homePage.searchForProduct(product.productName);
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();
    expect(await searchResultsPage.isProductListed(product.productName)).toBeTruthy();
  });

  await test.step('7) Open the product details and verify the price', async () => {
    await searchResultsPage.openProduct(product.productName);
    expect(await productPage.isProductPageExists(product.productName)).toBeTruthy();
    expect(await productPage.isPriceDisplayed(product.totalPrice)).toBeTruthy();
  });

  await test.step('8) Add the requested quantity to the cart', async () => {
    await productPage.setQuantity(product.productQuantity);
    await productPage.addToCart();
    expect(await productPage.isAddedToCart()).toBeTruthy();
  });

  await test.step('9) Open the shopping cart and verify the selected product', async () => {
    await homePage.openShoppingCart();
    expect(await cartPage.isCartPageExists()).toBeTruthy();
    expect(await cartPage.isProductPresent(product.productName)).toBeTruthy();
  });

  await test.step('10) Verify the cart quantity, price, and total', async () => {
    expect(await cartPage.getProductQuantity(product.productName)).toBe(product.productQuantity);
    expect(await cartPage.getProductPrice(product.productName)).toBe(product.totalPrice);
    expect(await cartPage.getCartTotal()).toBe(product.totalPrice);
  });

  await test.step('11) Confirm the journey finished without browser errors', async () => {
    expect(pageErrors).toEqual([]);
  });

  console.log('✅ Complete customer shopping journey finished successfully.');
});
