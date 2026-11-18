
import {Given,When,Then,After,setDefaultTimeout} from "@cucumber/cucumber";

import { chromium, Browser, Page } from "playwright";
import { JuiceShopPage } from '../../pages/juiceShop';
import { addressData } from '../testData/addressDetails';
import { cardData } from '../testData/cardData';

import dotenv from 'dotenv';
dotenv.config();

setDefaultTimeout(60000);

let browser: Browser;
let page: Page;
let juiceShopPage: JuiceShopPage;


// ---------------- BROWSER SETUP ----------------

Given("I open the OWASP Juice Shop home page", async function () {

    browser = await chromium.launch({
        channel: "msedge",
        headless: false,
        args: ['--start-maximized']
    });

    const context = await browser.newContext({
        viewport: null
    });

    page = await context.newPage();

    juiceShopPage = new JuiceShopPage(page);

    await juiceShopPage.openLoginPage();
});


// ---------------- LOGIN ----------------

When("I log in with valid credentials", async function () {

    await juiceShopPage.login(
        process.env.JUICESHOP_USERNAME!,
        process.env.JUICESHOP_PASSWORD!
    );
});


// ---------------- ADD PRODUCTS ----------------

When("I add two products to the basket", async function () {

    await juiceShopPage.addTwoProductsToBasket();
});


// ---------------- SHOPPING BASKET ----------------

When("I open the shopping basket", async function () {

    await juiceShopPage.openShoppingBasket();
});

When("I click on the Checkout button", async function () {

    await juiceShopPage.clickCheckout();
});


// ---------------- DELIVERY ADDRESS ----------------

Then("I should see the address page", async function () {

    await juiceShopPage.openAddNewAddress();
});

Then("I fill in the delivery address details", async function () {

    await juiceShopPage.fillAddressDetails(addressData[0]);
});


// ---------------- SELECT DELIVERY ADDRESS ----------------

Then("I should select one address from the list", async function () {

    await juiceShopPage.selectDeliveryAddress();

    await juiceShopPage.selectDeliveryMethod();
});


// ---------------- PAYMENT DETAILS ----------------

Then("I should see the payment page", async function () {

    await juiceShopPage.openAddNewCard();

    await juiceShopPage.fillCardDetails(cardData[0]);
});


// ---------------- SELECT PAYMENT AND PLACE ORDER ----------------

Then("I should select a payment method", async function () {

    await juiceShopPage.selectPaymentMethod();

    await juiceShopPage.placeOrder();

    await juiceShopPage.verifyOrderSuccess();
});


// ---------------- BROWSER CLEANUP ----------------

After(async function () {

    if (browser) {
        await browser.close();
    }
});
