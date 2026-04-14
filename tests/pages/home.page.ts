import { CommonPage } from '@pages/common.page';
import { expect, Locator } from "@playwright/test";

/**
 * Home / landing page: exposes post-login banner text for session assertions.
 */
export class HomePage extends CommonPage {
    /**
     * Resolves the "Logged in as {username}" banner for visibility checks in specs or actions.
     * @param username Account name shown after the "Logged in as" prefix.
     * @returns Locator targeting the full banner text.
     */
    async getLoggedInAsField(username: string): Promise<Locator> {
        return this.getTxtLoggedInAs(username);
    }

    /**
     * @param username Substring used to build the "Logged in as …" heading copy.
     */
    private getTxtLoggedInAs(username: string): Locator {
        return this.page.getByText(`Logged in as ${username}`);
    }

    /**
     * Asserts the session banner shows "Logged in as {username}" (wrapper without try/attach; use in Action if needed).
     * @param username Display name expected in the logged-in banner.
     */
    async verifyLoggedInAsText(username: string): Promise<void> {
        await expect(
            await this.getLoggedInAsField(username),
            `Logged in as ${username} message should be visible`,
        ).toBeVisible();
    }
}
