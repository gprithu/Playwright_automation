import {test,expect} from '@playwright/test';
//fetch header and validate
test.skip('Fetch and validate Response Hearer',async ({request}) => {
    const response = await request.get('/booking/13');
    const heradervalue = response.headers();
   //nsole.log(heradervalue);
    //expect(heradervalue).toBe('Basic YWRtaW46cGFzc3dvcmQxMjM=');
    expect(heradervalue.server).toBe('Heroku');
    expect(heradervalue["x-powered-by"]).toEqual('Express');
    const herderArrayValues = response.headersArray();
    console.log(herderArrayValues);
    expect(herderArrayValues.length).toBe(10);
})

test.only('Authorization 1',async ({request}) => {
    const token = await request.post('/auth', {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });
    const tokenjson = await token.json();
    console.log("The token is : "+ tokenjson.token);
    const response = await request.put('/booking/13', {
        headers: {
            'Cookie': 'token=' + token
        },
        data: {
            "firstname": "Prithu",
            "lastname": "Vulu",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        }
    });
    const jsonresponse = await response.json();
    console.log(jsonresponse);
    expect(response.ok()).toBeTruthy();
})