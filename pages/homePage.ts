import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";

export class HomePage extends BasePage{
    readonly welcomeTitle: Locator;
    readonly checkoutButton: Locator;
    readonly createUserButton: Locator;
    readonly signInUserButton: Locator;

    constructor(page: Page) {
        super(page);
        this.welcomeTitle = this.page.locator('div.headerTitle');
        this.checkoutButton = this.page.getByText('Checkout');
        this.createUserButton = this.page.getByText('Create User');
        this.signInUserButton = this.page.getByText('Sign In');
    }

    async goToCheckout(){
        await this.checkoutButton.click();
    }

    async goToCreateUser(){
        await this.createUserButton.click();
    }
}