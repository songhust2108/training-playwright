import { Page, Locator } from "@playwright/test";
import { CommonPage } from "@pages/common.page";

/**
 * Shopping cart page (`/view_cart`): cart table body and row access (no assertions).
 */
export class CartPage extends CommonPage {
    private readonly tbodyCart: Locator;

    /**
     * @param page Page opened on the cart screen after navigating to View Cart.
     */
    constructor(page: Page) {
        super(page);
        this.tbodyCart = page.locator("#cart_info tbody");
    }

    /**
     * @returns Locator for the cart table body that contains product rows (`tr`).
     */
    getCartInfoBody(): Locator {
        return this.tbodyCart;
    }

    /**
     * @param index Zero-based data row index in the cart table (excluding header row).
     */
    getCartRow(index: number): Locator {
        return this.tbodyCart.locator("tr").nth(index);
    }
}
