import { expect } from '@playwright/test';
import { AccountDeletePage } from '@pages/account-deleted.page';

/**
 * Action layer after account deletion: visibility checks on {@link AccountDeletePage}.
 * Assertions (`expect`) live here per project convention — not in page objects.
 */
export class AccountDeletedAction extends AccountDeletePage {
    /**
     * Verifies the "Account Deleted!" text is shown.
     * On failure, attaches plain-text context to the test report for debugging.
     */
    async verifyAccountDeletedVisible(): Promise<void> {
        await expect(
            this.getTxtAccountDeleted(),
            '"ACCOUNT DELETED!" message should be visible',
        ).toBeVisible();
    }
}