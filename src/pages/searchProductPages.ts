
import { Page, expect } from '@playwright/test';
 
export class SearchProductPage {
 
  constructor(private page: Page) {}
 
 
  async clickSearchIcon() {
 
    const searchContainer = this.page.locator('.search-container');
    const searchInput = this.page.locator('.search-container input[type="text"]');
 
    if (!(await searchContainer.evaluate(element =>
      element.classList.contains('search-container--visible')
    ))) {
      await this.page.getByRole('button', { name: 'Open search' }).click();
    }
 
    await expect(searchContainer).toHaveClass(/search-container--visible/);
    await expect(searchInput).toBeVisible();
  }
 
  async verifySearchBarDisplayed() {
 
    await expect(this.page.locator('.search-container input[type="text"]')).toBeVisible();
  }
 
  async enterProductName(productName: string) {
 
    const searchContainer = this.page.locator('.search-container');
    const searchInput = searchContainer.locator('input[type="text"]');
 
    await expect(searchContainer).toHaveClass(/search-container--visible/);
    await searchInput.fill(productName);
    await searchInput.press('Enter');
    await expect(searchInput).toHaveValue(productName);
  }
 
 
 
  async verifySearchResults(productName: string) {
 
    const searchResults = this.page.locator("mat-card").filter({ hasText: productName }).first();
    await expect(searchResults.first()).toBeVisible();
 
    // await searchResults.click();
  }
 
 
 
  async addProductToCart(productName: string) {
 
    const searchResults = this.page.locator("mat-card").filter({ hasText: productName }).first();
    await searchResults.locator('button.btn-basket').click();
    await expect(this.page.locator('.mat-mdc-snack-bar-label').last()).toContainText(productName);
  }
 
  async navigateToShoppingCart() {
 
    await this.page.locator('.hide-lt-md.basket-label').click();
    await this.page.waitForTimeout(2000);
  }
 
  async verifyProductInCart(productName: string) {
 
    const cartItem = this.page.getByRole("row").filter({ hasText: productName });
    await expect(cartItem).toBeVisible();
  }
 
 
  async increaseProductQuantity(productName: string, quantity: number) {
 
    const cartItem = this.page.getByRole("row").filter({ hasText: productName });
    await expect(cartItem).toBeVisible();
 
    const quantityCell = cartItem.locator("mat-cell").nth(2);
    const increaseButton = quantityCell.getByRole("button").last();
 
    for (let currentQuantity = 1; currentQuantity < quantity; currentQuantity++) {
      await increaseButton.click();
    }
  }
 
  async clickCheckout() {
   
    await this.page.locator("//button[@id='checkoutButton']").click();
  }
 
