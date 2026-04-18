import { NAVIGATION } from '@data/constants/navigation.const';
import { CommonPage } from '@pages/common.page';
import { SignInAction } from '@actions/sign-in.action';
import { AccountDeletedAction } from '@actions/account-deleted.action';

/**
 * Ensures a test account is removed from the app by driving the delete-account flow.
 * Navigates home, signs in when "Delete account" is not yet available, then opens delete
 * account and confirms continuation when the menu entry is present.
 *
 * No-op when `email` is empty.
 *
 * @param common - Shared page with navigation
 * @param signIn - Action used to sign in when delete-account is hidden behind auth
 * @param accountDeleted - Action for the post-delete confirmation step
 * @param email - Account email (required for sign-in path)
 * @param password - Account password for sign-in when needed
 */
export async function cleanUpAccountCreated(
    common: CommonPage,
    signIn: SignInAction,
    accountDeleted: AccountDeletedAction,
    email: string,
    password: string
): Promise<void> {
    if (!email) return;
    console.log(`Cleaning up fail account: ${email}`);
    const { navigation } = common;
    await navigation.visit();
    if (!(await navigation.isMenuItemVisible(NAVIGATION.MENU.DELETE_ACCOUNT))) {
        await navigation.clickMenuItem(NAVIGATION.MENU.SIGN_UP_LOGIN);
        await signIn.executeSignIn({
            email: email,
            password: password
        });
    }

    if (await navigation.isMenuItemVisible(NAVIGATION.MENU.DELETE_ACCOUNT)) {
        await navigation.clickMenuItem(NAVIGATION.MENU.DELETE_ACCOUNT);
        await accountDeleted.clickContinueBtn();
    }
}
