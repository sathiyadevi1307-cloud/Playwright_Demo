import { Page, expect } from "@playwright/test";

export class LoginPage {
    constructor(private page: Page) {}

    async navigateToLoginPage() {
        await this.page.goto('https://preview.owasp-juice.shop/#/login', {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });

        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForTimeout(5000);
    }

    async verifyHeading(heading: string) {
        await expect(
            this.page.getByRole("heading", {
                name: heading,
                exact: true,
            })
        ).toBeVisible();
    }

    async enterEmail(username: string) {
    await expect(
        this.page.locator('input[id="email"]')
    ).toBeVisible();

    await this.page
        .locator('input[id="email"]')
        .fill(username);
}

async enterPassword(password: string) {
    await expect(
        this.page.locator("#password")
    ).toBeVisible();

    await this.page
        .locator('input[id="password"]')
        .fill(password);

    await this.page.waitForTimeout(3000);
}

    async clickRememberMeCheckbox() {
        await this.page
            .locator("//input[@type='checkbox']")
            .click();

        await this.page.waitForTimeout(10000);
    }

    async clickLoginButton() {
        await this.page
            .locator("//span[text()=' Log in ']")
            .click();
    }
}