 const{expect} = require('@playwright/test');
class OrderhistoryPage {

    constructor(page) {

        this.page= page;
      

    }


    async viewOrderDetails(orderId) {

        await this.page.locator('tbody .ng-star-inserted').first().waitFor();
        const rows =  await this.page.locator("tbody .ng-star-inserted");
        const noOfRows = await rows.count();
       
       

        for (let i = 0; i < noOfRows; i++) {
            const text = await rows.nth(i).locator("th").textContent();
            if (await orderId.includes(text)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

 async verifyProduct(orderId){
       
     const orderIddetails = await this.page.locator(".col-text.-main").textContent();
    expect(orderId.includes(orderIddetails)).toBeTruthy(); 

 }

 async deleteAllOrders(){
   
     
        await this.page.locator("tbody").waitFor();
        const rows = await this.page.locator("tbody tr");
        const NoofRows = await rows.count();
    
        //always delete from bottom to avoid shifting index problem
        for (let i = NoofRows - 1; i >= 0; i--) {
    
            await rows.nth(i).locator("button").last().click();
            await this.page.waitForTimeout(5000);
            //const updatedRows = await rows.count();
    
        }
    
        await expect(this.page.getByText(" You have No Orders to show at this time.")).toBeVisible();

 }

}
 
module.exports={OrderhistoryPage}