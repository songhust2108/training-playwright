import { test } from "@fixtures/base-fixture";
import productDetailData from "@data/testdata/product-detail.json";
import { NAVIGATION } from "@data/constants/navigation.const";
test.describe("Product Listing", () => {
    test.beforeEach(async ({ common, home }) => {
        await test.step("Open the Automation Exercise home page.", async () => {
            const { navigation } = common;
            await navigation.visit();
            await home.verifyHomePage();
        });
    });

    test("TC008 - Verify all product and product detail page", async ({ home, productList, productDetail }) => {
        await test.step("Open Products and verify the listing.", async () => {
            await home.navigation.clickMenuItem(` ${NAVIGATION.MENU.PRODUCTS}`);
            await productList.verifyAllProductsTxtVisible();
            await productList.verifyProductListFeatureItemsVisible();
        });

        await test.step("Open a product from the list and verify PDP fields.", async () => {
            await productList.clickViewProduct(0);
            const td008 = productDetailData.TC008.productDetail;
            await productDetail.verifyProductDetailInformation(td008);
        });
    });

    test("TC009 - Search product", async ({ home, productList }) => {
        const textSearch = productDetailData.TC009.textSearch;
        await test.step("Open Products and verify the listing.", async () => {
            await home.navigation.clickMenuItem(` ${NAVIGATION.MENU.PRODUCTS}`);
            await productList.verifyAllProductsTxtVisible();
            await productList.verifyProductListFeatureItemsVisible();
        });

        await test.step("Run search and verify results heading.", async () => {
            await productList.fillTextSearch(textSearch);
            await productList.clickSearchBtn();
            await productList.verifyTxtSearchedProductVisible();
        });

        await test.step("Verify each product name contains the search term.", async () => {
            await productList.verifyAllProductsRelatedToSearch(textSearch);
        });
    });

    test("TC012 - Add Products in cart", async ({ home, productList, cart }) => {
        await test.step("Open Products and verify the listing.", async () => {
            await home.navigation.clickMenuItem(` ${NAVIGATION.MENU.PRODUCTS}`);
            await productList.verifyAllProductsTxtVisible();
            await productList.verifyProductListFeatureItemsVisible();
            await productList.getAllProductsText().scrollIntoViewIfNeeded();
        });

        const lineItems = await test.step("Add two products from the listing and open View Cart.", async () => {
            const first = await productList.addProductToCartFromListing(0);
            await productList.clickContinueShoppingBtn();
            const second = await productList.addProductToCartFromListing(1);
            await productList.clickViewCartLink();
            return [first, second];
        });

        await test.step("Verify both products appear in the cart in order.", async () => {
            await cart.verifyProductsInCartInOrder(lineItems);
        });
    });
});
