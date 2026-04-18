import { Page, Locator } from "@playwright/test";
import { CommonPage } from "./common.page";

/**
 * Page object for the post-registration "ACCOUNT CREATED!" confirmation screen.
 */
export class AccountCreatedPage extends CommonPage {
    private readonly txtAccountCreated: Locator;
    private readonly btnContinue: Locator;

    /**
     * @param page Page showing the account created confirmation.
     */
    constructor(page: Page) {
        super(page);
        this.txtAccountCreated = page.locator('b:has-text("ACCOUNT CREATED!")');
        this.btnContinue = page.getByRole('link', { name: 'Continue' });
    }

    /**
     * @returns Locator for the bold "ACCOUNT CREATED!" message.
     */
    getTxtAccountCreated(): Locator {
        return this.txtAccountCreated;
    }

    /**
     * Navigates forward via the primary Continue control.
     */
    async clickContinueBtn(): Promise<void> {
        await this.btnContinue.click();
    }
}