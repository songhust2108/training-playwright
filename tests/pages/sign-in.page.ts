import { Page, Locator } from "@playwright/test";
import { CommonPage } from "@pages/common.page";

/**
 * Page object for Automation Exercise "Signup / Login": sign-in form and new-user signup block.
 * Contains only locators and low-level interactions (no assertions).
 */
export class SignInPage extends CommonPage {
    // Sign In section
    private readonly txtLoginToYourAccount: Locator;
    private readonly textLoginFail: Locator;
    private readonly iptEmailLogin: Locator;
    private readonly iptPassword: Locator;
    private readonly btnLogin: Locator;

    // Sign up section
    private readonly txtNewUserSignUp: Locator;
    private readonly iptNameSignup: Locator;
    private readonly iptEmailSignUp: Locator;
    private readonly btnSignUp: Locator;

    /**
     * Wires locators for login and registration entry on the combined auth page.
     * @param page Playwright page opened on Signup / Login.
     */
    constructor(page: Page) {
        super(page);
        this.txtLoginToYourAccount = page.getByRole('heading', { name: 'Login to your account' });
        this.textLoginFail = page.getByText('Your email or password is incorrect!', { exact: true });
        this.iptEmailLogin = page.locator("input[data-qa='login-email']");
        this.iptPassword = page.getByRole('textbox', { name: 'Password' });
        this.btnLogin = page.getByRole('button', { name: 'Login' });

        this.txtNewUserSignUp = page.getByRole('heading', { name: 'New User Signup!' });
        this.iptNameSignup = page.getByRole('textbox', { name: 'Name' });
        this.iptEmailSignUp = page.locator("input[data-qa='signup-email']");
        this.btnSignUp = page.getByRole('button', { name: 'Signup' });
    }

    /**
     * @returns Locator for the "New User Signup!" section heading.
     */
    getNewUserSignupText(): Locator {
        return this.txtNewUserSignUp;
    }

    /**
     * @returns Locator for the "Login to your account" heading (and related login-area messaging).
     */
    getLoginToYourAccountText(): Locator {
        return this.txtLoginToYourAccount;
    }

    /**
     * @returns Locator for the invalid-credentials error line on failed login.
     */
    getLoginFailText(): Locator {
        return this.textLoginFail;
    }

    /**
     * @param name Display name for the new-user signup form.
     */
    async fillSignupName(name: string): Promise<void> {
        await this.iptNameSignup.fill(name);
    }

    /**
     * @param email Email address for the new-user signup form.
     */
    async fillSignupEmail(email: string): Promise<void> {
        await this.iptEmailSignUp.fill(email);
    }

    /**
     * Clicks the Signup button to submit name/email and proceed to account details.
     */
    async clickSignupBtn(): Promise<void> {
        await this.btnSignUp.click();
    }

    /**
     * @param email Email for the Login to your account form (`data-qa='login-email'`).
     */
    async fillSignInEmail(email: string): Promise<void> {
        await this.iptEmailLogin.fill(email);
    }

    /**
     * @param password Password for the Login to your account form.
     */
    async fillSignInPassword(password: string): Promise<void> {
        await this.iptPassword.fill(password);
    }

    /**
     * Clicks the Login button on the sign-in form.
     */
    async clickSigninBtn(): Promise<void> {
        await this.btnLogin.click();
    }
}