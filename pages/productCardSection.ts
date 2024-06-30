import { type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";
import {priceStringToFloat} from "../helpers/commonsHelper";

export class ProductCardSection extends BasePage{
    readonly productCardBase: Locator;
    readonly addButton: Locator;
    readonly priceDiv: Locator;

    constructor(page: Page, cardTitle : string, cardId : number | undefined = undefined) {
        super(page);
        this.productCardBase = this.page.locator(`//div[@class='tile'][div[contains(text(),"${cardTitle}")]][div[@class='tileImage']${cardId == undefined ? '' : `[img[@src=\"/images/${cardId.toString()}.png\"]]`}]`);
        this.addButton = this.productCardBase.locator("//div[@class='tileAdd']");
        this.priceDiv = this.productCardBase.locator("//div[@class='tilePrice']");
    }


    async clickAdd(times : number){
        for(let i=0; i < times; i++){
            await this.addButton.click();
        }
    }

    async displayedPrice(){
        return priceStringToFloat(await this.priceDiv.innerText());
    }

    async isVisible(){
        return this.productCardBase.isVisible();
    }
}