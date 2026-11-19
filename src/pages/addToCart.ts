import { Page, expect } from '@playwright/test';

export class JuiceShopPage {

    constructor(private page: Page) {}

    async openLoginPage() {
        await this.page.goto('https://preview.owasp-juice.shop/#/login',
            { waitUntil: 'domcontentloaded', timeout: 60000 }
        );
    }

    async login(email: string, password: string) {
        await this.page.locator('input[id="email"]').fill(email);
        await this.page.locator('input[id="password"]').fill(password);
        await this.page.locator("//span[text()=' Log in ']").click();
    }
    
    async addTwoProductsToBasket() {
        const addToBasketButtons = this.page.locator( "//span[text()=' Add to Basket ']");

        await addToBasketButtons.first().click();
        await addToBasketButtons.nth(2).click();
    }

    async openShoppingBasket() {
        await this.page.locator('//span[text()=" Your Basket"]').click();
    }

    async clickCheckout() {
        await this.page.locator('#checkoutButton').click();
    }

    async openAddNewAddress() {
        await this.page.locator("//span[text()='Add New Address']").click();
        await expect(this.page.getByRole('heading', { name: 'Add New Address' })).toBeVisible();
    }

    async fillAddressDetails(data: {
        country: string;
        name: string;
        mobile: string;
        zipCode: string;
        address: string;
        city: string;
        state: string;
    }) {
        const country = this.page.locator( "//input[@placeholder='Please provide a country.']");
        await country.fill(data.country);
        await expect(country).toHaveValue(data.country);

        const name = this.page.locator('//input[@placeholder="Please provide a name."]');
        await name.fill(data.name);
        await expect(name).toHaveValue(data.name);

        const mobile = this.page.locator('//input[@placeholder="Please provide a mobile number."]');
        await mobile.fill(data.mobile);
        await expect(mobile).toHaveValue(data.mobile);

        const zipCode = this.page.locator('//input[@placeholder="Please provide a ZIP code."]');
        await zipCode.fill(data.zipCode);
        await expect(zipCode).toHaveValue(data.zipCode);

        const address = this.page.locator('//textarea[@placeholder="Please provide an address."]');
        await address.fill(data.address);
        await expect(address).toHaveValue(data.address);

        const city = this.page.locator('//input[@placeholder="Please provide a city."]');
        await city.fill(data.city);
        await expect(city).toHaveValue(data.city);

        const state = this.page.locator(
            '//input[@placeholder="Please provide a state."]'
        );
        await state.fill(data.state);
        await expect(state).toHaveValue(data.state);
        await this.page.locator("//span[text()=' Submit ']").click();
    }

   async selectDeliveryAddress() {
        await this.page.locator('//input[@type="radio"]').first().click();
        await this.page.locator("//span[text()='Continue']").click();
    }
    
    async selectDeliveryMethod() {
        await this.page.locator('//input[@type="radio"]').first().click();
        await this.page.locator("//span[text()='Continue']").click();
    }

   async openAddNewCard() {
        const addNewCard = this.page.locator("//mat-panel-title[text()=' Add new card ']");

        await expect(addNewCard).toBeVisible();
        await addNewCard.click();
    }

    async fillCardDetails(data: {
        name: string;
        cardNumber: string;
        expiryMonth: string;
        expiryYear: string;
    }) {
        await this.page.locator('//input[contains(@id,"mat-input-")]').first().fill(data.name);
        await this.page.getByLabel('Card Number').fill(data.cardNumber);

        const expiryDropdowns = this.page.locator('//select[contains(@id,"mat-input-")]');

        await expiryDropdowns.first().selectOption(data.expiryMonth);
        await expiryDropdowns.nth(1).selectOption(data.expiryYear);
        await this.page.locator('//span[text()=" Submit "]').click();
    }

    async selectPaymentMethod() {
        await this.page.locator('//input[@class="mdc-radio__native-control"]').first().click();
        await this.page.locator("//span[text()='Continue']").click();
    }

    async placeOrder() {
        await expect(this.page.locator("//h1[text()=' Your Basket ']")).toBeVisible();
        await this.page.locator("//span[text()='Place your order and pay']").click();
    }

    async verifyOrderSuccess() {
        const thankYouMessage = this.page.locator("//h1[text()='Thank you for your purchase!']");
        await expect(thankYouMessage).toBeVisible();

        const message = await thankYouMessage.textContent();
        console.log('Order Message:', message);
    }
    async trackOrder(){

        const order = this.page.locator("//a[text()='Track Orders']");
        await expect(order).toBeVisible();
        await order.click();
        const products = this.page.locator("//mat-row[@class='mat-mdc-row mdc-data-table__row cdk-row']");

        await expect(products.first()).toBeVisible();
        const productDetails = await products.allTextContents();
        
        console.log("Track Order Products:");

    
}

}
