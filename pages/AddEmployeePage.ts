import {Page,Locator} from 'playwright';

export class AddEmployeePage {

    private page: Page;
    private firstName: Locator;
    private lastName: Locator;
    private saveButton: Locator;
    private employeeId: Locator;
    private loginDetailsCheckbox: Locator;
    private username: Locator;
    private password: Locator;
    private confirmPassword: Locator;

    constructor( page: Page) {
        this.page = page;
        this.firstName = this.page.getByPlaceholder('First Name');
        this.lastName = this.page.getByPlaceholder('Last Name');
        this.employeeId = this.page.getByRole('textbox').nth(4);
        const fields = this.page.locator('.oxd-input-group input.oxd-input');
        this.saveButton = this.page.getByRole('button', { name: 'Save' });
        this.loginDetailsCheckbox = this.page.locator("input[type='checkbox'] + span");
        this.username = fields.nth(4);
        this.password = fields.nth(5);
        this.confirmPassword = fields.nth(6);
    }

    async fillEmployeeDetails(firstName: string, lastName: string, employeeId: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.employeeId.fill(employeeId);
    }

    async clickLoginDetailsCheckbox() {
        await this.loginDetailsCheckbox.click();
    }

    async fillLoginDetails(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.confirmPassword.fill(password);
    }

    async clickSaveButton() {
        await this.saveButton.click();
    }
}   