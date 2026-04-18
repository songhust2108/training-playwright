import { test } from "@fixtures/base-fixture";
import subscriptionData from "@data/testdata/subscription.json";
import { NAVIGATION } from "@data/constants/navigation.const";

test.describe("Email Subscription", () => {
    test.beforeEach(async ({ common, home }) => {
        await test.step("Open the Automation Exercise home page.", async () => {
            const { navigation } = common;
            await navigation.visit();
            await home.verifyHomePage();
        });
    });

    test("TC010 - Verify Subscription in homepage", async ({ home }) => {
        await test.step("Scroll to footer and verify Subscription block.", async () => {
            await home.subscription.getDivFooter().scrollIntoViewIfNeeded();
            await home.subscription.verifySubcriptionHeader();
        });

        await test.step("Submit subscription email and verify success message.", async () => {
            const email = subscriptionData.TC010.subscriptionEmail;
            await home.subscription.fillSubscriptionEmail(email);
            await home.subscription.clickSubmitBtn();
            await home.subscription.verifySuccessSubscribedTxt();
        });
    });

    test("TC011 - Verify Subscription in cart page", async ({ home }) => {
        await test.step("Open Cart, scroll to footer, verify Subscription block.", async () => {
            await home.navigation.clickMenuItem(NAVIGATION.MENU.CART);
            await home.subscription.getDivFooter().scrollIntoViewIfNeeded();
            await home.subscription.verifySubcriptionHeader();
        });

        await test.step("Submit subscription email and verify success message.", async () => {
            const email = subscriptionData.TC011.subscriptionEmail;
            await home.subscription.fillSubscriptionEmail(email);
            await home.subscription.clickSubmitBtn();
            await home.subscription.verifySuccessSubscribedTxt();
        });
    });
});
