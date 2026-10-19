import {test, expect} from '../fixtures/test-fixture';

import * as employeeData from '../Test-data/addemployee.json';
test('add an employee', async ({ page , loginPage, PIMPage, AddEmployeePage}) => {

    // Login
    await page.goto('/');

    //we will use storage state to login instead of using the login page object
    //await loginPage.login('Admin', 'admin123');
    await expect(page).toHaveURL(/dashboard/);

    // PIM
    await PIMPage.goToPIM();
    
    await expect(page).toHaveURL(/pim/);
    await PIMPage.clickAddEmployee();
    await expect(page).toHaveURL(/addEmployee/);

    // Add employee
    await AddEmployeePage.fillEmployeeDetails(employeeData.firstName, employeeData.lastName, employeeData.employeeId);
    await AddEmployeePage.clickLoginDetailsCheckbox();
    await AddEmployeePage.fillLoginDetails(employeeData.username, employeeData.password);
    await AddEmployeePage.clickSaveButton();

    // Verify navigation to employee details
    await expect(page).toHaveURL(/viewPersonalDetails/,{timeout: 15000});

});
    //login
    