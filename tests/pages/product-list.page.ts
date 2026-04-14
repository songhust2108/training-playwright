import { CommonPage } from "@pages/common.page";
import { Page, Locator } from "@playwright/test";

/**
 * Product listing page: search, product grid, "View Product" links, and list/searched headings.
 * Assertions belong in `ProductListAction`, not in this page class.
 */
export class ProductListPage extends CommonPage {
    private readonly iptSearchProduct: Locator;
    private readonly btnSearch: Locator;
    private readonly txtAllProducts: Locator;
    private readonly divProductItemsWrapper: Locator;
    private readonly btnViewProduct: Locator;
    private readonly txtSearchedProducts: Locator;
    private readonly btnContinueShopping: Locator;
    private readonly lnkViewCart: Locator;
    private readonly divProductWrapper: Locator;

    constructor(page: Page) {
        super(page);
        this.iptSearchProduct = page.getByRole("textbox", { name: "Search Product" });
        this.btnSearch = page.locator("#submit_search");
        this.txtAllProducts = page.getByRole("heading", { name: "All Products" });
        this.divProductItemsWrapper = page.locator("div.features_items");
        this.btnViewProduct = page.locator("a").filter({ hasText: "View Product" });
        this.txtSearchedProducts = page.getByRole("heading", { name: "Searched Products" });
        this.btnContinueShopping = page.getByRole('button', { name: 'Continue Shopping' });
        this.lnkViewCart = page.getByText('View Cart', { exact: true });
        this.divProductWrapper = page.locator('div.product-image-wrapper');
    }

    getProductWrapperDiv(index: number): Locator {
        return this.divProductWrapper.nth(index);
    }

    /**
     * @returns Locator for the "All Products" section heading.
     */
    getAllProductsText(): Locator {
        return this.txtAllProducts;
    }

    /**
     * @returns Locator for the container that wraps the product cards (`features_items`).
     */
    getDivContainProductItemsLocator(): Locator {
        return this.divProductItemsWrapper;
    }

    /**
     * @returns Locator for all "View Product" links in the current listing.
     */
    getBtnViewProductLocator(): Locator {
        return this.btnViewProduct;
    }

    /**
     * @returns Locator for the "Searched Products" heading (after a search is run).
     */
    getTxtSearchedProductLocator(): Locator {
        return this.txtSearchedProducts;
    }

    /**
     * Types the given string into the "Search Product" field.
     * @param textSearch Query text to search for.
     */
    async fillTextSearch(textSearch: string): Promise<void> {
        await this.iptSearchProduct.fill(textSearch);
    }

    /**
     * Clicks the search submit control (`#submit_search`).
     */
    async clickSearchBtn(): Promise<void> {
        await this.btnSearch.click();
    }

    /**
     * Opens a product from the list by zero-based index of the "View Product" link.
     * @param index Which occurrence of "View Product" to click (`0` = first on the page).
     */
    async clickViewProduct(index: number): Promise<void> {
        await this.getBtnViewProductLocator().nth(index).click();
    }

    async hoverToProduct(index: number): Promise<void> {
        await this.getProductWrapperDiv(index).hover();
    }

    /**
     * Clicks Add to cart on the hovered overlay for the product card at {@link index}.
     * @param index Zero-based product card index (same as {@link hoverToProduct}).
     */
    async clickAddProductToCart(index: number): Promise<void> {
        await this.getProductWrapperDiv(index)
            .locator(".product-overlay")
            .getByText("Add to cart", { exact: true })
            .click();
    }

    /** Dismisses the added-to-cart modal and returns to the product listing. */
    async clickContinueShoppingBtn(): Promise<void> {
        await this.btnContinueShopping.click();
    }

    /** Opens the shopping cart page from the post-add confirmation UI. */
    async clickViewCartLink(): Promise<void> {
        await this.lnkViewCart.click();
    }
}
