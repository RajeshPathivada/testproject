 const{expect} = require('@playwright/test');
 

class LoginPage {



    constructor(page, email, password) {
        this.page = page;
        this.email = email;
        this.password = password;

    }


    async goTo() {

        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await expect(this.page).toHaveTitle("Let's Shop");
    }

    async validLogin() {
        await this.page.locator("#userEmail").fill(this.email);
        await this.page.locator('#userPassword').fill(this.password);
        await this.page.locator("#login").click();
        await expect(this.page.locator("[aria-label='Login Successfully']")).toBeVisible();

        // await this.page.waitForLoadState("networkidle"); //wait for page until all network calls are made and it becomes idle.
         
    }

    async invalidLogin(email,password) {
        await this.page.locator("#userEmail").fill(email);
        await this.page.locator('#userPassword').fill(password);
        await this.page.locator("#login").click();
       await expect(this.page.locator("[aria-label='Incorrect email or password.']")).toHaveText(/Incorrect email or password./i);
}

 async  getErrorMessage(){

     
     return this.page.getByRole('alert', {name: ' Incorrect email or password. '})
  }



}
module.exports = { LoginPage };