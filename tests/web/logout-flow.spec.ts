/**
 * Test Case: Customer logout
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Open the storefront and log in with configured customer credentials
 * 2) Verify authentication and log out
 * 3) Verify the logout confirmation, continue to the homepage, and check guest navigation
 */
import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Customer logout flow @master @sanity @regression @web', async ({
  homePage,
  loginPage,
  accountPage,
  logoutPage,
}) => {
  const { email, password } = Helper.getLoginDetails();

  await test.step('1) Open the storefront and log in', async () => {
    expect(await homePage.isHomePageExists()).toBeTruthy();
    await homePage.goToLogin();
    expect(await loginPage.isLoginPageExists()).toBeTruthy();
    await loginPage.login(email, password);
  });

  await test.step('2) Verify authentication and open the account logout option', async () => {
    expect(await accountPage.isAccountPageExists()).toBeTruthy();
    expect(await accountPage.isLogoutAvailable()).toBeTruthy();
    await accountPage.logout();
  });

  await test.step('3) Verify logout confirmation and continue to the homepage', async () => {
    expect(await logoutPage.isLogoutPageExists()).toBeTruthy();
    await logoutPage.continueToStore();
    expect(await homePage.isHomePageExists()).toBeTruthy();
  });

  await test.step('4) Verify authenticated account options are no longer available', async () => {
    expect(await homePage.isGuestAccountMenuAvailable()).toBeTruthy();
  });

  console.log('✅ Customer logout flow completed successfully.');
});
