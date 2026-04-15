import { test, expect } from '@playwright/test';    

test ('my third playright test', async ({page}) => {
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
  expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
  class loacator {
    username = page.locator('#username');
    password = page.locator('#password');
    signInBtn = page.locator('#signInBtn');
    productname = page.locator('div.card-body h4 a');
  }

  const locators = new loacator();
  await locators.username.fill('rahulshettyacademy');
  await locators.username.fill('');
  await locators.username.fill('rahulshettyacademy');
  await locators.password.fill('Learning@830$3mK2');
  const dropdown = page.locator('select.form-control');
  await dropdown.selectOption('Consultant');
  const radiobuttons = page.locator('span.checkmark');
  await radiobuttons.nth(1).click();
  console.log(await expect(radiobuttons.nth(1)).toBeChecked());
  await page.locator('button#okayBtn').click();
  await page.locator('input#terms').click();
  await expect(page.locator('input#terms')).toBeChecked();
  console.log(await page.locator('input#terms').isChecked());
  await locators.signInBtn.click();
  await page.locator('a[href="https://rahulshettyacademy.com/documents-request"]').click();
  //console.log(await locators.productname.first().textContent());
  //console.log(await locators.productname.allTextContents());
});

test('Switch tabs', async ({browser}) => {
 const context = await browser.newContext();
 const page = await context.newPage();
 await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
 const [newpage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('a[href="https://rahulshettyacademy.com/documents-request"]').first().click()
 ])

 newpage.locator("//a[text()='Courses']").first().click();

});