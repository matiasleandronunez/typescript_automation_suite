import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";
import {priceStringToFloat} from "../helpers/commonsHelper";

export class CheckoutPage extends BasePage{
    readonly productItemDiv: Locator;
    readonly subtotalAmount: Locator;
    readonly shippingAmount: Locator;
    readonly taxesAmount: Locator;
    readonly totalAmount: Locator;

    constructor(page: Page) {
        super(page);
        this.productItemDiv = this.page.locator("div.productItem");
        this.subtotalAmount = this.page.locator("//div[@class='totalDetails']//span[text()='subtotal']/following-sibling::span");
        this.shippingAmount = this.page.locator("//div[@class='totalDetails']//span[text()='shipping']/following-sibling::span");
        this.taxesAmount = this.page.locator("//div[@class='totalDetails']//span[text()='taxes']/following-sibling::span");
        this.totalAmount = this.page.locator("//div[@class='totalFinal']//span[text()='Total']/following-sibling::span");
    }

    async productQuantityInCart(productTitle : string){
        let quantitySpan = this.productItemDiv.filter( {hasText: productTitle} ).locator("//span[contains(text(),'Quantity')]");

        return priceStringToFloat(await quantitySpan.innerText());
    }

    async productPriceInCart(productTitle : string){
        let priceSpan = this.productItemDiv.filter( {hasText: productTitle} ).locator('div.columnRight');
        //TO DO filter by productTitle
        return priceStringToFloat(await priceSpan.innerText());
    }

    async cartSubtotal(){
        return priceStringToFloat(await this.subtotalAmount.innerText());
    }

    async cartShipping(){
        return priceStringToFloat(await this.shippingAmount.innerText());
    }

    async cartTaxes(){
        return priceStringToFloat(await this.taxesAmount.innerText());
    }

    async cartTotal(){
        return priceStringToFloat(await this.totalAmount.innerText());
    }
}