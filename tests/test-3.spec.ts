import { test, expect } from '@playwright/test';

test('My first playwright test', async ({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

});

test ('My second playwright test', async ({page}) => {

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
  expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
  await page.fill('#username','rahulshettyacademy');
  await page.locator('input#password').fill('Learning@80$3mK2');
  await page.locator('input#terms').click();
  await page.locator('#signInBtn').click();
  const erorMessage = await page.locator('[style="display: block;"]').textContent();
  console.log(erorMessage);
  await expect(page.locator('[style="display: block;"]')).toContainText('Incorrect username/password.');
});