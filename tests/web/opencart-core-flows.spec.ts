/**
 * Test Cases: OpenCart registration, login, search, and add-to-cart flows
 *
 * Tags: @master @sanity @regression @web
 */
import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('Customer registration flow @master @sanity @regression @web', async ({
  homePage,
  registrationPage,
  accountPage,
}) => {
  const customer = {
    firstName: RandomDataUtil.getFirstName(),
    lastName: RandomDataUtil.getLastName(),
    email: `register-${Date.now()}-${RandomDataUtil.getEmail().replace(/[^a-zA-Z0-9]/g, '')}@example.com`,
    telephone: RandomDataUtil.getPhoneNumber(),
    password: RandomDataUtil.getPassword(16),
  };

  await test.step('1) Open the storefront and navigate to registration', async () => {
    expect(await homePage.isHomePageExists()).toBeTruthy();
    await homePage.goToRegister();
    expect(await registrationPage.isRegistrationPageExists()).toBeTruthy();
  });

  await test.step('2) Submit a uniquely generated customer registration', async () => {
    await registrationPage.register(customer);
    expect(await registrationPage.isAccountCreated()).toBeTruthy();
  });

  await test.step('3) Verify the new customer can access the account area', async () => {
    await registrationPage.continueToAccount();
    expect(await accountPage.isAccountPageExists()).toBeTruthy();
    expect(await accountPage.isLogoutAvailable()).toBeTruthy();
  });

  console.log('✅ Customer registration flow completed successfully.');
});

test('Valid customer login flow @master @sanity @regression @web', async ({
  homePage,
  loginPage,
  accountPage,
}) => {
  const email = process.env.APP_EMAIL;
  const password = process.env.APP_PASSWORD;

  if (!email || !password) {
    throw new Error('APP_EMAIL and APP_PASSWORD must be configured for the valid login test.');
  }

  await test.step('1) Open the storefront and navigate to login', async () => {
    expect(await homePage.isHomePageExists()).toBeTruthy();
    await homePage.goToLogin();
    expect(await loginPage.isLoginPageExists()).toBeTruthy();
  });

  await test.step('2) Authenticate with configured customer credentials', async () => {
    await loginPage.login(email, password);
    expect(await accountPage.isAccountPageExists()).toBeTruthy();
    expect(await accountPage.isLogoutAvailable()).toBeTruthy();
  });

  console.log('✅ Valid customer login flow completed successfully.');
});

test('Valid customer login flow with helper calss data @master @sanity @regression @web', async ({
  homePage,
  loginPage,
  accountPage,
}) => {
  const { email, password } = Helper.getLoginDetails();

  await test.step('1) Open the storefront and navigate to login', async () => {
    expect(await homePage.isHomePageExists()).toBeTruthy();
    await homePage.goToLogin();
    expect(await loginPage.isLoginPageExists()).toBeTruthy();
  });

  await test.step('2) Authenticate with configured customer credentials', async () => {
    await loginPage.login(email, password);
    expect(await accountPage.isAccountPageExists()).toBeTruthy();
    expect(await accountPage.isLogoutAvailable()).toBeTruthy();
  });

  console.log('✅ Valid customer login flow completed successfully.');
});

test('Invalid customer login flow @master @regression @web', async ({
  homePage,
  loginPage,
}) => {
  await test.step('1) Open the storefront and navigate to login', async () => {
    expect(await homePage.isHomePageExists()).toBeTruthy();
    await homePage.goToLogin();
    expect(await loginPage.isLoginPageExists()).toBeTruthy();
  });

  await test.step('2) Submit invalid customer credentials', async () => {
    await loginPage.login('not-a-customer@example.com', 'invalid-password');
    expect(await loginPage.isInvalidCredentialsWarningVisible()).toBeTruthy();
    expect(await homePage.isGuestAccountMenuAvailable()).toBeTruthy();
  });

  console.log('✅ Invalid customer login was rejected as expected.');
});

test('Product search flow @master @sanity @regression @web', async ({
  homePage,
  searchResultsPage,
}) => {
  const { productName } = Helper.getProductDetails();

  await test.step('1) Search the catalog for the known product', async () => {
    expect(await homePage.isHomePageExists()).toBeTruthy();
    await homePage.searchForProduct(productName);
  });

  await test.step('2) Verify the result and exact product name', async () => {
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();
    expect(await searchResultsPage.isProductListed(productName)).toBeTruthy();
  });

  console.log('✅ Product search flow completed successfully.');
});

test('Add product to cart @master @sanity @regression @web', async ({
  homePage,
  searchResultsPage,
  productPage,
  cartPage,
}) => {
  const product = Helper.getProductDetails();

  await test.step('1) Search for the known product and open its details', async () => {
    await homePage.searchForProduct(product.productName);
    expect(await searchResultsPage.isProductListed(product.productName)).toBeTruthy();
    await searchResultsPage.openProduct(product.productName);
    expect(await productPage.isProductPageExists(product.productName)).toBeTruthy();
  });

  await test.step('2) Add the requested quantity to the cart', async () => {
    await productPage.setQuantity(product.productQuantity);
    await productPage.addToCart();
    expect(await productPage.isAddedToCart()).toBeTruthy();
  });

  await test.step('3) Verify the selected product and quantity in the cart', async () => {
    await homePage.openShoppingCart();
    expect(await cartPage.isCartPageExists()).toBeTruthy();
    expect(await cartPage.isProductPresent(product.productName)).toBeTruthy();
    expect(await cartPage.getProductQuantity(product.productName)).toBe(product.productQuantity);
  });

  console.log('✅ Add product to cart flow completed successfully.');
});
