import {
    Given,
    Then,
    After,
    setDefaultTimeout
} from "@cucumber/cucumber";

import {
    chromium,
    Browser,
    Page
} from "playwright";

import { LoginPage } from "../../pages/LoginPage";

setDefaultTimeout(60000);

export let browser: Browser;
export let page: Page;

let loginPage: LoginPage;

// Open OWASP Juice Shop login page
Given("I open the OWASP Juice Shop login page", async function () {

    browser = await chromium.launch({
        channel: "msedge",
        headless: false
    });

    const context = await browser.newContext();

    page = await context.newPage();

    loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
});

// Verify Login heading
Then("I should see the {string} heading", async function (heading: string) {

    await loginPage.verifyHeading(heading);

});

Then("I should see the email field", async function () {

    await loginPage.enterEmail(
        process.env.JUICESHOP_USERNAME!
    );

});

Then("I should see the password field", async function () {

    await loginPage.enterPassword(
        process.env.JUICESHOP_PASSWORD!
    );

});


// Verify Remember me checkbox
Then("I should see the Remember me checkbox", async function () {

    await loginPage.clickRememberMeCheckbox();

});

// Verify Log in button
Then("I should see the {string} button", async function (buttonName: string) {

    await loginPage.clickLoginButton();

});

// Close browser after scenario
After(async function () {

    if (browser) {
        await browser.close();
    }

});