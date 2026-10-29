import dotenv from 'dotenv';
import { test as base } from '@playwright/test';
import { AccountPage } from '../pages/AccountPage';
import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { ProductPage } from '../pages/ProductPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

dotenv.config();

type PageFixtures = {
  homePage: HomePage;
  registrationPage: RegistrationPage;
  loginPage: LoginPage;
  accountPage: AccountPage;
  logoutPage: LogoutPage;
  searchResultsPage: SearchResultsPage;
  productPage: ProductPage;
  cartPage: CartPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    const appUrl = process.env.WEB_APP_URL;
    if (!appUrl) {
      throw new Error('WEB_APP_URL must be configured before running web tests.');
    }

    await page.goto(appUrl);
    await use(new HomePage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  logoutPage: async ({ page }, use) => {
    await use(new LogoutPage(page));
  },
  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

test.afterEach(async ({ page, context }) => {
  if (!page.isClosed()) {
    await page.close();
  }
  await context.close();
});

export { expect } from '@playwright/test';
