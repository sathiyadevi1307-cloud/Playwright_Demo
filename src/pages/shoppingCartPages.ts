
import { Page, expect } from "@playwright/test";

export class ShoppingCart {
    
    constructor(private page: Page) {}

    // Handle welcome and cookie popups
    async dismissWelcomeAndCookiePopups() {

        const popupButtons = [
            this.page.getByRole("button", { name: "Me want it!", exact: true }),
            this.page.getByRole("button", { name: "Dismiss", exact: true })
        ];

        for (let attempt = 0; attempt < 3; attempt++) {

            let dismissedPopup = false;

            for (const button of popupButtons) {

                if (await button.isVisible().catch(() => false)) {
                    await button.click();
                    dismissedPopup = true;
                    await this.page.waitForTimeout(300);
                }
            }

            if (!dismissedPopup) break;
        }
    }

    // Open Juice Shop login page
    async openHomePage() {

        await this.page.goto("https://preview.owasp-juice.shop/#/login");

        await this.page.waitForLoadState("domcontentloaded");

        await this.dismissWelcomeAndCookiePopups();
    }

    // Login
    async login(username: string, password: string) {

        await this.page.locator('input[id="email"]').fill(username);

        await this.page.locator('input[id="password"]').fill(password);

        await this.page.locator("//span[text()=' Log in ']").click();

        await this.page.waitForTimeout(3000);
    }

    // Add two products
    async addTwoProducts() {

        const addToBasketButtons =
            this.page.getByText("Add to Basket", { exact: true });

        await addToBasketButtons.first().click();

        await this.page.waitForTimeout(2000);

        await addToBasketButtons.nth(2).click();

        await this.page.waitForTimeout(2000);
    }

    // Open shopping basket
    async openBasket() {

        const basket = this.page.getByText("Your Basket", { exact: true });

        await expect(basket).toBeVisible({ timeout: 15000 });

        await basket.click();

        await this.page.waitForTimeout(2000);
    }

    // Verify product in basket
    async verifyProductInBasket() {

        const product = this.page.locator(
            "//mat-cell[contains(@class, 'mat-column-product') and normalize-space()='Apple Juice (1000ml)']"
        );

        await expect(product).toBeVisible();
    }

    // Remove one product
    async removeOneProduct() {

        const removeButton = this.page.locator(
            "mat-cell.mat-column-remove button"
        );

        await expect(removeButton.first()).toBeVisible();

        await removeButton.first().click();

        await this.page.waitForTimeout(2000);
    }

    // Checkout
    async clickCheckout() {

        await this.page.locator("#checkoutButton").click();
    }

    // Open add new address
    async clickAddNewAddress() {

        await this.page.locator("//span[text()='Add New Address']").click();

        await expect(
            this.page.getByRole('heading', { name: 'Add New Address' })
        ).toBeVisible();
    }

    // Fill address details
    async fillAddressDetails(data: {
        country: string;
        name: string;
        mobile: string;
        zipCode: string;
        address: string;
        city: string;
        state: string;
    }) {

        await this.page.locator(
            "//input[@placeholder='Please provide a country.']"
        ).fill(data.country);

        const nameField = this.page.locator(
            '//input[@placeholder="Please provide a name."]'
        );

        await nameField.fill(data.name);

        await this.page.locator(
            '//input[@placeholder="Please provide a mobile number."]'
        ).fill(data.mobile);

        await this.page.locator(
            '//input[@placeholder="Please provide a ZIP code."]'
        ).fill(data.zipCode);

        await this.page.locator(
            '//textarea[@placeholder="Please provide an address."]'
        ).fill(data.address);

        await this.page.locator(
            '//input[@placeholder="Please provide a city."]'
        ).fill(data.city);

        await this.page.locator(
            '//input[@placeholder="Please provide a state."]'
        ).fill(data.state);

        await this.page.locator("//span[text()=' Submit ']").click();

        await this.page.waitForTimeout(2000);
    }

    // Select address and delivery method
    async selectAddressAndDelivery() {

        await this.page.locator('//input[@type="radio"]').first().click();

        await this.page.locator("//span[text()='Continue']").click();

        await this.page.waitForTimeout(2000);

        await this.page.locator('//input[@type="radio"]').first().click();

        await this.page.locator("//span[text()='Continue']").click();

        await this.page.waitForTimeout(2000);
    }

    // Add new card and fill card details
    async addNewCard(data: {
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

        await this.page.locator(
            '//input[contains(@id,"mat-input-")]'
        ).first().fill(data.name);

        await this.page.locator(
            '//mat-label[text()="Card Number"]'
        ).fill(data.cardNumber);

        await this.page.locator(
            '//select[contains(@id,"mat-input-")]'
        ).first().selectOption(data.expiryMonth);

        await this.page.locator(
            '//select[contains(@id,"mat-input-")]'
        ).nth(1).selectOption(data.expiryYear);

        await this.page.locator('//span[text()=" Submit "]').click();

        await this.page.waitForTimeout(2000);
    }

    // Select payment method
    async selectPaymentMethod() {

        await this.page.locator(
            '//input[@class="mdc-radio__native-control"]'
        ).first().click();

        await this.page.locator("//span[text()='Continue']").click();

        await expect(
            this.page.locator("//h1[text()=' Your Basket ']")
        ).toBeVisible();

        await this.page.locator(
            "//span[text()='Place your order and pay']"
        ).click();

        const thankYouMsg = this.page.locator(
            "//h1[text()='Thank you for your purchase!']"
        );

        await expect(thankYouMsg).toBeVisible();

        console.log("Order Message:", await thankYouMsg.textContent());
    }
}
