import { test, expect, Page , BrowserContext } from "@playwright/test";

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

const action = new Actions();

test('signup', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.waitForLoadState('networkidle');
    await action.verify(page.locator('section h1.title').first(), "Practice Website for ");
    await action.click(page.locator('a.btn1'));
    await action.type(page.locator('input#firstName'), "Prithu");
    await action.type(page.locator('input#lastName'), "Ghosh");
    await action.type(page.locator('input#userEmail'), "jangia108@gmail.com");
    await action.type(page.locator('input#userMobile'), "7908700897");
    await action.type(page.locator('input#userPassword'), "Prithu@1998");
    await action.type(page.locator('input#confirmPassword'), "Prithu@1998");
    await action.dropdown(page.locator('select[formcontrolname="occupation"]'), "Student");
    await action.click(page.locator('input[type="radio"]').first());
    await action.click(page.locator('input[type="checkbox"]'));
    await action.click(page.locator('#login'));
    await page.waitForTimeout(5000);
});



test.describe.serial('E2E Flow', () => {
    let sharedPage: Page; // ✅ declared here with let — accessible by all tests below
    let context: BrowserContext;
    let totalProductsSelected: number[] = [];
    let productAmount : string[] = [];
    test.beforeAll(async ({ browser }) => {
        context  = await browser.newContext();
        sharedPage = await context.newPage();
        //const action = new Actions(sharedPage); // ✅ no const/let — assigns to outer variable
    });

    test('signin', async () => { // ✅ no {page} — using sharedPage
        await sharedPage.goto('https://rahulshettyacademy.com/client/#/auth/login');
        await sharedPage.waitForLoadState('networkidle'); // ✅ sharedPage everywhere
        await action.verify(sharedPage.locator('h1.login-title').first(), "Log in");
        await action.type(sharedPage.locator('input#userEmail'), "jangia108@gmail.com");
        await action.type(sharedPage.locator('input#userPassword'), "Prithu@1998");
        await sharedPage.screenshot({ path: `./screenshots/${'signin'}.png` });
        await action.click(sharedPage.locator('input#login'));
        await sharedPage.waitForLoadState('networkidle');
        await action.verify(sharedPage.locator("//p[text()='Automation Practice']").first(), "Automation Practice");
    });

    test('add to cart', async () => { // ✅ no {page} — using sharedPage
        //console.log(await sharedPage.title());
        // sharedPage is already signed in ✅
        const products = await sharedPage.locator('div.card-body');
        const count = await products.count();
        let productname = 'ZARA COAT 3';
        const specificProduct1 = products.filter({ hasText: 'ZARA COAT 3' });
        await action.click(specificProduct1.locator('button').last());
        totalProductsSelected.push(1);
        const specificProduct2 = products.filter({ hasText: 'iphone 13 pro' });
        totalProductsSelected.push(1);
        await action.click(specificProduct2.locator('button').last());
        await sharedPage.screenshot({ path: `./screenshots/${'add to cart'}.png` });
        await action.click(sharedPage.locator('button[routerlink="/dashboard/cart"]'));
        
        //await sharedPage.waitForTimeout(5000);

    });

    test('verfiy cart', async () => { // ✅ no {page} — using sharedPage

       await sharedPage.waitForLoadState('networkidle');

       await sharedPage.locator('h3:has-text("ZARA COAT 3")').isVisible();
       await sharedPage.locator('h3:has-text("iphone 13 pro")').isVisible();

       //check the total cart item 
       const sum = totalProductsSelected.reduce((a, b) => a + b, 0);
       const cartItems = await sharedPage.locator('div.cartSection h3');
       await expect(sharedPage.locator('button[routerlink="/dashboard/cart"] label')).toHaveText(String(sum));
        //checking the total value 
       const productPrice = await sharedPage.locator('div[class="prodTotal cartSection"] p').allTextContents();
       if (productPrice !== null) {
        productAmount.push(productPrice);
       }
       console.log(productAmount);
       const flattenedArray = productAmount.flat();
       const numbers = flattenedArray.map(price => Number(price.replace('$ ', '').trim()));
       console.log(numbers);
       const totalamount = numbers.reduce((a, b) => a + b, 0);
       await action.verify(sharedPage.locator('li.totalRow span.value').first(), String(totalamount));
        await sharedPage.screenshot({ path: `./screenshots/${'verfiy cart'}.png` });
       //const total = productAmount.reduce((a, b) => a + b, 0);
       //await expect(sharedPage.locator('div[class="totalAmount cartSection"] p')).toHaveText(String(total));
       await action.click(sharedPage.locator('li.totalRow button'));
       

    });

    test('checkout', async () => { // ✅ no {page} — using sharedPage
        await sharedPage.waitForLoadState('networkidle');
        console.log(await sharedPage.locator('div.payment__title').first().textContent());
        await action.verify(sharedPage.locator('div.payment__title').first(), " Payment Method ");
        const country = await sharedPage.locator('input[placeholder="Select Country"]');
        await country.pressSequentially('Ind');
        await country.waitFor();
        const countryName = sharedPage.locator('section button[type="button"]').filter({ hasText: 'India' });
        await action.click(countryName.last());
        await sharedPage.locator('select.input.ddl').first().selectOption('09');
        await sharedPage.locator('select.input.ddl').last().selectOption('29');
        const nameoncard = "Prithu Ghosh";
        await action.type(sharedPage.locator("//div[text()='Name on Card ']/following-sibling::input"), nameoncard);
        await action.type(sharedPage.locator("//div[text()='CVV Code ']/following-sibling::input"), "030");
        await sharedPage.screenshot({ path: `./screenshots/${'checkout'}.png` });
        await action.click(sharedPage.locator('a.btnn.action__submit.ng-star-inserted'));
        //await sharedPage.pause();
    });

    test('order confirmation', async () => { // ✅ no {page} — using sharedPage
        await sharedPage.waitForLoadState('networkidle');
        await action.verify(sharedPage.locator('h1.hero-primary'), " Thankyou for the order. ");
        const orderID = await sharedPage.locator('label.ng-star-inserted').allTextContents();
        console.log(orderID);
        //click on orders
        await action.click(sharedPage.locator('button[routerlink="/dashboard/myorders"]'));
        await sharedPage.waitForLoadState('networkidle');
        for(let i=0; i<totalProductsSelected.length; i++){
            await action.verify(sharedPage.locator('tr.ng-star-inserted th').nth(i), String(totalProductsSelected[i]));
        }
        await sharedPage.screenshot({ path: `./screenshots/${'checorder confirmation'}.png` });
    });
});