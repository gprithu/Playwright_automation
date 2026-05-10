import { test, expect, Page , BrowserContext,request } from "@playwright/test";
import { Apiutils } from './Apiutils';

class Actions {

    async click(locator) {
        await locator.click();
    }
    async type(locator, text) {
        await locator.fill(text);
    }
    async dropdown(locator, text) {
        await locator.selectOption(text);
    }
    async verify(locator, text) {
        await expect(locator).toContainText(text);
    }

}

const loginpayload = { //payload
    "userEmail": "jangia108@gmail.com",
    "userPassword": "Prithu@1998"
}//payload

let orderID : any = {}; 

let orderpayload = {
    "orders": [
        {
            "country": "Cuba",
            "productOrderedId": "6960eac0c941646b7a8b3e68"
        }
    ]
}
let loginpagetoken: any = {};
const action = new Actions();






test.describe.serial('E2E Flow', () => {
    let sharedPage: Page; // ✅ declared here with let — accessible by all tests below
    let context: BrowserContext;
    let totalProductsSelected: number[] = [];
    let productAmount : string[] = [];
    test.beforeAll(async ({ browser }) => {
        context  = await browser.newContext();
        sharedPage = await context.newPage();
        const apicontext = await request.newContext();  //apicontext
        const apiutils = new Apiutils(apicontext,loginpayload,orderpayload);//apiutils
        loginpagetoken = await apiutils.getlogintoken(loginpayload);
        orderID = await apiutils.createorder(loginpayload,orderpayload);
        //const action = new Actions(sharedPage); // ✅ no const/let — assigns to outer variable

    });

    test.beforeEach(async () => {
        await sharedPage.addInitScript(value => {
            window.localStorage.setItem('token', value);
        }, loginpagetoken);
    })


    test('order confirmation', async () => { // ✅ no {page} — using sharedPage
        await sharedPage.goto('https://rahulshettyacademy.com/client/#/auth/login');
        await action.click(sharedPage.locator('button[routerlink="/dashboard/myorders"]'));
        await sharedPage.waitForLoadState('networkidle');
        
        for(let i=0; i<totalProductsSelected.length; i++){
            await action.verify(sharedPage.locator('tr.ng-star-inserted th').nth(i), orderID);
        }
        await sharedPage.screenshot({ path: `./screenshots/${'checorder confirmation'}.png` });
    });
});