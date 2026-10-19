import {Page,Locator} from 'playwright';

export class PIMPage {

    private page: Page;
    private pimMenu: Locator;
    private addEmployeeButton: Locator;

    constructor( page: Page) {
        this.page = page;
        this.pimMenu = this.page.getByRole('link', { name: 'PIM' });
        this.addEmployeeButton = this.page.getByRole('link', { name: 'Add Employee' });
    }

    async goToPIM() {
        await this.pimMenu.click(); 
    }

    async clickAddEmployee() {
        await this.addEmployeeButton.click();
    }
}