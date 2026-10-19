import {test, expect} from '@playwright/test';

test('Verify opencart homepage', async ({page}) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/OrangeHRM/);
});