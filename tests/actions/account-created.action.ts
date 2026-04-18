import { expect } from '@playwright/test';
import { AccountCreatedPage } from '@pages/account-created.page';

/**
 * Action layer after successful registration: visibility checks on {@link AccountCreatedPage}.
 * Assertions (`expect`) live here per project convention — not in page objects.
 */
export class AccountCreatedAction extends AccountCreatedPage {
    /**
     * Verifies the "Account Created!" text is shown.
     * On failure, attaches plain-text context to the test report for debugging.
     */
    async verifyAccountCreatedVisible(): Promise<void> {
        await expect(
            this.getTxtAccountCreated(),
            '"ACCOUNT CREATED!" message should be visible',
        ).toBeVisible();
    }
}