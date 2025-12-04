
 const{expect} = require('@playwright/test');
class OrderconfirmationPage {

    constructor(page) {

        this.page=page;
        
    }

    async verifyOrderConfirmation() {

        await expect(this.page.locator(".hero-primary")).toContainText("Thankyou for the order.");
         await expect(this.page.getByText('iphone 13 pro')).toBeVisible();
       

    }

    async goToOrders() {

          await this.page.getByRole('button', { name: 'ORDERS' }).click();
           await expect(this.page.getByText("Your Orders")).toBeVisible();
       

    }

}

module.exports={OrderconfirmationPage};