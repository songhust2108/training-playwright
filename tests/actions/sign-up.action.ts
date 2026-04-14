import test, { expect } from '@playwright/test';
import { SignUpPage } from '@pages/sign-up.page';
import { AccountInfo, AddressInfo } from '@data/types/account.type';

/**
 * Action layer for signup: composes {@link SignUpPage} interactions into flows.
 * Assertions (`expect`) live here per project convention — not in page objects.
 */
export class SignUpAction extends SignUpPage {
    /**
     * Verifies the "Enter Account Information" step is shown.
     * On failure, attaches plain-text context to the test report for debugging.
     */
    async verifyAccountInformationVisible(): Promise<void> {
        await expect(
            this.getTxtSignupFormTitle(),
            '"Enter Account Information" heading should be visible',
        ).toBeVisible();
    }

    /**
     * Completes the account-information form: account data, marketing opt-ins, address, then submits.
     * @param accountInfo Title, password, and date of birth for the account block.
     * @param addressInfo Address and contact fields for the delivery section.
     */
    async executeSignup(accountInfo: AccountInfo, addressInfo: AddressInfo): Promise<void> {
        await this.fillAccountInfo(accountInfo);
        await this.selectSignupForNewsLetter();
        await this.selectReceiveSpecialOffer();
        await this.fillAddressInfo(addressInfo);
        await this.clickCreateAccountBtn();
    }

    /**
     * Fills the account block using structured test data (title, password, DOB).
     * @param accountInfo Values mapped to page-level fill/select methods.
     */
    async fillAccountInfo(accountInfo: AccountInfo): Promise<void> {
        await this.fillTitle(accountInfo.title);
        await this.fillPassword(accountInfo.password);
        await this.selectDob(accountInfo.dob.day, accountInfo.dob.month, accountInfo.dob.year);
    }

    /**
     * Fills the address block (name, company, lines, country, state, city, zip, mobile).
     * @param addressInfo Values mapped to the address section fields on the page.
     */
    async fillAddressInfo(addressInfo: AddressInfo): Promise<void> {
        await this.fillFirstName(addressInfo.firstName);
        await this.fillLastName(addressInfo.lastName);
        await this.fillCompany(addressInfo.company);
        await this.fillAddress(addressInfo.address);
        await this.fillAddress2(addressInfo.address2);
        await this.selectCountry(addressInfo.country);
        await this.fillState(addressInfo.state);
        await this.fillCity(addressInfo.city);
        await this.fillZipcode(addressInfo.zipcode);
        await this.fillMobileNumber(addressInfo.mobileNumber);
    }
}