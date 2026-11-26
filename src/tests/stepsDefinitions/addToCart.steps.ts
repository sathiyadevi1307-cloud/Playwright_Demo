import {Given,When,Then,After,setDefaultTimeout} from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import { JuiceShopPage } from '../../pages/addToCart';
import { addressData } from '../testData/addressDetails';
import { cardData } from '../testData/cardData';
import { LoginPage } from "../../pages/LoginPage";
import dotenv from 'dotenv';
dotenv.config();

setDefaultTimeout(60000);

let browser: Browser;
let page: Page;
let juiceShopPage: JuiceShopPage;
let loginPage: LoginPage;


Given("I open the OWASP Juice Shop home page", async function () {

    const isCI = process.env.CI === 'true';

browser = await chromium.launch({
    channel: "msedge",
    headless: isCI,
    args: isCI ? [] : ['--start-maximized']
});
    const context = await browser.newContext({
        viewport: null
    });

    page = await context.newPage();

    juiceShopPage = new JuiceShopPage(page);
    loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
});



When("I log in with valid credentials", async function () {

    await loginPage.enterEmail(process.env.JUICESHOP_USERNAME!);

    await loginPage.enterPassword(process.env.JUICESHOP_PASSWORD!);

    await loginPage.clickRememberMeCheckbox();

    await loginPage.clickLoginButton();
});

When("I add two products to the basket", async function () {

    await juiceShopPage.addTwoProductsToBasket();
});

When("I open the shopping basket", async function () {

    await juiceShopPage.openShoppingBasket();
});

When("I click on the Checkout button", async function () {

    await juiceShopPage.clickCheckout();
});



Then("I should see the address page", async function () {

    await juiceShopPage.openAddNewAddress();
    await page.waitForTimeout(2000);
});

Then("I fill in the delivery address details", async function () {

    await juiceShopPage.fillAddressDetails(addressData[0]);
     await page.waitForTimeout(2000);
});


Then("I should select one address from the list", async function () {

    await juiceShopPage.selectDeliveryAddress();
await juiceShopPage.selectDeliveryMethod();
});


Then("I should see the payment page", async function () {

    await juiceShopPage.openAddNewCard();

    await juiceShopPage.fillCardDetails(cardData[0]);
    await page.waitForTimeout(2000);
});

Then("I should select a payment method", async function () {

    await juiceShopPage.selectPaymentMethod();

    await juiceShopPage.placeOrder();

    await juiceShopPage.verifyOrderSuccess();
});

Then("I should track my order", async function () {

    await juiceShopPage.trackOrder();
    await page.waitForTimeout(3000);
});


After(async function () {

    if (browser) {
        await browser.close();
    }
});
