import { expect } from '@playwright/test';
import { SignInPage } from '@pages/sign-in.page';
import { SignupInfo, SignInInfo } from '@data/types/account.type';

/**
 * Action layer for the Signup / Login page: assertions and composing the new-user signup flow.
 * @see SignInPage
 */
export class SignInAction extends SignInPage {
    /**
     * Asserts the "New User Signup!" heading is visible before entering registration data.
     * On failure, attaches plain-text context to the test report.
     */
    async verifyNewUserSignupVisible(): Promise<void> {
        await expect(
            this.getNewUserSignupText(),
            '"New User Signup!" heading should be visible',
        ).toBeVisible();
    }

    /**
     * Asserts the "Email Address already exist!" heading is visible before entering registration data.
     * On failure, attaches plain-text context to the test report.
     */
    async verifyEmailAddressAlreadyExistVisible(): Promise<void> {
        await expect(
            this.getLoginToYourAccountText(),
            '"Email Address already exist!" heading should be visible',
        ).toBeVisible();
    }

    /**
     * Asserts the "Login to your account" heading is visible on the auth page.
     * On failure, attaches plain-text context to the test report.
     */
    async verifyLoginToYourAccountVisible(): Promise<void> {
        await expect(
            this.getLoginToYourAccountText(),
            '"Login to your account" heading should be visible',
        ).toBeVisible();
    }

    /**
     * Asserts the invalid-credentials error message is visible after a failed login attempt.
     * On failure, attaches plain-text context to the test report.
     */
    async verifyLoginFailMessageVisible(): Promise<void> {
        await expect(
            this.getLoginFailText(),
            '"Your email or password is incorrect!" should be visible',
        ).toBeVisible();
    }

    /**
     * Performs login: email, password, then Login click.
     * @param data Credentials from test data (`SignInInfo`).
     */
    async executeSignIn(data: SignInInfo): Promise<void> {
        await this.fillSignInEmail(data.email);
        await this.fillSignInPassword(data.password);
        await this.clickSigninBtn();
    }

    /**
     * Fills name and email on the new-user signup block, then clicks Signup.
     * @param data Signup name and email from test data.
     */
    async executeNewUserSignUp(data: SignupInfo): Promise<void> {
        await this.fillSignupName(data.name);
        await this.fillSignupEmail(data.email);
        await this.clickSignupBtn();
    }
}