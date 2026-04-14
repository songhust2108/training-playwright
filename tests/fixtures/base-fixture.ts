/**
 * Custom Playwright test fixture wiring: injects page objects/actions used across specs.
 */
import { test as base } from '@playwright/test';
import { SignInAction } from '@actions/sign-in.action';
import { SignUpAction } from '@actions/sign-up.action';
import { CommonPage } from '@pages/common.page';
import { HomeAction } from '@actions/home.action';
import { AccountCreatedAction } from '@actions/account-created.action';
import { AccountDeletedAction } from '@actions/account-deleted.action';
import { ContactUsAction } from '@actions/contact-us.action';
import { TestCaseAction } from '@actions/test-case.action';
import { ProductListAction } from '@actions/product-list.action';
import { ProductDetailAction } from '@actions/product-detail.action';
import { CartAction } from '@actions/cart.action';

type SignupTestContext = {
  email: string;
  password: string;
  markAccountDeleted: () => void;
  wasAccountDeleted: () => boolean;
};

/** Extended fixture map: each key is available in `test` callback destructuring. */
type MyFixtures = {
  home: HomeAction;
  common: CommonPage;
  signIn: SignInAction;
  signUp: SignUpAction;
  accountCreated: AccountCreatedAction;
  accountDeleted: AccountDeletedAction;
  contactUs: ContactUsAction;
  signupCtx: SignupTestContext;
  testCase: TestCaseAction;
  productList: ProductListAction;
  productDetail: ProductDetailAction;
  cart: CartAction
};

export const test = base.extend<MyFixtures>({
  common: async ({ page }, use) => {
    const commonPage = new CommonPage(page);
    await use(commonPage);
  },

  home: async ({ page }, use) => {
    const homePage = new HomeAction(page);
    await use(homePage);
  },

  signIn: async ({ page }, use) => {
    const signInPage = new SignInAction(page);
    await use(signInPage);
  },

  signUp: async ({ page }, use) => {
    const signUpPage = new SignUpAction(page);
    await use(signUpPage);
  },

  accountCreated: async ({ page }, use) => {
    const accountCreatedPage = new AccountCreatedAction(page);
    await use(accountCreatedPage);
  },

  accountDeleted: async ({ page }, use) => {
    const accountDeletedPage = new AccountDeletedAction(page);
    await use(accountDeletedPage);
  },

  contactUs: async ({ page }, use) => {
    const contactUsPage = new ContactUsAction(page);
    await use(contactUsPage);
  },

  signupCtx: async ({ }, use) => {
    let deleted = false;
    const markAccountDeleted = () => {
      deleted = true;
    };
    const wasAccountDeleted = () => deleted;
    await use({
      email: '',
      password: '',
      markAccountDeleted,
      wasAccountDeleted,
    });
  },

  testCase: async ({ page }, use) => {
    const testCasePage = new TestCaseAction(page);
    await use(testCasePage);
  },
  
  productList: async ({ page }, use) => {
    const productList = new ProductListAction(page);
    await use(productList);
  },

  productDetail: async({page}, use) => {
    const productDetail = new ProductDetailAction(page);
    await use(productDetail);
  },

  cart: async({page}, use) => {
    const cart = new CartAction(page);
    await use(cart);
  }
});

export { expect } from '@playwright/test';