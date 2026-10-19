import {test as setup} from '@playwright/test';

const authfile = 'playwright/.auth/user.json';

setup('setup authentication', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await page.getByPlaceholder('Username').fill('Admin');    
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL(/dashboard/);
    await page.context().storageState({ path: authfile });
})

