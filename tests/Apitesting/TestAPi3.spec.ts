//get method 
import { test, expect,request } from '@playwright/test';

let apicontext: any = {};
test.beforeAll(async () => {
        apicontext = await request.newContext({
        baseURL: 'https://restful-booker.herokuapp.com/',
        extraHTTPHeaders: {
            'Accept': 'application/json'
        }
    })
})


test('Get method 1',async ({request}) => {
    const apiresponse = await request.get('https://restful-booker.herokuapp.com/booking',
        {
            headers: {
                'Accept': 'application/json'
            }
        }
    );
    console.log(await apiresponse.json());
})

test('Get method 2',async ({}) => {//using a baseurl in a single test 
    const reqcontext = await request.newContext({
        baseURL: 'https://restful-booker.herokuapp.com/'
    })
    const apiresponse = await reqcontext.get('booking');
    console.log(await apiresponse.json());
})

test('Get method 3',async ({request}) => {//declaring globally
    const apiresponse = await apicontext.get('booking');
    console.log(await apiresponse.json());
})

test('Get method 4',async ({request}) => {//passing through config file 
    const apiresponse = await request.get('booking');
    console.log(await apiresponse.json());
})
test('Get method 5',async ({request}) => {//path parameter
    const bookingid = 2;
    const apiresponse = await request.get('booking/'+bookingid);
    console.log(await apiresponse.json());
    expect(apiresponse.ok()).toBeTruthy();
    console.log(apiresponse.status());
})

test('Get method 6',async ({request}) => {//query parameter
    const firstname = 'Jim';
    const lastname = 'Brown';
    const apiresponse = await request.get('booking',{
        params: {
            firstname: firstname,
            lastname: lastname
        }
    });

    console.log(await apiresponse.json());
    expect(apiresponse.ok()).toBeTruthy();
    console.log(apiresponse.status());
})

test.only('test api with ui verification', async({page,request}) => {//validate response with UI
    const response  = await request.get("https://api.demoblaze.com/entries");
    const responseJson = await response.json();
    console.log(responseJson.Items[0].title);
    console.log(responseJson.Items.length);
    await page.goto('https://demoblaze.com/index.html');
    await expect( page.getByRole('link', {name: 'Samsung galaxy s6'})).toHaveText(responseJson.Items[0].title);
    

})

