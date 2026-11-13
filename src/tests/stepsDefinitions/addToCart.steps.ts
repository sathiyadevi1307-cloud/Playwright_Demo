import { Given, When, Then, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import { expect } from "@playwright/test";
import { addressData } from '../testData/addressDetails';
import { cardData } from '../testData/cardData';
import dotenv from 'dotenv';
dotenv.config();

//setDefaultTimeout(60000);

let browser: Browser;
let page: Page;



Given("I open the OWASP Juice Shop home page", async function () {

  browser = await chromium.launch({
    channel: "msedge",
    headless: false,
    args: ['--start-maximized']
  });

  const context = await browser.newContext();{
    viewport: null
  }

  page = await context.newPage();

  await page.goto("https://preview.owasp-juice.shop/#/login");
  await page.waitForTimeout(3000);
});



When("I log in with valid credentials", async function () {

  

  await page.locator('input[id="email"]').fill(process.env.JUICESHOP_USERNAME!);

  await page.locator('input[id="password"]').fill(process.env.JUICESHOP_PASSWORD!);

  await page.locator("//span[text()=' Log in ']").click();

  await page.waitForTimeout(3000);
});



When("I add two products to the basket", async function () {

  //const addToBasketButtons = page.locator("//span[text()='Add to Basket']");
  await page.locator("//span[text()=' Add to Basket ']").first().click();



  await page.waitForTimeout(2000);
  await page.locator("//span[text()=' Add to Basket ']").nth(2).click();
  //await addToBasketButtons.nth(1).click();

  await page.waitForTimeout(2000);
});


When("I open the shopping basket", async function () {

  await page.locator('//span[text()=" Your Basket"]').click();
  await page.waitForTimeout(2000);


});



When("I click on the Checkout button", async function () {

  //await expect(page.locator("//button[@id='checkoutButton']")).toBeVisible();

  await page.locator("//button[@id='checkoutButton']").click();

  //await page.waitForLoadState("networkidle");
});



Then("I should see the address page", async function () {

  //await expect(page).toHaveURL(/.*address.*/);

  await page.locator("//span[text()='Add New Address']").click();
  await page.waitForTimeout(3000);

  await expect(page.getByRole('heading', { name: 'Add New Address' })).toBeVisible();

});

Then("I fill in the delivery address details", async function () {

  const data = addressData;


  await page.locator("//input[@placeholder='Please provide a country.']").fill(data.country);
  await expect(page.locator("//input[@placeholder='Please provide a country.']")).toHaveValue('India')
  //await page.locator('//input[@placeholder="Please provide a name."]').fill('Manisha');

  const nameField = page.locator('//input[@placeholder="Please provide a name."]');
  await nameField.fill(data.name);
  await expect(nameField).toHaveValue('Manisha');

  await page.locator('//input[@placeholder="Please provide a mobile number."]').fill(data.mobile);
  await expect(page.locator('//input[@placeholder="Please provide a mobile number."]')).toHaveValue('9876543210');

  await page.locator('//input[@placeholder="Please provide a ZIP code."]').fill(data.zipCode);
  await expect(page.locator('//input[@placeholder="Please provide a ZIP code."]')).toHaveValue('600001');

  await page.locator('//textarea[@placeholder="Please provide an address."]').fill(data.address);
  await expect(page.locator('//textarea[@placeholder="Please provide an address."]')).toHaveValue('123, Main Street, Chennai');

  await page.locator('//input[@placeholder="Please provide a city."]').fill(data.city);
  await expect(page.locator('//input[@placeholder="Please provide a city."]')).toHaveValue('Chennai');

  await page.locator('//input[@placeholder="Please provide a state."]').fill(data.state);
  await expect(page.locator('//input[@placeholder="Please provide a state."]')).toHaveValue('Tamil Nadu');
  await page.waitForTimeout(3000);
  await page.locator("//span[text()=' Submit ']").click();
  await page.waitForTimeout(3000);
});

Then("I should select one address from the list", async function () {

  await page.locator('//input[@type="radio"]').first().click();
  await page.waitForTimeout(2000);
  await page.locator("//span[text()='Continue']").click();
  await page.waitForTimeout(2000);
  //delivery speed
  await page.locator('//input[@type="radio"]').first().click();
  await page.waitForTimeout(2000);
  await page.locator("//span[text()='Continue']").click();
  await page.waitForTimeout(2000);

});

Then("I should see the payment page", async function () {

  const addNewCard = page.locator("//mat-panel-title[text()=' Add new card ']");
  await expect(addNewCard).toBeVisible();
  await addNewCard.click();
  await page.waitForTimeout(2000);


  await page.locator('//input[contains(@id,"mat-input-")]').first().fill(cardData.name);

  await page.locator('//mat-label[text()="Card Number"]').fill(cardData.cardNumber);


  await page.locator('//select[contains(@id,"mat-input-")]').first().selectOption(cardData.expiryMonth);

  await page.locator('//select[contains(@id,"mat-input-")]').nth(1).selectOption(cardData.expiryYear);
  await page.waitForTimeout(3000);
  await page.locator('//span[text()=" Submit "]').click();
  await page.waitForTimeout(3000);



});

Then("I should select a payment method", async function () {

  await page.locator('//input[@class="mdc-radio__native-control"]').first().click();
  await page.waitForTimeout(2000);
  await page.locator("//span[text()='Continue']").click();
  await expect(

    page.locator("//h1[text()=' Your Basket ']")).toBeVisible();

  await page.waitForTimeout(3000);
  await page.locator("//span[text()='Place your order and pay']").click();
  await page.waitForTimeout(3000);

  const thankYouMsg = page.locator("//h1[text()='Thank you for your purchase!']");
  await expect(thankYouMsg).toBeVisible();
  const text = await thankYouMsg.textContent();
  console.log("Order Message:", text);


});


After(async function () {

  if (browser) {
    await browser.close();
  }
});