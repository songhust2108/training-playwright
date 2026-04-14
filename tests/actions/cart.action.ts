import { expect } from "@fixtures/base-fixture";
import { CartPage } from "@pages/cart.page";
import { CartInfo } from "@data/types/cart-info.type";

/**
 * Shopping cart flows: asserts line items on the cart page.
 */
export class CartAction extends CartPage {
    /**
     * Asserts the product name link and price cell for a single cart row.
     * @param expected Name and price captured when the product was added from the listing.
     * @param index Zero-based cart table row index.
     */
    async verifyProductInCart(expected: CartInfo, index: number): Promise<void> {
        const row = this.getCartRow(index);
        const productLink = row.locator(".cart_description").getByRole("link", { name: expected.name });
        const priceCell = row.locator(".cart_price").getByText(expected.price, { exact: true });

        await expect(
            productLink,
            `Cart row ${index} should show product name "${expected.name}"`,
        ).toBeVisible();
        await expect(
            priceCell,
            `Cart row ${index} should show price "${expected.price}"`,
        ).toBeVisible();
    }

    /**
     * Asserts each product appears as its own row, in the same order as {@link products}.
     * @param products Line items in expected top-to-bottom cart order.
     */
    async verifyProductsInCartInOrder(products: readonly CartInfo[]): Promise<void> {
        for (let index = 0; index < products.length; index++) {
            await this.verifyProductInCart(products[index]!, index);
        }
    }
}
