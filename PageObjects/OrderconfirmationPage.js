
 const{expect} = require('@playwright/test');
class OrderconfirmationPage {

    constructor(page) {

        this.page=page;
        this.orderConfirmationMessage = page.locator(".hero-primary");
        this.ordersButton = page.getByRole('button', { name: 'ORDERS' });
        this.yourOrdersText = page.getByText("Your Orders");
    }

    async verifyOrderConfirmation(productName) {

        await expect(this.orderConfirmationMessage).toContainText("Thankyou for the order.");
         await expect( this.page.getByText(productName)).toBeVisible();   
    }

    async goToOrders() {

          await this.ordersButton.click();    

    }

    async validateYourOrdersText(){
         await expect(this.yourOrdersText).toBeVisible();
    }

}

module.exports={OrderconfirmationPage};