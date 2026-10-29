import { expect, Locator, Page } from '@playwright/test';

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
}

export class RegistrationPage {
  private readonly page: Page;

  // Locators
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly telephoneInput: Locator;
  private readonly passwordInput: Locator;
  private readonly passwordConfirmInput: Locator;
  private readonly privacyPolicyCheckbox: Locator;
  private readonly submitButton: Locator;
  private readonly continueLink: Locator;
  private readonly registrationHeading: Locator;
  private readonly accountCreatedHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.emailInput = page.getByPlaceholder('E-Mail');
    this.telephoneInput = page.getByPlaceholder('Telephone');
    this.passwordInput = page.getByPlaceholder('Password', { exact: true });
    this.passwordConfirmInput = page.getByPlaceholder('Password Confirm');
    this.privacyPolicyCheckbox = page.getByRole('checkbox');
    this.submitButton = page.getByRole('button', { name: 'Continue', exact: true });
    this.continueLink = page.getByRole('link', { name: 'Continue', exact: true });
    this.registrationHeading = page.getByRole('heading', { name: 'Register Account', exact: true });
    this.accountCreatedHeading = page.getByRole('heading', {
      name: 'Your Account Has Been Created!',
      exact: true,
    });
  }

  /**
   * Checks that the registration form is displayed.
   * @returns Promise<boolean> - true when the registration heading is visible
   */
  async isRegistrationPageExists(): Promise<boolean> {
    await expect(this.registrationHeading).toBeVisible();
    return true;
  }

  /**
   * Completes and submits a new customer registration.
   * @param customer - Unique customer details for the new account
   */
  async register(customer: RegistrationData): Promise<void> {
    try {
      await this.firstNameInput.fill(customer.firstName);
      await this.lastNameInput.fill(customer.lastName);
      await this.emailInput.fill(customer.email);
      await this.telephoneInput.fill(customer.telephone);
      await this.passwordInput.fill(customer.password);
      await this.passwordConfirmInput.fill(customer.password);
      await this.privacyPolicyCheckbox.check();
      await this.submitButton.click();
    } catch (error) {
      console.error(`Customer registration failed: ${error}`);
      throw error;
    }
  }

  /**
   * Checks whether OpenCart displayed its account-created confirmation.
   * @returns Promise<boolean> - true when the confirmation heading is visible
   */
  async isAccountCreated(): Promise<boolean> {
    await expect(this.accountCreatedHeading).toBeVisible();
    return true;
  }

  /**
   * Continues from the account-created confirmation to the account area.
   */
  async continueToAccount(): Promise<void> {
    await this.continueLink.click();
  }
}
