import { expect } from '@playwright/test';
import { HomePage } from '@pages/home.page';

/**
 * Action layer for the storefront home page: title checks and optional diagnostics on failure.
 */
export class HomeAction extends HomePage {
    /**
     * Verifies the Automation Exercise home page loaded by asserting the document title.
     * On failure, attaches plain-text context to the test report.
     */
    async verifyHomePage(): Promise<void> {
        await expect(
            this.page,
            'Home page title should be Automation Exercise',
        ).toHaveTitle('Automation Exercise');
    }
}
