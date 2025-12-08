const { expect } = require('@playwright/test');

class DashboardPage {

    constructor(page) {

        this.page = page;
        this.firstProduct = page.locator(".card-body").first();
        this.products = page.locator(".card-body");
        this.productTitles = page.locator(".card-body b");
        this.homePage = page.locator("nav p");
        this.filterText = page.locator("section #burgundy");
        this.gotocart = page.locator("[routerlink*='cart']");
        this.myCartText = page.locator("text=My Cart");
        this.signoutButton = page.getByRole('button', { name: ' Sign Out ' });
        this.logoutSuccessMessage = page.locator("[aria-label='Logout Successfully']"); 
        this.searchBar = page.locator("div[class='py-2 border-bottom ml-3'] input[placeholder='search']");
        this.results = page.locator("#res");
        this.addToCartButton = page.locator('button:has-text("Add To Cart")');
        this.minPrice = page.locator("section input[placeholder='Min Price']");
        this.maxPrice = page.locator("section input[placeholder='Max Price']");
        this.checkbox = page.locator("section input[type='checkbox']").first();
        this.noProductsFoundMessage = page.locator("[aria-label='No Products Found']");
        this.productInCart = page.locator("div ul[class*='ng-star-inserted']");
        this.noProductsInCartMessage = page.getByText("No Products in Your Cart !");

    }

    async searchProductaddtoCart(productName) {

        await this.firstProduct.waitFor();

        const NoofProducts = await this.productTitles.count();
        for (let i = 0; i < NoofProducts; i++) {

            if (await this.products.nth(i).locator("b").textContent() === productName) {

                await this.products.nth(i).locator('text=  Add To Cart').click();
                break;
            }

        }

    }

    async gotoHome() {
        await this.homePage.click();
       
    }

    async validateFilterstext(){
         await expect(this.filterText).toBeVisible();
    }
    async gotoCart() {

        await this.gotocart.click();
        

    }

    async validateMyCartText(){
        await expect(this.myCartText).toBeVisible();
    }




    async signOut() {
        await this.signoutButton.click();
        

    }
    
    async validateLogoutSuccessMessage(){
        await expect(this.logoutSuccessMessage).toBeVisible();
    }


    async searchProductinSearchBar(productName) {

        await this.searchBar.click();
        await this.searchBar.pressSequentially(productName, { delay: 150 });
        await this.searchBar.press("Enter");

    }



    async setMinprice(minPrice){
         await this.minPrice.click();
        await this.minPrice.fill(minPrice);
    }

    async setMaxprice(maxPrice){

         await this.maxPrice.click();
        await this.maxPrice.fill(maxPrice);
         await this.maxPrice.press("Enter");
    }


  

    async validateResultsareDisplayed(){
        
        await expect(this.results).toContainText("Showing 1 results   | ");
       

    }

    async addtoCart(){
         await this.addToCartButton.click();
    }



    async categorySelection() {
        await this.checkbox.click();
        
    }

    async validateNoProductsFoundMessage(){
        await expect(this.noProductsFoundMessage).toHaveText(" No Products Found ");
    }

    async deleteAllCartItems() {


        const NoofProducts = await this.products.count();
        for (let i = NoofProducts - 1; i >= 0; i--) {
            await this.products.nth(i).locator(".btn.btn-danger").click();
            await this.page.waitForTimeout(5000);

        }
       
    }

    async validateNoProductsinCartMessage(){
         await expect(this.noProductsInCartMessage).toBeVisible();
    }

}
module.exports = { DashboardPage };