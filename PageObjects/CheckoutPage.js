 const{expect} = require('@playwright/test');
class CheckoutPage{


    constructor(page){
        
        this.page= page;
        


    }
    async verifyProductincart(){

         await  expect(this.page.locator('h3:has-text("IPHONE 13 PRO")')).toBeVisible();
    }
    
    async checkOut(){

          await this.page.getByRole("button",{name: 'Checkout'}).click();
    }
}

module.exports={CheckoutPage};