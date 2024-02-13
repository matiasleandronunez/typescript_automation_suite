import { expect, test } from '../../fixtures/fixtureBuilder';
import {HomePage} from "../../pages/homePage";
import {ProductCardSection} from "../../pages/productCardSection";
import {CheckoutPage} from "../../pages/checkoutPage";
import { testParameters } from "../../test-data/shop-feature.json" ;
import {JSONObject} from "../../helpers/typesHelper";

test.describe.parallel('Shop @shop_feature', () => {
    for (const scenario of testParameters){
        test(`it should checkout ${scenario.quantity} units of ${scenario.itemName} at ${scenario.itemExpectedPrice} each`,async ({ page }) => {
            const homePage = new HomePage(page);
            const productCard = new ProductCardSection(page, scenario.itemName);
            const checkoutPage = new CheckoutPage(page);

            await homePage.goto();
            await expect(homePage.welcomeTitle).toBeVisible();
            await expect(homePage.welcomeTitle).toContainText('Welcome to the atsea shop');

            await productCard.clickAdd(scenario.quantity);
            await homePage.goToCheckout();

            expect(await checkoutPage.productQuantityInCart(scenario.itemName)).toEqual(scenario.quantity);
            expect(await checkoutPage.cartSubtotal()).toEqual((scenario.itemExpectedPrice) * scenario.quantity);
            expect(await checkoutPage.cartTaxes()).toEqual(1.5 * scenario.quantity);
        });
    }
    test(`it should display all products in the storefront`,async ({ page, requestHelper }) => {
        const products : Array<JSONObject> = await (await requestHelper.allPublishedProducts()).json();
        const homePage = new HomePage(page);

        await homePage.goto();
        await expect(homePage.welcomeTitle).toBeVisible();
        await expect(homePage.welcomeTitle).toContainText('Welcome to the atsea shop');

        const productNames = products.map((p) => p.name);
        for (const productName in productNames){
            let productCard = new ProductCardSection(page, productName);
            expect(productCard.isVisible()).toBeTruthy();
        }
    });
});