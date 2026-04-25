import {test, expect,Page,BrowserContext} from '@playwright/test'; 
import { Actions } from '../rahulshettyacademy/actions.spec'; // import Actions from '../rahulshettyacademy/actions.spec';

let action : Actions;

test.describe.serial('Assignment 1', () => {
    let sharedPage :  Page;
    let context : BrowserContext;
    let baseurl = "https://eventhub.rahulshettyacademy.com";
    let bookingref: string;

    const testdata = {
        username : "prithughosh777@gmail.com",
        password : "Trip@1978",
        eventTitle : `Test Event ${Date.now()}`,
        //eventTitle : "Test Event 1776661082148",
        eventdatetime : "2026-08-31T10:00",
        totaltickettobebooked : 3

    };

    //const { username, password, eventTitle } = testdata;
    


    test.beforeAll(async ({ browser }) => {
        context  = await browser.newContext();
        sharedPage = await context.newPage();
        action = new Actions(sharedPage); // ✅ no const/let — assigns to outer variable
    });

    test('signin', async ({},testInfo) => { // ✅ no {page} — using sharedPage
        action.navigate(baseurl);
        action.waitForElementLoading();
        await action.verify("h1.text-xl.font-bold.text-gray-900", "Sign in to EventHub");
        await action.type("input#email", testdata.username);
        //console.log(password);
        await action.type("input#password", testdata.password);
        await action.click("button#login-btn");
        await action.takeScreenshot(testInfo.title)
        await action.waitForElementLoading();
        await action.verifyText('a[href="/events"] span', "Browse Events →");

        await sharedPage.pause();

    });

    test('Create a new event', async ({},testInfo) => { // ✅ no {page} — using sharedPage

        await action.click('div.hidden button');
        await sharedPage.locator('div.relative div a').first().click();
        await action.waitForElementLoading();
        await action.type('input#event-title-input', testdata.eventTitle);
        await sharedPage.getByPlaceholder('Describe the event…').fill('This is a test event');
        await sharedPage.getByLabel('city').fill('Kolkata');
        await sharedPage.getByLabel('Venue').fill('Salt Lake VHS Cinema');
        await sharedPage.getByLabel('Total Seats').fill('100');
        await sharedPage.getByLabel('Price ($)').fill('99');
        //await action.type('input#event-date-\&-time', testdata.eventdatetime);
        await sharedPage.getByLabel('Event Date & Time').fill(testdata.eventdatetime);
        await sharedPage.getByRole('button', { name: '+ Add Event' }).click();
        await action.takeScreenshot(testInfo.title)
        await sharedPage.pause();

    });

    test('Find the event card and capture seats', async ({},testInfo) => { // ✅ no {page} — using sharedPage
       await action.click('a#nav-events');
       await action.waitForElementLoading();
       let alleventcards = await sharedPage.locator('div.p-4.flex.flex-col.flex-1');
       let firsteventcardTitle = await alleventcards.filter({ hasText: 'Dilli Diwali Mela' }).first();
       //await action.verifyText(`${firsteventcardTitle}`, 'Dilli Diwali Mela');
       await expect(firsteventcardTitle).toContainText('Dilli Diwali Mela');
       let eventcard = await alleventcards.filter({ hasText: testdata.eventTitle }).first();
       //await action.verifyText(eventcard, testdata.eventTitle);
       await expect(eventcard).toContainText(testdata.eventTitle);
       let eventcardseats = await eventcard.filter({hasText: ' seats available'});
       await expect(eventcardseats).toContainText(' seats available');
       console.log(eventcardseats);
       await action.takeScreenshot(testInfo.title);
       await eventcard.getByRole('link', { name: 'Book Now', exact: true }).click(); //await eventcard.getByRole('button', { name: 'Book Now').click();
       //await sharedPage.pause();
    });

    test('Fill booking form', async ({},testInfo) => { // ✅ no {page} — using sharedPage
        await action.waitForElementLoading();
        await action.verifyText('#ticket-count', '1');
        for(let i = 1; i < testdata.totaltickettobebooked+1; i++) {
            await action.click('div.flex.items-center.gap-3 button:last-of-type');
        }
        await action.takeScreenshot(testInfo.title);
        for(let i = testdata.totaltickettobebooked+1; i > testdata.totaltickettobebooked; i--) {
            await action.click('div.flex.items-center.gap-3 button:first-of-type');
        }
        await action.takeScreenshot(testInfo.title);
        await action.waitForElementLoading();
        await action.verifyText('#ticket-count', `${testdata.totaltickettobebooked}`);
        await sharedPage.getByLabel("Full Name").fill('Prithu Ghosh');
        await sharedPage.getByTestId('customer-email').fill(testdata.username);
        await sharedPage.getByPlaceholder('+91 98765 43210').fill('+91 7908700897');
        await sharedPage.getByRole('button', { name: 'Confirm Booking', exact: true }).click(); //await sharedPage.getByRole('button', { name: 'Book Now' }).click();
        await action.takeScreenshot(testInfo.title);
        await sharedPage.pause();
    
    });

    test('booking confirmation', async ({},testInfo) => { // ✅ no {page} — using sharedPage
        await action.waitForElementLoading();
        await action.verify('h3.text-xl.font-bold.text-gray-900.mb-1', "Booking Confirmed! 🎉");
        let bookingrefvalue = await(sharedPage.locator("//span[text()='Booking Ref']/following-sibling::span")).textContent();
        if(bookingrefvalue != null) {
            bookingref = bookingrefvalue;
        }
        console.log(bookingref);
        await action.takeScreenshot(testInfo.title);
        //await sharedPage.pause();
       
    });

    test('Verify in My Bookings', async ({},testInfo) => { // ✅ no {page} — using sharedPage
        await sharedPage.getByRole('link', { name: 'My Bookings' }).first().click();
        await action.waitForElementLoading();
        await expect(sharedPage).toHaveURL(baseurl+"/bookings");
        let alleventcards = await sharedPage.locator('#booking-card');
        const firstcard = alleventcards.first();
        await expect(firstcard.locator('span').filter({ hasText: 'confirmed' })).toBeVisible();
        const eventcard = await alleventcards.filter({hasText: bookingref}).locator('h3');
        if(await expect(eventcard).toBeVisible) {
            await expect(alleventcards.filter({hasText: bookingref}).locator('h3')).toContainText(testdata.eventTitle);
        }
        await action.takeScreenshot(testInfo.title);
        await sharedPage.pause();
    });

})