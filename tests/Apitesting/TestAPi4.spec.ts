//Post call
import { test, expect, request } from '@playwright/test';
import putmethod1 from './Testdata/putmethod1.json';
//const putmethod1 = require('./Testdata/putmethod1.json');

test('Post method 1', async ({ request }) => {
    const apiresponse = await request.post("/booking",
        {
            data: {
                "firstname": "Undertaker",
                "lastname": "Ghosh",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "Dinner"
            }
        }
    );
    const jsonresponse = await apiresponse.json();
    console.log(expect(apiresponse.ok()).toBeTruthy());
    console.log(await apiresponse.json());
    let bookingid = jsonresponse.bookingid;
    console.log(bookingid);
    expect(jsonresponse.booking).toMatchObject({
        "firstname": "Undertaker",
        "lastname": "Ghosh",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Dinner"
    })

})


//put call
test('Put method 1', async ({ request }) => {
    const apiresponse = await request.put("/booking/3564",
        {
            data: {
                "firstname": "Prithu",
                "lastname": "Ghosh",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "Breakfast"
            },
            headers: {
                Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM='
            }
        }
    );
    const jsonresponse = await apiresponse.json();
    console.log(jsonresponse);
    expect(apiresponse.ok()).toBeTruthy();
    console.log(apiresponse.status());
})

test('put method 2', async ({ request }) => {
    const apiresponse = await request.put("/booking/3210",
        {
            data: putmethod1
        } );
    const jsonresponse = await apiresponse.json();
    console.log(jsonresponse);
    expect(apiresponse.ok()).toBeTruthy();
    console.log(apiresponse.status());
})

test('Delete method 1', async ({ request }) => {
    const apiresponse = await request.delete("/booking/1");
    //const jsonresponse = await apiresponse.json();
    //console.log(jsonresponse);
    expect(apiresponse.ok()).toBeTruthy();
    console.log(apiresponse.status());
})

test.only('patch method 1', async ({ request }) => {
    const apiresponse = await request.patch("/booking/13",
        {
            data: {
                "firstname": "Prithu"
            },
            headers: {
                Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM='
            }
        }
    );
    const jsonresponse = await apiresponse.json();
    console.log(jsonresponse);
    expect(apiresponse.ok()).toBeTruthy();
    expect(jsonresponse.firstname).toBe("Prithu");
    console.log(apiresponse.status());
})