const { expect } = require('@playwright/test');

class PlaceorderPage {

    constructor(page) {
        this.page = page;
        this.productTitle = page.locator("div .item__title");
        this.cardNumber = page.locator(".input.txt.text-validated").first();
        this.month = page.locator(".input.ddl").first();
        this.year = page.locator(".input.ddl");
        this.cvv = page.locator(".input.txt");
        this.name = page.locator(".input.txt");
        this.coupon = page.locator("[name ='coupon']");
        this.applyCouponButton = page.locator("[type='submit']");
        this.confirmationEmail = page.getByText("sanapathi@gmail.com");
        this.searchBar = page.getByPlaceholder("Select Country");
        this.dropdown = page.locator(".ta-results");
        this.options = page.locator(".ta-results").locator('.ta-item');
        this.placeorder = page.locator(".btnn.action__submit.ng-star-inserted");

    }

    async enterPaymentDetails(productName,cardNumber,month,year,cvv,nameOnCard,couponCode,country,) {

        await expect(this.productTitle).toHaveText(productName);
        await this.cardNumber.fill(cardNumber);
        await this.month.selectOption(month);
        await this.year.nth(1).selectOption(year);
        await this.cvv.nth(1).fill(cvv)
        await this.name.nth(2).fill(nameOnCard);
        await this.coupon.fill(couponCode);
        await this.applyCouponButton.click();
        expect(await this.confirmationEmail.isVisible()).toBeTruthy();
        await this.searchBar.click();
        await this.searchBar.pressSequentially(country, { delay: 150 });
        await expect(this.dropdown).toBeVisible({ timeout: 5000 });
        const NoofButtons = await this.options.count();
        for (let i = 0; i < NoofButtons; i++) {

            if ((await this.options.nth(i).textContent()).trim() === country) {
                await this.options.nth(i).click();
                break;
            }
        }
    }
    async placeOrder() {

        await this.placeorder.click();
    }
}

module.exports = { PlaceorderPage };