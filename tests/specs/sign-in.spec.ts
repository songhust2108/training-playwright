/**
 * E2E: sign-in scenarios (success, failure, logout) against Automation Exercise.
 */
import { expect, test } from '@fixtures/base-fixture';
import signInData from '@data/testdata/sign-in.json';
import { NAVIGATION } from '@data/constants/navigation.const';
import { API_URL } from '@data/constants/api-url.const';
import { SignInInfo } from '@data/types/account.type';
import { cleanUpAccountCreated } from '@utils/account-cleanup';

test.describe('Sign in', () => {
    test.beforeEach(async ({ home }) => {
        await test.step('Access the system homepage.', async () => {
            await home.navigation.visit();
            await home.verifyHomePage();
        });
    });

    test.afterEach(async ({ common, signIn, accountDeleted, signupCtx }, testInfo) => {
        if (testInfo.status != testInfo.expectedStatus && !signupCtx.wasAccountDeleted() && signupCtx.email) {
            await cleanUpAccountCreated(common, signIn, accountDeleted, signupCtx.email, signupCtx.password);
        }
    });

    test('TC002: Login User with correct email and password', async ({ home, signIn, accountDeleted, request, signupCtx }) => {
        const tc002 = signInData.TC002;

        const checkUserExist = await test.step('Check user exist via API', async () => {
            const responseCheckUserExist = await request.post(API_URL.API_VERIFY_LOGIN, {
                form: {
                    email: tc002.signInInfo.email,
                    password: tc002.signInInfo.password
                }
            });
            const body = (await responseCheckUserExist.json()) as { responseCode?: number | string };
            return body.responseCode;
        });

        if (checkUserExist != '200') {
            const createAccountResponseCode = await test.step('Create account via API', async () => {
                const response = await request.post(API_URL.API_CREATE_ACCOUNT, {
                    form: tc002.signupInfo,
                });
                const body = (await response.json()) as { responseCode?: number | string };
                return body.responseCode;
            });

            expect(
                String(createAccountResponseCode),
                `createAccount API should return responseCode 201 (got ${String(createAccountResponseCode)})`,
            ).toBe('201');
            signupCtx.email = tc002.signInInfo.email;
            signupCtx.password = tc002.signInInfo.password;
        }

        await test.step('Open Signup / Login and verify login form', async () => {
            await home.navigation.clickMenuItem(NAVIGATION.MENU.SIGN_UP_LOGIN);
            await signIn.verifyLoginToYourAccountVisible();
        });

        await test.step('Sign in with valid credentials', async () => {
            const signInInfo: SignInInfo = tc002.signInInfo;
            await signIn.executeSignIn(signInInfo);
            await home.verifyLoggedInAsText(tc002.username);
        });

        await test.step('Delete account and verify confirmation', async () => {
            await home.navigation.clickMenuItem(NAVIGATION.MENU.DELETE_ACCOUNT);
            await accountDeleted.verifyAccountDeletedVisible();
            signupCtx.markAccountDeleted();
        });
    });

    test('TC003: Login User with incorrect email and password', async ({ home, signIn }) => {
        await test.step('Access Loggin Page And Verify', async () => {
            await home.navigation.clickMenuItem(NAVIGATION.MENU.SIGN_UP_LOGIN);
            await signIn.verifyLoginToYourAccountVisible();
        });

        await test.step('Enter email and password', async () => {
            const dtSignIn = signInData.TC003;
            const signInInfo: SignInInfo = dtSignIn.signInInfo;
            await signIn.executeSignIn(signInInfo);
            await signIn.verifyLoginFailMessageVisible();
        });
    });

    test('TC004: Logout User', async ({ home, signIn }) => {
        await test.step('Access Loggin Page And Verify', async () => {
            await home.navigation.clickMenuItem(NAVIGATION.MENU.SIGN_UP_LOGIN);
            await signIn.verifyLoginToYourAccountVisible();
        });

        await test.step('Enter email and password', async () => {
            const dtSignIn = signInData.TC004;
            const signInInfo: SignInInfo = dtSignIn.signInInfo;
            await signIn.executeSignIn(signInInfo);
            await home.verifyLoggedInAsText(dtSignIn.username);
        });

        await test.step('Logout user', async () => {
            await home.navigation.clickMenuItem(NAVIGATION.MENU.LOGOUT);
            await signIn.verifyLoginToYourAccountVisible();
        });

    });
});