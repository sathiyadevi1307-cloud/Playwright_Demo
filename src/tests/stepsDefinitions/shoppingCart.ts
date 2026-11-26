
import {Given,When,Then,After,setDefaultTimeout} from "@cucumber/cucumber";
import {chromium,type Browser,type Page} from "@playwright/test";
import { expect } from "@playwright/test";
import { ShoppingCart } from "../../pages/shoppingCartPages";
import { addressData } from "../testData/addressDetails";
import { cardData } from "../testData/cardData";

import dotenv from "dotenv";

dotenv.config();

setDefaultTimeout(60000);

let browser: Browser;
let page: Page;
let shoppingCart: ShoppingCart;


// Open application
Given(
    "I open the OWASP Juice Shop home page for basket management",
    async function () {

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

        shoppingCart = new ShoppingCart(page);

        await shoppingCart.openHomePage();
    }
);


// Login
When(
    "I log in with valid credentials for basket management",
    async function () {

        await shoppingCart.login(
            process.env.JUICESHOP_USERNAME!,
            process.env.JUICESHOP_PASSWORD!
        );
    }
);


// Add two products
When(
    "I add two products to the basket for basket management",
    async function () {

        await shoppingCart.addTwoProducts();
    }
);


// Open basket
When(
    "I open the shopping basket and verify its starting total",
    async function () {

        await shoppingCart.openBasket();
    }
);


// Verify product
Then(
    "product name should be displayed in the basket",
    async function () {

        await shoppingCart.verifyProductInBasket();
    }
);


// Remove one product
When(
    "I remove one existing product from the basket",
    async function () {

        await shoppingCart.removeOneProduct();
    }
);


// Checkout
When(
    "I click on the Checkout button for basket management",
    async function () {

        await shoppingCart.clickCheckout();
    }
);


// Address page
Then(
    "I should see the address page for basket management",
    async function () {

        await shoppingCart.clickAddNewAddress();
    }
);


// Fill address
Then(
    "I fill in the delivery address details for basket management",
    async function () {

        await shoppingCart.fillAddressDetails(addressData[0]);
    }
);


// Select address and delivery
Then(
    "I should select one address from the list for basket management",
    async function () {

        await shoppingCart.selectAddressAndDelivery();
    }
);


// Payment page
Then(
    "I should see the payment page for basket management",
    async function () {

        await shoppingCart.addNewCard(cardData[0]);
    }
);


// Select payment
Then(
    "I should select a payment method for basket management",
    async function () {

        await shoppingCart.selectPaymentMethod();
    }
);


// Close browser
After(async function () {

    if (browser) {
        await browser.close();
    }
});
