import { APIRequestContext, APIResponse, request, expect, test as base } from '@playwright/test';
import { JSONObject } from "./typesHelper";

export class APIRequestsHelper{
    readonly requestContext: APIRequestContext;

    constructor(requestContext: APIRequestContext) {
        this.requestContext = requestContext;
    }

    async allPublishedProducts() {
        return await this.requestContext.get('product/');
    }

    async findUsername(username : string) {
        return await this.requestContext.get(`customer/username=${username}`);
    }

    async deleteAllUsers(){
        return await this.requestContext.delete('customer/');
    }

    async deleteCustomer(username : string){
        let getUserResponse = await this.findUsername(username);
        let userInfo : JSONObject = await getUserResponse.json();
        return await this.requestContext.delete(`customer/${userInfo.customerIf}`); // CustomerIf is not a typo, actual field name in API response
    }

    async addCustomer(customer : JSONObject){
        return await this.requestContext.post('customer/', {data: customer});
    }

    async dispose() {
        await this.requestContext.dispose();
    }
}