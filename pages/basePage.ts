import { expect, type Locator, type Page } from '@playwright/test';
import { CONFIG} from "../variables.config";

export class BasePage{
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url=CONFIG.baseHost) {
        await this.page.goto(url!);
    }
}