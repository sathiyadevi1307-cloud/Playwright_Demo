import {Given,Then, When,After,setDefaultTimeout} from "@cucumber/cucumber";
import {chromium,Browser,Page} from "playwright";
import { LoginPage } from "../../pages/LoginPage";

setDefaultTimeout(60000);

export let browser: Browser;
export let page: Page;

let loginPage: LoginPage;


Given("I open the OWASP Juice Shop login page", async function () {

    const isCI = process.env.CI === 'true';

browser = await chromium.launch({
    channel: "msedge",
    headless: isCI,
    args: isCI ? [] : ['--start-maximized']
});


    const context = await browser.newContext();

    page = await context.newPage();

    loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
});


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

Then("I should see the Remember me checkbox", async function () {

    await loginPage.clickRememberMeCheckbox();

});

// Verify Log in button
Then("I should see the {string} button", async function (buttonName: string) {

    await loginPage.clickLoginButton();

});


//invalid scenario
When("I enter invalid email and password", async function () {

    await loginPage.enterEmail("abc@gmail.com");

    await loginPage.enterPassword("pass@345");

});


When("I click the login button", async function () {

    await loginPage.clickLoginButton();

});

Then("I should see the invalid login error message", async function () {
await loginPage.verifyInvalidLoginMessage();

});

After(async function () {

    if (browser) {
        await browser.close();
    }
});




