import {test, expect} from '../fixtures/test-fixture';
//import {LoginPage} from '../pages/loginpage';


test.beforeEach(async ({ page, loginPage }) => {
    await page.goto('/');
});

test('Verify valid login', async ({page, loginPage}) => {
    //const loginPage = new LoginPage(page);
    //await page.goto('/');
    //await loginPage.login('Admin', 'admin123');
    await expect(page).toHaveURL(/dashboard/);
});

/*test('Verify invalid login', async ({page, loginPage}) => {
    //const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login('Admin', 'wrong123');
    await expect(page.getByText('Invalid credentials')).toBeVisible();
    //await expect(page).toHaveURL(/login/);
});*/