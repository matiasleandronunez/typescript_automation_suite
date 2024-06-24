import {test as setup, request, APIRequestContext, expect} from '@playwright/test';
import {APIRequestsHelper} from "../helpers/apiRequestsWrapper";
import {createRandomUser} from "../helpers/commonsHelper";
import {CONFIG} from "../variables.config";

setup('DB setup', async ({}) => {
    let requestContext: APIRequestContext = await request.newContext({
        baseURL: CONFIG.baseAPIHost,
        extraHTTPHeaders: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    });
    let requestHelper = new APIRequestsHelper(requestContext);

    process.env.USER_TO_ADD = JSON.stringify(createRandomUser());
    process.env.USER_TO_DELETE = JSON.stringify(createRandomUser());
    process.env.USER_EXISTING = JSON.stringify(createRandomUser());

    const { USER_TO_ADD, USER_TO_DELETE, USER_EXISTING } = process.env;


    let response = await Promise.all([requestHelper.addCustomer(JSON.parse(USER_TO_DELETE)), requestHelper.addCustomer(JSON.parse(USER_EXISTING))]);
    expect(response.map(r => r.status())).toEqual([201,201]);

    await requestContext.dispose();
});