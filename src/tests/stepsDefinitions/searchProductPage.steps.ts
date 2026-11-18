
import { Given, When, Then, After } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import { SearchProductPage } from '../../pages/searchProductPages';
import { addressData } from '../testData/addressDetails';
import { cardData } from '../testData/cardData';
import { LoginPage } from '../../pages/LoginPage';
import dotenv from 'dotenv';
dotenv.config();

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let searchProductPage: SearchProductPage;

// ---------------- BROWSER SETUP ----------------

Given("I open the login page", async function () {

  browser = await chromium.launch({
    channel: "msedge",
    headless: false,
    args: ['--start-maximized']
  });

  const context = await browser.newContext({ viewport: null });

  page = await context.newPage();

  loginPage = new LoginPage(page);
  searchProductPage = new SearchProductPage(page);

  await loginPage.navigateToLoginPage();
});


// ---------------- LOGIN ----------------

Given("I log in with credentials", async function () {

  await loginPage.enterEmail(
    process.env.JUICESHOP_USERNAME!
  );

  await loginPage.enterPassword(
    process.env.JUICESHOP_PASSWORD!
  );

  await loginPage.clickRememberMeCheckbox();

  await loginPage.clickLoginButton();
});


// ---------------- SEARCH PRODUCT ----------------

When("I click on the search icon", async function () {

  await searchProductPage.clickSearchIcon();
});


Then("the search bar should be displayed", async function () {

  await searchProductPage.verifySearchBarDisplayed();
});


// ---------------- ENTER PRODUCT NAME ----------------

When("I enter {string} in the search bar", async function (productName: string) {

  await searchProductPage.enterProductName(productName);
});


// ---------------- VERIFY SEARCH RESULTS ----------------

Then("the search results should display products matching {string}", async function (productName: string) {

  await searchProductPage.verifySearchResults(productName);
});


// ---------------- ADD PRODUCT TO CART ----------------

Then("I click on the add to cart button for the product {string}", async function (productName: string) {

  await searchProductPage.addProductToCart(productName);
});


// ---------------- NAVIGATE TO SHOPPING CART ----------------

When("I navigate to the shopping cart", async function () {

  await searchProductPage.navigateToShoppingCart();
});


Then("I should see {string} in the cart", async function (productName: string) {

  await searchProductPage.verifyProductInCart(productName);
});


// ---------------- INCREASE PRODUCT QUANTITY ----------------

When("I increase the quantity of {string} to {int}", async function (productName: string, quantity: number) {

  await searchProductPage.increaseProductQuantity(productName, quantity);
});


// ---------------- CHECKOUT ----------------

When("I click on the checkout button", async function () {

  await searchProductPage.clickCheckout();
});


// ---------------- DELIVERY ADDRESS ----------------

Then("I should be on the address page", async function () {

  await searchProductPage.openAddressPage();
});


When("I enter the delivery address details", async function () {

  const data = addressData[1];

  await searchProductPage.fillDeliveryAddressDetails(data);
});


// ---------------- SELECT DELIVERY ADDRESS AND METHOD ----------------

Then("I should be able to select the address from the list", async function () {

  await searchProductPage.selectDeliveryAddressAndMethod();
});


// ---------------- PAYMENT DETAILS ----------------

Then("I should be able to see the payment page", async function () {

  const card = cardData[1];

  await searchProductPage.openPaymentPageAndFillCardDetails(card);
});


// ---------------- SELECT PAYMENT METHOD ----------------

Then("I should be able to select a payment method", async function () {

  await searchProductPage.selectPaymentMethod();

  await searchProductPage.placeOrder();

  await searchProductPage.verifyOrderSuccess();
});


// ---------------- BROWSER CLEANUP ----------------

After(async function () {

  if (browser) {
    await browser.close();
  }
});

