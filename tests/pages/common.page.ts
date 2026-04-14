import { Page } from '@playwright/test';
import { Navigation } from '@pages/extends/navigation';
import { Subscription } from '@pages/extends/subscription';

/**
 * Shared base page: holds the Playwright `Page` and top-level `Navigation` helper.
 */
export class CommonPage {
    readonly page: Page;
    readonly navigation: Navigation;
    readonly subscription: Subscription;

    /**
     * Initializes common page instances and helper components.
     * @param page - Playwright Page object
     */
    constructor(page: Page) {
        this.page = page;
        this.navigation = new Navigation(page);
        this.subscription = new Subscription(page);
    }
}
