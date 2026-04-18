/**
 * E2E: user registration (TC001) through Automation Exercise signup flow and teardown.
 */
import { test } from '@fixtures/base-fixture';
import { NAVIGATION } from '@data/constants/navigation.const';
import { SignupInfo, SignInInfo } from '@data/types/account.type';
import registerData from '@data/testdata/sign-up.json';
import { cleanUpAccountCreated } from '@utils/account-cleanup';

test.describe('Sign up', () => {
    test.beforeEach(async ({ common, home }) => {
        await test.step('Access the system homepage.', async () => {
            const { navigation } = common;
            await navigation.visit();
            await home.verifyHomePage();
        });
    });

    test.afterEach(async ({ common, signIn, accountDeleted, signupCtx }, testInfo) => {
        if (testInfo.status != testInfo.expectedStatus && !signupCtx.wasAccountDeleted() && signupCtx.email) {
            console.log(`Cleaning up fail account: ${signupCtx.email}`);
            await cleanUpAccountCreated(common, signIn, accountDeleted, signupCtx.email, signupCtx.password);
        }
    });

    test('TC001 - Register User', async ({ home, signIn, signUp, accountCreated, accountDeleted, signupCtx }) => {
        const td001 = registerData.TC001;
        await test.step('Navigate to the Signup / Login screen.', async () => {
            await home.navigation.clickMenuItem(NAVIGATION.MENU.SIGN_UP_LOGIN);
            await signIn.verifyNewUserSignupVisible();
        });

        const emailNewUser = `auto_${Date.now()}_${td001.signupInfo.email}`;
        signupCtx.email = emailNewUser;
        signupCtx.password = td001.accountInfo.password;
        await test.step('Enter name and email address.', async () => {
            const signupInfo: SignupInfo = {
                name: td001.signupInfo.name,
                email: signupCtx.email
            };
            await signIn.executeNewUserSignUp(signupInfo);
            await signUp.verifyAccountInformationVisible();
        });

        await test.step('Fill customer information', async () => {
            await signUp.executeSignup(td001.accountInfo, td001.addressInfo);
            await accountCreated.verifyAccountCreatedVisible();
        });

        await test.step('Click continue button and verify Logged in as username is visible', async () => {
            await accountCreated.clickContinueBtn();
            await home.verifyLoggedInAsText(td001.signupInfo.name);
        });

        await test.step('Click delete account button and verify account deleted ', async () => {
            await home.navigation.clickMenuItem(NAVIGATION.MENU.DELETE_ACCOUNT);
            await accountDeleted.verifyAccountDeletedVisible();
            await accountDeleted.clickContinueBtn();
            signupCtx.markAccountDeleted();
        });

        await test.step('Verify can not logged in account after deleted', async () => {
            let passwordNewUser = td001.accountInfo.password;
            await home.navigation.clickMenuItem(NAVIGATION.MENU.SIGN_UP_LOGIN);
            const signInInfo: SignInInfo = {
                email: emailNewUser,
                password: passwordNewUser
            }

            await signIn.executeSignIn(signInInfo);
            await signIn.verifyLoginFailMessageVisible();
        });
    });

    test('TC005 - Register User With Exist Email', async ({ home, signIn }) => {
        const td005 = registerData.TC005;
        await test.step('Navigate to the Signup / Login screen.', async () => {
            await home.navigation.clickMenuItem(NAVIGATION.MENU.SIGN_UP_LOGIN);
            await signIn.verifyNewUserSignupVisible();
        });

        await test.step('Enter email and name existed.', async () => {
            await signIn.executeNewUserSignUp(td005.signupInfo);
            await signIn.verifyEmailAddressAlreadyExistVisible();
        });
    });
});