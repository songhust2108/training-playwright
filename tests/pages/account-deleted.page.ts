import { Page, Locator } from "@playwright/test";
import { CommonPage } from "./common.page";

/**
 * Page object for the "ACCOUNT DELETED!" confirmation screen after account removal.
 */
export class AccountDeletePage extends CommonPage {
    private readonly txtAccountDeleted: Locator;
    private readonly btnContinue: Locator;

    /**
     * @param page Page showing the account deleted confirmation.
     */
    constructor(page: Page) {
        super(page);
        this.txtAccountDeleted = page.locator('b:has-text("ACCOUNT DELETED!")');
        this.btnContinue = page.getByRole('link', { name: 'Continue' });
    }

    /**
     * @returns Locator for the bold "ACCOUNT DELETED!" message.
     */
    getTxtAccountDeleted(): Locator {
        return this.txtAccountDeleted;
    }

    /**
     * Navigates forward via the primary Continue control.
     */
    async clickContinueBtn(): Promise<void> {
        await this.btnContinue.click();
    }
}