const { expect } = require('@playwright/test');
class OrderhistoryPage {

    constructor(page) {

        this.page = page;
        this.rows = page.locator("tbody .ng-star-inserted");
        this.firstProduct = page.locator('tbody .ng-star-inserted').first();
        this.orderid = page.locator(".col-text.-main");
        this.tableBody = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.noOrdersMessage = page.getByText(" You have No Orders to show at this time.")


    }


    async viewOrderDetails(orderId) {

        await this.firstProduct.waitFor();
        const noOfRows = await this.rows.count();
        for (let i = 0; i < noOfRows; i++) {
            const text = await this.rows.nth(i).locator("th").textContent();
            if (await orderId.includes(text)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

    async verifyProduct(orderId) {

        const orderIddetails = await this.orderid.textContent();
        expect(orderId.includes(orderIddetails)).toBeTruthy();

    }

    async deleteAllOrders() {

        await this.tableBody.waitFor();
        const NoofRows = await this.rows.count();
        //always delete from bottom to avoid shifting index problem
        for (let i = NoofRows - 1; i >= 0; i--) {
            await this.rows.nth(i).locator("button").last().click();
            await this.page.waitForTimeout(5000);

        }
    }

    async validateNOOrdersMessageisDisplayed() {
        await expect(this.noOrdersMessage).toBeVisible();
    }

}

module.exports = { OrderhistoryPage }