import {test, expect} from '@playwright/test';

test('GET users API', async ({ request }) => {

    const response = await request.get('/users/1');
    
    expect(response.status()).toBe(200);
})