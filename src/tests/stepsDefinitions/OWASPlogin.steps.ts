import {Given,Then,After,setDefaultTimeout} from "@cucumber/cucumber";
//import { Given, Then, After } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import { expect } from "@playwright/test";

setDefaultTimeout(60000);



export let browser: Browser;
export let page: Page;

// Open OWASP Juice Shop login page
Given("I open the OWASP Juice Shop login page", async function () {
    // browser = await chromium.launch({ headless: false });

    // const context = await browser.newContext();
    // page = await context.newPage();
    browser = await chromium.launch({
    channel: 'msedge',
    headless: false
});

const context = await browser.newContext();

page = await context.newPage();

    //await page.goto("https://preview.owasp-juice.shop/#/login");
    await page.goto('https://preview.owasp-juice.shop/#/login', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
});

    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(5000);
});

// Verify Login heading
Then('I should see the {string} heading', async function (heading: string) {
    await expect(
        page.getByRole("heading", { name: heading, exact: true })
    ).toBeVisible();
});

// Verify Email field
Then("I should see the email field", async function () {
    await expect(page.locator('input[id="email"]')).toBeVisible();
    await page.locator('input[id="email"]').fill('sathiyadevi1307@gmail.com');
});

// Verify Password field
Then("I should see the password field", async function () {
    await expect(page.locator("#password")).toBeVisible();
    await page.locator('input[id="password"]').fill('Mani#13072002');
    await page.waitForTimeout(3000);
});


Then('I should see the Remember me checkbox', async function () {

await page.locator( "//input[@type='checkbox']").click();
 await page.waitForTimeout(10000);
});

// Verify Log in button
Then('I should see the {string} button', async function (buttonName: string) {
    //await expect(page.getByRole("button", { name: buttonName, exact: true })).toBeVisible();
    await page.locator("//span[text()=' Log in ']").click();
   
});


    // const rememberMe = page.locator( "//input[@type='checkbox']");

    // await expect(rememberMe).toBeVisible();

    // await rememberMe.check();

    // await expect(rememberMe).toBeChecked();


// Close browser after scenario
After(async function () {
    if (browser) {
        await browser.close();
    }
});