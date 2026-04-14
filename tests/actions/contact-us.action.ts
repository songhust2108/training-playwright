import { expect } from "@fixtures/base-fixture";
import { ContactUsPage } from "@pages/contact-us.page";
import { ContactUsInfo } from "@data/types/contact-us.type";

/**
 * Action layer for Contact Us: composes {@link ContactUsPage} steps and holds `expect` assertions.
 */
export class ContactUsAction extends ContactUsPage {
    /**
     * Asserts the "Get In Touch" heading is visible before filling the form.
     * On failure, attaches plain-text context to the test report.
     */
    async verifyGetInTouchTextVisible(): Promise<void> {
        await this.page.waitForLoadState("domcontentloaded");
        await expect(
            this.getGetInTouchText(),
            '"Get In Touch" heading should be visible',
        ).toBeVisible();
    }

    /**
     * Fills all text fields on the Contact Us form (name, email, subject, message).
     * @param contactUsInfo Test data mapped to page fill methods.
     */
    async enterContactUsInformation(contactUsInfo: ContactUsInfo): Promise<void> {
        await this.fillName(contactUsInfo.name);
        await this.fillEmail(contactUsInfo.email);
        await this.fillSubject(contactUsInfo.subject);
        await this.fillMessage(contactUsInfo.message);
    }

    /**
     * Attaches a file to the upload input using the path from test data.
     * @param contactUsInfo Must include `filePath` resolvable by Playwright.
     */
    async uploadFile(contactUsInfo: ContactUsInfo): Promise<void> {
        await this.getInputFileField().setInputFiles(contactUsInfo.filePath);
    }

    /**
     * Asserts the success banner after submit is visible.
     * On failure, attaches plain-text context to the test report.
     */
    async verifyTextSuccessSubmitFormContactUsVisible(): Promise<void> {
        await expect(
            this.getSuccessMessage(),
            "Contact Us success message should be visible after submit",
        ).toBeVisible();
    }

    /**
     * Registers a one-time handler for the browser dialog shown before submit (e.g. upload confirmation).
     * Call this **before** the action that opens the dialog (e.g. before {@link ContactUsPage.clickSubmitButton}).
     */
    confirmAlert(): void {
        this.page.once("dialog", async (dialog) => {
            expect(dialog.message(), "Upload/submit confirmation dialog should mention OK").toContain("OK");
            await dialog.accept();
        });
    }
}