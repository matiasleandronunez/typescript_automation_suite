import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";

export class CreateUserPage extends BasePage{
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signUpButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = this.page.locator('input[name=username]');
        this.passwordInput = this.page.locator('input[name=password]');
        this.signUpButton = this.page.getByRole('button', {name: 'Sign Up'});
    }

    async inputUser(name : string, password : string){
        await this.usernameInput.fill(name);
        await this.passwordInput.fill(password);
    }

    async submitForm(){
        await this.signUpButton.click();
    }

    async productPriceInCart(productTitle : string){
        await this.signUpButton.click();
    }
}