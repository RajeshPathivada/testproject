const { expect } = require('@playwright/test');


class LoginPage {

    constructor(page) {
        this.page = page;
        this.userEmail = page.locator("#userEmail");
        this.userPassword = page.locator('#userPassword');
        this.login = page.locator("#login");
        this.loginSuccessMessage = page.locator("[aria-label='Login Successfully']");
        this.loginFailMessage = page.locator("[aria-label='Incorrect email or password.']");
        this.incorrectMailAlert = page.getByRole('alert', { name: ' Incorrect email or password. ' });

    }

    async goTo(url) {

        await this.page.goto(url);
        await expect(this.page).toHaveTitle("Let's Shop");
    }

    
    async enterEmailandPassword(email,password) {
        await this.userEmail.fill(email);
        await this.userPassword.fill(password);
       
          // await this.page.waitForLoadState("networkidle"); //wait for page until all network calls are made and it becomes idle.

    }
    async Login(){
         await this.login.click();
    }


    async validateLoginSuccessMessage(){
         await expect(this.loginSuccessMessage).toBeVisible();
    }

  
    async invalidLoginMessage(){
          await expect(this.loginFailMessage).toHaveText(/Incorrect email or password./i);
    
    }
      
   

}
module.exports = { LoginPage };