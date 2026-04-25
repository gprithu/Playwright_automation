import { expect, Page } from '@playwright/test';

export class Actions {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async click(locator) {
        await this.page.click(locator);
    }

    async type(locator, text: string) {
        await this.page.fill(locator, text);
    }

    async dropdown(locator, text: string) {
        await this.page.selectOption(locator, text); 
    }

    async verify(locator, text: string) {
        await this.page.waitForSelector(locator);
        await expect(this.page.locator(locator)).toContainText(text);
    }

    async verifyText(locator, text: string) {
        await this.page.waitForSelector(locator);
        await expect(this.page.locator(locator)).toHaveText(text);
    }  

    async waitForElementLoading() {
        this.page.waitForLoadState('networkidle');
    }

    async takeScreenshot(fileName: string) {
        await this.page.screenshot({ path: `./screenshots/${fileName}.png` });
        fullpage: true;
    }

}
