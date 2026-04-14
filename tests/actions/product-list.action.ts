import { expect } from "@fixtures/base-fixture";
import { ProductListPage } from "@pages/product-list.page";
import { CartInfo } from "@data/types/cart-info.type";

/**
 * Action layer for the product list page: composes {@link ProductListPage} steps and holds `expect` assertions.
 */
export class ProductListAction extends ProductListPage {
    /**
     * Asserts the "All Products" heading is visible on the listing page.
     */
    async verifyAllProductsTxtVisible(): Promise<void> {
        await expect(
            this.getAllProductsText(),
            '"All Products" heading should be visible',
        ).toBeVisible();
    }

    /**
     * Asserts the main product grid container (`features_items`) is visible.
     */
    async verifyProductListFeatureItemsVisible(): Promise<void> {
        await expect(
            this.getDivContainProductItemsLocator(),
            "Product grid (features items) should be visible",
        ).toBeVisible();
    }

    /**
     * Asserts the "Searched Products" heading is visible after running a search.
     */
    async verifyTxtSearchedProductVisible(): Promise<void> {
        await expect(
            this.getTxtSearchedProductLocator(),
            '"Searched Products" heading should be visible',
        ).toBeVisible();
    }

    /**
     * Asserts every product name shown in the grid contains the search term (case-insensitive).
     * @param textSearch Substring expected to appear in each listed product name.
     */
    async verifyAllProductsRelatedToSearch(textSearch: string): Promise<void> {
        const divContainProductItems = this.getDivContainProductItemsLocator();
        const productItems = divContainProductItems.locator(
            "div.col-sm-4.single-products.productinfo p",
        );
        const allProductsName = await productItems.allTextContents();
        const needle = textSearch.toLowerCase();

        for (const productName of allProductsName) {
            expect(
                productName.trim().toLowerCase(),
                `Each product name should match search "${textSearch}"; got "${productName.trim()}"`,
            ).toContain(needle);
        }
    }

    /**
     * Reads name and price from the listing card at {@link index}, hovers to reveal overlay, clicks Add to cart, returns the captured info.
     * @param index Zero-based product card index on the All Products grid.
     */
    async addProductToCartFromListing(index: number): Promise<CartInfo> {
        const product = this.getProductWrapperDiv(index);
        const name = (await product.locator(".productinfo p").innerText()).trim();
        const price = (await product.locator(".productinfo h2").innerText()).trim();
        const data: CartInfo = { name, price };
        await this.hoverToProduct(index);
        await this.clickAddProductToCart(index);
        return data;
    }
}