  async openAddressPage() {
 
    await expect(this.page.getByRole('button', { name: 'Add New Address' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Add New Address' }).click();
  }
 
  async fillDeliveryAddressDetails(data: {
    name: string;
    country: string;
    mobile: string;
    zipCode: string;
    address: string;
    city: string;
    state: string;
  }) {
 
    await this.page.locator('//input[@placeholder="Please provide a name."]').fill(data.name);
    await this.page.locator('//input[@placeholder="Please provide a country."]').fill(data.country);
 
    const mobileField = this.page.locator('//input[@placeholder="Please provide a mobile number."]');
 
    await mobileField.fill(data.mobile);
    await expect(mobileField).toHaveValue(data.mobile);
 
    const zipCodeField = this.page.locator('//input[@placeholder="Please provide a ZIP code."]');
 
    await zipCodeField.fill(data.zipCode);
    await expect(zipCodeField).toHaveValue(data.zipCode);
 
    const addressField = this.page.locator('//textarea[@placeholder="Please provide an address."]');
 
    await addressField.fill(data.address);
    await expect(addressField).toHaveValue(data.address);
 
    const cityField = this.page.locator('//input[@placeholder="Please provide a city."]');
 
    await cityField.fill(data.city);
    await expect(cityField).toHaveValue(data.city);
 
    const stateField = this.page.locator('//input[@placeholder="Please provide a state."]');
 
    await stateField.fill(data.state);
    await expect(stateField).toHaveValue(data.state);
 
    await this.page.getByRole("button", { name: /submit/i }).click();
 
  }
 
  async selectDeliveryAddressAndMethod() {
 
   
    await this.page.locator('//input[@type="radio"]').last().click();
    await this.page.waitForTimeout(2000);
 
    await this.page.locator("//span[text()='Continue']").click();
    await this.page.waitForTimeout(2000);
 
    await this.page.locator('//input[@type="radio"]').nth(1).click();
    await this.page.waitForTimeout(2000);
 
    await this.page.locator("//span[text()='Continue']").click();
    await this.page.waitForTimeout(2000);
  }
 
 
  async openPaymentPageAndFillCardDetails(card: {
    name: string;
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
  }) {
 
    const addNewCard = this.page.locator(
      "//mat-panel-title[text()=' Add new card ']"
    );
 
    await expect(addNewCard).toBeVisible();
    await addNewCard.click();
 
    await this.page.waitForTimeout(2000);
 
    await this.page.locator('//input[contains(@id,"mat-input-")]').first().fill(card.name);
    await this.page.locator('//mat-label[text()="Card Number"]').fill(card.cardNumber);
    await this.page.locator('//select[contains(@id,"mat-input-")]').first().selectOption(card.expiryMonth);
    await this.page.locator('//select[contains(@id,"mat-input-")]').nth(1).selectOption(card.expiryYear);
 
    await this.page.waitForTimeout(3000);
    await this.page.locator('//span[text()=" Submit "]').click();
 
    await this.page.waitForTimeout(3000);
  }
 
  async selectPaymentMethod() {
 
    await this.page.locator('//input[@class="mdc-radio__native-control"]').last().click();
 
    await this.page.waitForTimeout(2000);
 
    await this.page.locator("//span[text()='Continue']").click();
  }
 
 
  async placeOrder() {
 
    await expect(this.page.locator("//h1[text()=' Your Basket ']")).toBeVisible();
    await this.page.waitForTimeout(3000);
 
    await this.page.locator("//span[text()='Place your order and pay']").click();
    await this.page.waitForTimeout(3000);
  }
 
  async verifyOrderSuccess() {
 
    const thankYouMsg = this.page.locator("//h1[text()='Thank you for your purchase!']");
    await expect(thankYouMsg).toBeVisible();
 
    const text = await thankYouMsg.textContent();
    console.log("Order Message:", text);
  }


 // ---------------- NEGATIVE SEARCH SCENARIOS ----------------
async navigateToHomePage() {

    await this.page.goto('https://preview.owasp-juice.shop/#/', {
      waitUntil: 'domcontentloaded'});

    // Verify homepage loaded
    await expect(
        this.page.getByRole('button', { name: 'Back to homepage' })
    ).toBeVisible();
}

async clickSearchIconforInvalidSearches() {
    const searchContainer = this.page.locator('.search-container');
    const searchInput = this.page.locator('.search-container input[type="text"]');

    if (!(await searchContainer.evaluate(element =>
        element.classList.contains('search-container--visible')))) {
        await this.page.getByRole('button', { name: 'Open search' }).click();
    }

    await expect(searchContainer).toHaveClass(/search-container--visible/);
    await expect(searchInput).toBeVisible();
}


  async enterInvalidProductName(productName: string) {

    console.log('Entered Text:', productName);

    const searchContainer = this.page.locator('.search-container');
    const searchInput = searchContainer.locator('input[type="text"]');

    await expect(searchContainer).toHaveClass(/search-container--visible/);

    await searchInput.fill(productName);
    await searchInput.press('Enter');
    await expect(this.page.getByText(/^Search Results -/)).toBeVisible();
  }


   async verifyNoMatchingProducts() {
   await expect(this.page.locator('mat-card:has(button.btn-basket)')).toHaveCount(0, { timeout: 10000 });}
}
