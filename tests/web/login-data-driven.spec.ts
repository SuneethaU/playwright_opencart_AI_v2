/**
 * Test Case: Data-driven customer login
 *
 * Tags: @master @regression @web @datadriven
 */
import path from 'node:path';
import { test, expect } from '../../fixtures/pageFixtures';
import { AccountPage } from '../../pages/AccountPage';
import { DataProvider } from '../../utils/DataReader';

interface LoginTestData {
  testName: string;
  email: string;
  password: string;
  expected: 'success' | 'failure';
}

const loginCases = DataProvider.readJson(
  path.resolve(process.cwd(), 'testdata/opencart_logindata.json'),
) as LoginTestData[];

test.describe.configure({ timeout: 60_000 });

for (const [index, loginCase] of loginCases.entries()) {
  test(`${loginCase.testName} - row ${index + 1} @master @regression @web @datadriven`, async ({
    homePage,
    loginPage,
    accountPage,
  }) => {
    await test.step('1) Open the storefront login page', async () => {
      expect(await homePage.isHomePageExists()).toBeTruthy();
      await homePage.goToLogin();
      expect(await loginPage.isLoginPageExists()).toBeTruthy();
    });

    await test.step('2) Submit the row credentials without replacing blank values', async () => {
      await loginPage.login(loginCase.email.trim(), loginCase.password.trim());
    });

    await test.step('3) Verify the actual result against the data row expectation', async () => {
      if (loginCase.expected === 'success') {
        expect(await accountPage.isAccountPageExists()).toBeTruthy();
      } else {
        expect(await loginPage.isLoginFailureWarningVisible()).toBeTruthy();
        expect(await homePage.isGuestAccountMenuAvailable()).toBeTruthy();
      }
    });

    console.log(`✅ Data-driven login row ${index + 1} matched its expected result.`);
  });
}
