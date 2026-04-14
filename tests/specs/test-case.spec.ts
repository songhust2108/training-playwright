import { test } from "@fixtures/base-fixture";
import { NAVIGATION } from "@data/constants/navigation.const";

test.describe("Test Case Page", () => {
    test.beforeEach(async ({ common, home }) => {
        await test.step("Open the Automation Exercise home page.", async () => {
            const { navigation } = common;
            await navigation.visit();
            await home.verifyHomePage();
        });
    });

    test("TC007 - Verify Test Case Page", async ({ home, testCase }) => {
        await test.step("Open Test Cases from the header and verify the page title.", async () => {
            await home.navigation.clickMenuItem(NAVIGATION.MENU.TEST_CASE);
            await testCase.verifyTestCaseTextVisible();
        });
    });
});
