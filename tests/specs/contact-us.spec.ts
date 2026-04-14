/**
 * E2E: Contact Us flow (file upload, dialog, success message, return home).
 */
import { test } from '@fixtures/base-fixture';
import { NAVIGATION } from '@data/constants/navigation.const';
import contactUsData from '@data/testdata/contact-us.json';

test.describe('Contact us', () => {
    test.beforeEach(async ({ common, home }) => {
        await test.step('Access the system homepage.', async () => {
            const { navigation } = common;
            await navigation.visit();
            await home.verifyHomePage();
        });
    });

    test('TC006 - Contact Us Form', async ({ home, contactUs }) => {
        await test.step('Access contact us page.', async () => {
            await home.navigation.clickMenuItem(NAVIGATION.MENU.CONTACT_US);
            await contactUs.verifyGetInTouchTextVisible();
        });

        await test.step('Fill Contact Us Field and verify', async () => {
            const contactInfo = contactUsData.TC006.contactUsInfo;
            await contactUs.enterContactUsInformation(contactInfo);
            await contactUs.uploadFile(contactInfo);
            contactUs.confirmAlert();
            await contactUs.clickSubmitButton();
            await contactUs.verifyTextSuccessSubmitFormContactUsVisible();
        });

        await test.step('Click home button and verify', async () => {
            await home.navigation.visit();
            await home.verifyHomePage();
        });
    })
})