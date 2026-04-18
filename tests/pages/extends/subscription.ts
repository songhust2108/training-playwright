import { expect, Locator, Page } from "@playwright/test";

/**
 * Top navigation helper: visit URLs and click header menu links by visible name.
 */
export class Subscription {
    private readonly page: Page;
    private readonly iptSubscriptionEmail: Locator;
    private readonly txtSubscriptionSuccess: Locator;
    private readonly txtSubscriptionHeader: Locator;
    private readonly divFooter: Locator;
    private readonly btnSubmit: Locator;

    /**
     * Initializes the Subscription helper.
     * 
     * @param page - Page object
     */
    constructor(page: Page) {
        this.page = page;
        this.iptSubscriptionEmail = page.getByRole('textbox', { name: 'Your email address' });
        this.txtSubscriptionSuccess = page.getByText('You have been successfully subscribed!', { exact: true });
        this.txtSubscriptionHeader = page.getByRole('heading', { name: 'Subscription' });
        this.divFooter = page.locator('#footer');
        this.btnSubmit = page.locator('#subscribe');
    }

    /**
     * Get div footer locator for chaining or assertions.
     *
     * @returns Locator
     */
    getDivFooter() {
        return this.divFooter;
    }

    /**
     * Enters an email into the footer subscription field.
     *
     * @param email - Address to subscribe with
     */
    async fillSubscriptionEmail(email: string) {
        await this.iptSubscriptionEmail.fill(email);
    }

    /**
     * Exposes the "successfully subscribed" message locator for chaining or assertions.
     *
     * @returns Locator for the post-submit confirmation text
     */
    getTxtSubscriptionSuccess() {
        return this.txtSubscriptionSuccess;
    }

    /**
     * Submits the subscription form (Subscribe button).
     */
    async clickSubmitBtn() {
        await this.btnSubmit.click();
    }

    /**
     * Asserts the success message is visible after subscribing.
     */
    async verifySuccessSubscribedTxt() {
        await expect(
            this.getTxtSubscriptionSuccess()
        ).toBeVisible();
    }

    /**
     * Asserts the "Subscription" section heading is visible.
     */
    async verifySubcriptionHeader() {
        await expect(
            this.txtSubscriptionHeader
        ).toBeVisible();
    }
}
