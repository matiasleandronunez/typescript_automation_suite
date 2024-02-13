import { expect, test } from '../../fixtures/fixtureBuilder';
import {HomePage} from "../../pages/homePage";
import {Customer, JSONObject} from "../../helpers/typesHelper";
import {CreateUserPage} from "../../pages/createUserPage";
import {createRandomUser} from "../../helpers/commonsHelper";

test.describe.parallel('Users @user_feature', () => {
    test(`it should create a new user`,async ({ page, requestHelper }) => {
        const homePage = new HomePage(page);
        const createUserPage = new CreateUserPage(page);
        const user : Customer = createRandomUser();

        await homePage.goto();
        await expect(homePage.welcomeTitle).toBeVisible();
        await expect(homePage.welcomeTitle).toContainText('Welcome to the atsea shop');

        await homePage.goToCreateUser();
        await createUserPage.inputUser(user.username, user.password);
        await createUserPage.submitForm();

        let userInfo = await requestHelper.findUsername(user.username);
        expect(userInfo.status()).toEqual(200);
    });
});