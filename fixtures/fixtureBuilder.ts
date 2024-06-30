import { APIRequestContext, request, test as base } from '@playwright/test';
import { CONFIG } from '../variables.config';
import {APIRequestsHelper} from "../helpers/apiRequestsWrapper";

// declare the types of your fixtures
interface MyFixtures {
    requestHelper: APIRequestsHelper;
}

// extend base test to be used in multiple test files. Each of them will get the fixtures
export const test = base.extend<MyFixtures>({
    // eslint-disable-next-line no-empty-pattern
    async requestHelper({}, use) {
        // Set up the fixture

        const apiContext: APIRequestContext = await request.newContext({
            baseURL: CONFIG.baseAPIHost,
            extraHTTPHeaders: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        });

        const requestHelper: APIRequestsHelper = new APIRequestsHelper(apiContext);

        // Use the fixture value in the test
        await use(requestHelper);

        // Clean up the fixture
        await requestHelper.dispose();
    },
});

export { expect } from '@playwright/test';