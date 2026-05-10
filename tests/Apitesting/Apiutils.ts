import { expect, APIRequestContext } from '@playwright/test';

export class Apiutils {
    apicontext: APIRequestContext;
    loginpayload: any;
    orderpayload: any;
    constructor(apicontext: APIRequestContext, loginpayload: any, orderpayload: any) {
        this.apicontext = apicontext;
        this.loginpayload = loginpayload;
        this.orderpayload = orderpayload;
    }

    async getlogintoken(loginpayload){
        const logiresponse = await this.apicontext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { //apicontext
        data: this.loginpayload //data: JSON.stringify(loginpayload)
    })
       
        await expect(logiresponse.ok()).toBeTruthy();//status code should be 200
        const loginpagetoken = await logiresponse.json();
        console.log(loginpagetoken.token);
        return loginpagetoken.token;
    }

    async createorder(loginpayload,orderpayload){
        const loginpagetoken = await this.getlogintoken(loginpayload);
        const orderResponse = await this.apicontext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', { //apicontext
                    data: this.orderpayload, //data: JSON.stringify(loginpayload)
                    headers: {
                        'Authorization': loginpagetoken,
                        'Content-Type': 'application/json'
                    }
                })
                await expect(orderResponse.ok()).toBeTruthy();
                console.log(orderResponse.status());
                const orderResponseJson = await orderResponse.json();
                const orderID = orderResponseJson.orders[0];
                console.log(orderID.productOrderedId);
                return orderID.productOrderedId;
    }
}
