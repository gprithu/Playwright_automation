import {Page,Locator} from 'playwright';

export class LoginPage {

    private page: Page;
    private username: Locator;
    private password: Locator;
    private loginButton: Locator;

    constructor( page: Page) {
        this.page = page;
        this.username = this.page.getByRole('textbox', { name: 'Username' });
        this.password = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
    }

    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}