import {test as base} from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { PIMPage } from '../pages/PIMPage';
import { AddEmployeePage } from '../pages/AddEmployeePage';

type fixture = {
    loginPage: LoginPage;
    PIMPage: PIMPage;
    AddEmployeePage: AddEmployeePage;
};

export const test = base.extend<fixture>({
    loginPage: async ({ page }, use) => {
        const loginpage = new LoginPage(page);
        await use(loginpage);
    }
    ,
    PIMPage: async ({ page }, use) => {
        const pimPage = new PIMPage(page);
        await use(pimPage);
    }
    ,
    AddEmployeePage: async ({ page }, use) => {
        const addEmployeePage = new AddEmployeePage(page);
        await use(addEmployeePage);
    }
})


export { expect } from '@playwright/test';