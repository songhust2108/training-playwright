import { CommonPage } from "@pages/common.page";
import { Page, Locator } from "@playwright/test";

/**
 * Product detail page (PDP): locators for title, category, price, availability, condition, and brand lines.
 * Assertions belong in `ProductDetailAction`, not in this page class.
 */
export class ProductDetailPage extends CommonPage {
    constructor(page: Page) {
        super(page);
    }

    /**
     * @param productName Full product name as shown in the main PDP heading.
     * @returns Locator for the product title heading.
     */
    getProductName(productName: string): Locator {
        return this.page.getByRole("heading", { name: productName });
    }

    /**
     * @param categoryName Value after the `Category:` label (exact line match).
     * @returns Locator for the category row text.
     */
    getCategoryName(categoryName: string): Locator {
        return this.page.getByText(`Category: ${categoryName}`, { exact: true });
    }

    /**
     * @param price Price segment as rendered after `Rs.` on the page.
     * @returns Locator for the price line (`Rs. …`).
     */
    getPrice(price: string): Locator {
        return this.page.getByText(`Rs. ${price}`, { exact: true });
    }

    /**
     * @param availability Value after the `Availability:` label.
     * @returns Locator for the availability line.
     */
    getAvailability(availability: string): Locator {
        return this.page.getByText(`Availability: ${availability}`, { exact: true });
    }

    /**
     * @param condition Value after the `Condition:` label.
     * @returns Locator for the condition line.
     */
    getCondition(condition: string): Locator {
        return this.page.getByText(`Condition: ${condition}`, { exact: true });
    }

    /**
     * @param brand Value after the `Brand:` label.
     * @returns Locator for the brand line.
     */
    getBrand(brand: string): Locator {
        return this.page.getByText(`Brand: ${brand}`, { exact: true });
    }
}
