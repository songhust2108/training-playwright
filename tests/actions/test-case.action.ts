import { expect } from "@fixtures/base-fixture";
import { TestCasePage } from "@pages/test-case.page";

/**
 * Action layer for the Test Cases page: composes {@link TestCasePage} steps and holds `expect` assertions.
 */
export class TestCaseAction extends TestCasePage {
    /**
     * Asserts the "TEST CASES" bold title on the Test Cases page is visible.
     */
    async verifyTestCaseTextVisible(): Promise<void> {
        await expect(
            this.getTestCaseTitleText(),
            '"TEST CASES" title should be visible',
        ).toBeVisible();
    }
}
