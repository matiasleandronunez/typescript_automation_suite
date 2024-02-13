import {APIRequestContext, request, test as teardown} from '@playwright/test';
import {APIRequestsHelper} from "../helpers/apiRequestsWrapper";
import {test as setup} from "playwright/types/test";
import {CONFIG} from "../variables.config";
import {createRandomUser} from "../helpers/commonsHelper";

teardown('DB teardown', async ({}) => {
    let requestContext: APIRequestContext = await request.newContext({
        baseURL: CONFIG.baseAPIHost,
        extraHTTPHeaders: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    });
    let requestHelper = new APIRequestsHelper(requestContext);

    await requestHelper.deleteAllUsers();

    await requestContext.dispose();
});