import { expect, Locator, Page } from "@playwright/test";

/**
 * Top navigation helper: visit URLs and click header menu links by visible name.
 */
export class Subscription {
    private readonly page: Page;
    private iptSubscriptionEmail: Locator;
    private txtSubscriptionSuccess: Locator;
    private txtSubscriptionHeader: Locator;
    private btnSubmit: Locator;

    /**
     * Initializes the Navigation helper.
     * 
     * @param page - Page object
     */
    constructor(page: Page) {
        this.page = page;
        this.iptSubscriptionEmail = page.getByRole('textbox', { name: 'Your email address' });
        this.txtSubscriptionSuccess = page.getByText('You have been successfully subscribed!', { exact: true });
        this.txtSubscriptionHeader = page.getByRole('heading', { name: 'Subscription' });
        this.btnSubmit = page.locator('#subscribe');
    }

    async fillSubscriptionEmail(email: string) {
        await this.iptSubscriptionEmail.fill(email);
    }

    getTxtSubscriptionSuccess() {
        return this.txtSubscriptionSuccess;
    }

    async clickSubmitBtn() {
        await this.btnSubmit.click();
    }

    async verifySuccessSubscribedTxt() {
        await expect(
            this.getTxtSubscriptionSuccess()
        ).toBeVisible();
    }

    async verifySubcriptionHeader() {
        await expect(
            this.txtSubscriptionHeader
        ).toBeVisible();
    }
}
