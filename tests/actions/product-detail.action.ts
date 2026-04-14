import { expect } from "@fixtures/base-fixture";
import { ProductDetailPage } from "@pages/product-detail.page";
import { ProductDetail } from "@data/types/product.type";

/**
 * Action layer for the product detail page: composes {@link ProductDetailPage} steps and holds `expect` assertions.
 */
export class ProductDetailAction extends ProductDetailPage {
    /**
     * Asserts the product title heading (product name) is visible on the detail page.
     * @param productName Expected heading text matching the product name.
     */
    async verifyProductNameVisible(productName: string): Promise<void> {
        await expect(
            this.getProductName(productName),
            `Product name heading "${productName}" should be visible`,
        ).toBeVisible();
    }

    /**
     * Asserts the category line (e.g. `Category: …`) is visible.
     * @param categoryName Expected category value without the `Category:` prefix.
     */
    async verifyCategoryVisible(categoryName: string): Promise<void> {
        await expect(
            this.getCategoryName(categoryName),
            `Category "${categoryName}" should be visible`,
        ).toBeVisible();
    }

    /**
     * Asserts the price line formatted as `Rs. …` is visible.
     * @param price Numeric or formatted price string as shown on the page (without `Rs.`).
     */
    async verifyPriceVisible(price: string): Promise<void> {
        await expect(
            this.getPrice(price),
            `Price Rs. ${price} should be visible`,
        ).toBeVisible();
    }

    /**
     * Asserts the availability line is visible.
     * @param availability Expected availability text (e.g. In Stock) without the `Availability:` prefix.
     */
    async verifyAvailabilityVisible(availability: string): Promise<void> {
        await expect(
            this.getAvailability(availability),
            `Availability "${availability}" should be visible`,
        ).toBeVisible();
    }

    /**
     * Asserts the condition line is visible.
     * @param condition Expected condition text without the `Condition:` prefix.
     */
    async verifyConditionVisible(condition: string): Promise<void> {
        await expect(
            this.getCondition(condition),
            `Condition "${condition}" should be visible`,
        ).toBeVisible();
    }

    /**
     * Asserts the brand line is visible.
     * @param brand Expected brand text without the `Brand:` prefix.
     */
    async verifyBrandVisible(brand: string): Promise<void> {
        await expect(
            this.getBrand(brand),
            `Brand "${brand}" should be visible`,
        ).toBeVisible();
    }

    /**
     * Verifies all PDP fields in one flow: name, category, price, availability, condition, and brand.
     * @param productDetail Expected values for each labeled row on the product detail page.
     */
    async verifyProductDetailInformation(productDetail: ProductDetail): Promise<void> {
        await this.verifyProductNameVisible(productDetail.name);
        await this.verifyCategoryVisible(productDetail.category);
        await this.verifyPriceVisible(productDetail.price);
        await this.verifyAvailabilityVisible(productDetail.availability);
        await this.verifyConditionVisible(productDetail.condition);
        await this.verifyBrandVisible(productDetail.brand);
    }
}
