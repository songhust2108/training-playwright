import { Page, Locator } from "@playwright/test";
import { CommonPage } from "@pages/common.page";

/**
 * Automation Exercise "Test Cases" page: bold "TEST CASES" title and related UI.
 * Contains only locators and low-level interactions (no assertions).
 */
export class TestCasePage extends CommonPage {
    private readonly txtTestCase: Locator;

    /**
     * Wires locators for the Test Cases screen.
     * @param page Playwright page opened on the Test Cases route.
     */
    constructor(page: Page) {
        super(page);
        this.txtTestCase = page.locator('b:has-text("TEST CASES")');
    }

    /**
     * @returns Locator for the bold "TEST CASES" label.
     */
    getTestCaseTitleText(): Locator {
        return this.txtTestCase;
    }
}
