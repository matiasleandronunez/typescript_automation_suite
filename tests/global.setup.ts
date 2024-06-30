import {test as setup, request, APIRequestContext, expect} from '@playwright/test';
import {APIRequestsHelper} from "../helpers/apiRequestsWrapper";
import {createRandomUser} from "../helpers/commonsHelper";
import {CONFIG} from "../variables.config";

setup('DB setup', async ({}) => {
    // Type check env vars to make sure aren't undefined
    if(CONFIG.baseAPIHost === undefined || CONFIG.baseHost === undefined){
        throw new Error('Either BASE_URL, BASE_API_URL or both env vars are undefined. Please set them in the run environment and re launch');
    }

    //Get a context for data preparation
    let requestContext: APIRequestContext = await request.newContext({
        baseURL: CONFIG.baseAPIHost,
        extraHTTPHeaders: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    });
    let requestHelper = new APIRequestsHelper(requestContext);

    //Save the test data for usage during execution. Dynamically creating it and storing in env vars for use during
    //execution.

    process.env.USER_TO_ADD = JSON.stringify(createRandomUser());
    process.env.USER_TO_DELETE = JSON.stringify(createRandomUser());
    process.env.USER_EXISTING = JSON.stringify(createRandomUser());

    const { USER_TO_DELETE, USER_EXISTING } = process.env;


    let response = await Promise.all([
        requestHelper.addCustomer(JSON.parse(USER_TO_DELETE)),
        requestHelper.addCustomer(JSON.parse(USER_EXISTING))
    ]);

    expect(response.map(r => r.status())).toEqual([201,201]);

    await requestContext.dispose();
});