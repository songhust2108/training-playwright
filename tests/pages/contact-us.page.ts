import { Page, Locator } from "@playwright/test";
import { CommonPage } from "@pages/common.page";

/**
 * Page object for the Contact Us form: locators and low-level fills/clicks (no assertions).
 */
export class ContactUsPage extends CommonPage {
    private readonly txtGetInTouch: Locator;
    private readonly iptName: Locator;
    private readonly iptEmail: Locator;
    private readonly iptSubject: Locator;
    private readonly txtMessage: Locator;
    private readonly iptFile: Locator;
    private readonly btnSubmit: Locator;
    private readonly txtSuccessMessage: Locator;

    /**
     * @param page Page navigated to the Contact Us screen.
     */
    constructor(page: Page) {
        super(page);
        this.txtGetInTouch = page.getByRole('heading', { name: 'Get In Touch' });
        this.iptName = page.getByRole('textbox', { name: 'Name' });
        this.iptEmail = page.getByPlaceholder('Email', { exact: true });
        this.iptSubject = page.getByRole('textbox', { name: 'Subject' });
        this.txtMessage = page.getByRole('textbox', { name: 'Your Message Here' });
        this.iptFile = page.locator('[name="upload_file"]');
        this.btnSubmit = page.locator('[name="submit"]');
        // Avoid `div.status.alert.alert-success` alone: the site repeats empty alert shells;
        // target the node that actually contains the post-submit copy.
        this.txtSuccessMessage = page.getByText(
            "Success! Your details have been submitted successfully.",
            { exact: true },
        ).first();
    }

    /**
     * @returns Locator for the "Get In Touch" heading.
     */
    getGetInTouchText(): Locator {
        return this.txtGetInTouch;
    }

    /**
     * @returns Locator for the visible post-submit success line (exact full sentence).
     */
    getSuccessMessage(): Locator {
        return this.txtSuccessMessage;
    }

    /**
     * @param name Value for the Name field.
     */
    async fillName(name: string): Promise<void> {
        await this.iptName.fill(name);
    }

    /**
     * @param email Value for the Email field.
     */
    async fillEmail(email: string): Promise<void> {
        await this.iptEmail.fill(email);
    }

    /**
     * @param subject Value for the Subject field.
     */
    async fillSubject(subject: string): Promise<void> {
        await this.iptSubject.fill(subject);
    }

    /**
     * @param message Body text for Your Message Here.
     */
    async fillMessage(message: string): Promise<void> {
        await this.txtMessage.fill(message);
    }

    /**
     * @returns Locator for the file upload input (`upload_file`).
     */
    getInputFileField(): Locator {
        return this.iptFile;
    }

    /**
     * Clicks the submit control on the contact form.
     */
    async clickSubmitButton(): Promise<void> {
        await this.btnSubmit.click();
    }

}