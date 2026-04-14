import { Page } from '@playwright/test';

/**
 * Top navigation helper: visit URLs and click header menu links by visible name.
 */
export class Navigation {
    private readonly page: Page;

    /**
     * Initializes the Navigation helper.
     * 
     * @param page - Page object
     */
    constructor(page: Page) {
        this.page = page;
    }

    /** Resolves a header/nav link by its accessible name. */
    private menuItems = (item: string) => this.page.getByRole('link', { name: item }).first();

    /**
     * Navigates to a specific URL or the default base URL.
     * @param url - Optional URL path to visit
     */
    async visit(url?: string): Promise<void> {
        if (url) {
            await this.page.goto(url);
        } else {
            await this.page.goto('/');
        }
    }

    /**
     * Clicks a primary menu item in the navigation bar.
     * @param menuName - The exact string name of the menu item
     */
    async clickMenuItem(menuName: string): Promise<void> {
        await this.menuItems(menuName).click();
    }

    /**
     * Checks if a primary menu item is visible in the navigation bar.
     * @param menuName - The exact string name of the menu item
     * @returns Promise resolving to boolean visibility
     */
    async isMenuItemVisible(menuName: string): Promise<boolean> {
        return await this.menuItems(menuName).isVisible();
    }

}
