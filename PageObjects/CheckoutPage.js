 const{expect} = require('@playwright/test');
class CheckoutPage{


    constructor(page){
        
        this.page= page;
        //Parameterize this xpath 
        this.checkoutButton = page.getByRole("button",{name: 'Checkout'})


    }
    async verifyProductinCart(productName){
         
         await  expect(this.page.getByText(productName)).toBeVisible();
    }
    
    async checkOut(){

          await this.checkoutButton.click();
    }
}

module.exports={CheckoutPage};