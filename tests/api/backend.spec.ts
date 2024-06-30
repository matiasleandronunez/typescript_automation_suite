import { expect, test } from '../../fixtures/fixtureBuilder';

test.describe.parallel('API testing @api_feature', () => {
    const { USER_TO_ADD, USER_TO_DELETE, USER_EXISTING } = process.env;

    test('it should throw an exception when creating a duplicate customer', async ({ requestHelper }) => {
        let response = await requestHelper.addCustomer(JSON.parse(USER_EXISTING!));

        expect(response.status(), `Expected status code 409, was ${response.status()}`).toBe(409);
    });

    test('it should delete a customer', async ({ requestHelper }) => {
        let response = await requestHelper.deleteCustomer(JSON.parse(USER_TO_DELETE!).username);

        expect(response.status(), `Expected status code 204, was ${response.status()}.`).toBe(204);
    });

    test('it should create a customer', async ({ requestHelper }) => {
        let response = await requestHelper.addCustomer(JSON.parse(USER_TO_ADD!));

        expect(response.status(), `Expected status code 201, was ${response.status()}`).toBe(201);
        expect(response.ok()).toBeTruthy();
        expect((await response.json()).customerId).toBeTruthy();
    });
});