import { Page, Locator } from "@playwright/test";
import { CommonPage } from "./common.page";

/**
 * Page object for the signup form step "Enter Account Information".
 * Holds locators and atomic interactions (fill, click, select); no business flows.
 */
export class SignUpPage extends CommonPage {
    private readonly txtSignupFormTitle: Locator;
    /** Account information block (title, password, DOB, newsletter/opt-in). */
    private readonly chkTitleMr: Locator;
    private readonly chkTitleMrs: Locator;
    private readonly iptName: Locator;
    private readonly iptEmail: Locator;
    private readonly iptPassword: Locator;
    private readonly cbxDayDob: Locator;
    private readonly cbxMonthDob: Locator;
    private readonly cbxYearDob: Locator;
    private readonly cbxSignUpNewsLetter: Locator;
    private readonly cbxReceiveOffer: Locator;

    /** Delivery / address block (name, company, address, country, etc.). */
    private readonly iptFirstName: Locator;
    private readonly iptLastName: Locator;
    private readonly iptCompany: Locator;
    private readonly iptAddress1: Locator;
    private readonly iptAddress2: Locator;
    private readonly cbxCountry: Locator;
    private readonly iptState: Locator;
    private readonly iptCity: Locator;
    private readonly iptZipcode: Locator;
    private readonly iptMobileNumber: Locator;

    private readonly btnCreateAccount: Locator;

    /**
     * Binds locators to the Playwright page for the signup account/address form.
     * @param page Page instance navigated to the "Enter Account Information" step.
     */
    constructor(page: Page) {
        super(page);
        this.txtSignupFormTitle = page.getByText('Enter Account Information');
        this.chkTitleMr = page.getByLabel('Mr.');
        this.chkTitleMrs = page.getByLabel('Mrs.');
        this.iptName = page.getByRole('textbox', { name: 'Name *' });
        this.iptEmail = page.getByRole('textbox', { name: 'Email *' });
        this.iptPassword = page.getByRole('textbox', { name: 'Password *' });
        this.cbxDayDob = page.locator('#days');
        this.cbxMonthDob = page.locator('#months');
        this.cbxYearDob = page.locator('#years');
        this.cbxSignUpNewsLetter = page.getByLabel('Sign up for our newsletter!');
        this.cbxReceiveOffer = page.getByLabel('Receive special offers from our partners!');

        this.iptFirstName = page.getByRole('textbox', { name: 'First name *' });
        this.iptLastName = page.getByRole('textbox', { name: 'Last name *' });
        this.iptCompany = page.getByLabel('Company', { exact: true });
        this.iptAddress1 = page.getByRole('textbox', {
            name: 'Address * (Street address, P.O. Box, Company name, etc.)'
        });
        this.iptAddress2 = page.getByRole('textbox', { name: 'Address 2' });
        this.cbxCountry = page.getByRole('combobox', { name: 'Country *' });
        this.iptState = page.getByRole('textbox', { name: 'State *' });
        this.iptCity = page.getByRole('textbox', { name: 'City *' });
        this.iptZipcode = page.locator('#zipcode');
        this.iptMobileNumber = page.getByRole('textbox', { name: 'Mobile Number *' });
        this.btnCreateAccount = page.getByRole('button', { name: 'Create Account' });
    }

    /**
     * Returns the title radio locator matching the visible label (e.g. "Mr.", "Mrs.").
     * @param title Accessible name/label of the title option.
     * @returns Locator for the matching radio control.
     */
    private chkTitleByType(title: string): Locator {
        return this.page.getByLabel(title);
    }

    /**
     * Exposes the "Enter Account Information" heading locator for assertions in the Action layer.
     * @returns Locator for the step title text.
     */
    getTxtSignupFormTitle(): Locator {
        return this.txtSignupFormTitle;
    }

    /**
     * Clicks the primary submit control to create the account.
     */
    async clickCreateAccountBtn(): Promise<void> {
        await this.btnCreateAccount.click();
    }

    // --- Account: title, password, DOB, marketing checkboxes ---

    /**
     * Selects the account title/gender radio by label.
     * @param title Visible label such as "Mr." or "Mrs.".
     */
    async fillTitle(title: string): Promise<void> {
        await this.chkTitleByType(title).click();
    }

    /**
     * Fills the Password field on this step (not the initial email signup form).
     * @param password Password value to enter.
     */
    async fillPassword(password: string): Promise<void> {
        await this.iptPassword.fill(password);
    }

    /**
     * Sets date of birth via the day/month/year dropdowns; values must match option labels or values in the DOM.
     * @param day Day option value or label for `#days`.
     * @param month Month option value or label for `#months`.
     * @param year Year option value or label for `#years`.
     */
    async selectDob(day: string, month: string, year: string): Promise<void> {
        await this.selectDobDay(day);
        await this.selectDobMonth(month);
        await this.selectDobYear(year);
    }

    /**
     * @param day Value or label accepted by the day dropdown.
     */
    async selectDobDay(day: string): Promise<void> {
        await this.cbxDayDob.selectOption(day);
    }

    /**
     * @param month Value or label accepted by the month dropdown.
     */
    async selectDobMonth(month: string): Promise<void> {
        await this.cbxMonthDob.selectOption(month);
    }

    /**
     * @param year Value or label accepted by the year dropdown.
     */
    async selectDobYear(year: string): Promise<void> {
        await this.cbxYearDob.selectOption(year);
    }

    /**
     * Checks the "Sign up for our newsletter!" checkbox.
     */
    async selectSignupForNewsLetter(): Promise<void> {
        await this.cbxSignUpNewsLetter.check();
    }

    /**
     * Checks the "Receive special offers from our partners!" checkbox.
     */
    async selectReceiveSpecialOffer(): Promise<void> {
        await this.cbxReceiveOffer.check();
    }

    // --- Address fields (delivery / registration address) ---

    /**
     * @param firstName First name for the address section.
     */
    async fillFirstName(firstName: string): Promise<void> {
        await this.iptFirstName.fill(firstName);
    }

    /**
     * @param lastName Last name for the address section.
     */
    async fillLastName(lastName: string): Promise<void> {
        await this.iptLastName.fill(lastName);
    }

    /**
     * @param company Company name (optional field on the form).
     */
    async fillCompany(company: string): Promise<void> {
        await this.iptCompany.fill(company);
    }

    /**
     * @param address Primary street address line.
     */
    async fillAddress(address: string): Promise<void> {
        await this.iptAddress1.fill(address);
    }

    /**
     * @param address2 Secondary address line.
     */
    async fillAddress2(address2: string): Promise<void> {
        await this.iptAddress2.fill(address2);
    }

    /**
     * Selects a country from the combobox; the string must match a visible option label.
     * @param country Display label of the country option to select.
     */
    async selectCountry(country: string): Promise<void> {
        await this.cbxCountry.selectOption({ label: country });
    }

    /**
     * @param state State or region.
     */
    async fillState(state: string): Promise<void> {
        await this.iptState.fill(state);
    }

    /**
     * @param city City name.
     */
    async fillCity(city: string): Promise<void> {
        await this.iptCity.fill(city);
    }

    /**
     * @param zipcode Postal / ZIP code.
     */
    async fillZipcode(zipcode: string): Promise<void> {
        await this.iptZipcode.fill(zipcode);
    }

    /**
     * @param mobileNumber Mobile phone number.
     */
    async fillMobileNumber(mobileNumber: string): Promise<void> {
        await this.iptMobileNumber.fill(mobileNumber);
    }
}