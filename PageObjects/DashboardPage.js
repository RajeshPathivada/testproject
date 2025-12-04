const {expect} = require('@playwright/test');

class DashboardPage {

    constructor(page,productName) {

        this.page = page;
       this.productName=productName;
    }

    async searchProductaddtoCart() {

        await this.page.locator(".card-body").first().waitFor();
        const products = this.page.locator(".card-body");
        const productTitles = this.page.locator(".card-body b");
        const NoofProducts = await productTitles.count();
        for (let i = 0; i < NoofProducts; i++) {

            if (await products.nth(i).locator("b").textContent() === this.productName) {

                await products.nth(i).locator('text=  Add To Cart').click();
                break;
            }

        }

    }

    async gotoHome() {
        await this.page.locator("nav p").click();
        await expect(this.page.locator("section #burgundy")).toBeVisible();
    }

    async gotoCart() {

        await this.page.locator("[routerlink*='cart']").click();
        await expect(this.page.locator("text=My Cart")).toBeVisible();

    }


    async signOut() {
        await this.page.getByRole('button', { name: ' Sign Out ' }).click();
        await expect(this.page.locator("[aria-label='Logout Successfully']")).toBeVisible();

    }

    async searchProductinSearchBarAddtoCart() {

        const searchbar = this.page.locator("div[class='py-2 border-bottom ml-3'] input[placeholder='search']");
        await searchbar.click();
        await searchbar.pressSequentially("iphone", { delay: 150 });
        await searchbar.press("Enter");


        const results = await this.page.locator("#res");
        await expect(results).toHaveText("Showing 1 results   | ");
        await this.page.locator('button:has-text("Add To Cart")').click();


    }

    async setMinPriceandMaxPricefindProductAddtoCart() {

        const minPrice = await this.page.locator("section input[placeholder='Min Price']");
        const maxPrice = await this.page.locator("section input[placeholder='Max Price']");
        await minPrice.click();
        await minPrice.fill("12000");
        await maxPrice.click();
        await maxPrice.fill("55000");
        await maxPrice.press("Enter");
        const results = await this.page.locator("#res");
        await expect(results).toHaveText("Showing 1 results   | ");
        await this.page.locator('button:has-text("Add To Cart")').click();

    }

    async categorySelection() {
        await this.page.locator("section input[type='checkbox']").first().click();
        await expect(this.page.locator("[aria-label='No Products Found']")).toHaveText(" No Products Found ");
    }


    async deleteAllCartItems() {

        const products = await this.page.locator("div ul[class*='ng-star-inserted']");
        const NoofProducts = await products.count();
        for (let i = NoofProducts - 1; i >= 0; i--) {
            await products.nth(i).locator(".btn.btn-danger").click();
            await this.page.waitForTimeout(5000);

        }
        await expect(this.page.getByText("No Products in Your Cart !")).toBeVisible();
    }

}
module.exports = { DashboardPage };