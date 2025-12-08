const { expect } = require('@playwright/test');
class RegistrationPage{

    constructor(page) {
        this.page = page;
        this.registerButton = page.getByRole('link', { name: 'Register' });
        this.FirstName = page.locator("#firstName");
        this.LastName = page.locator("#lastName");
        this.UserEmail = page.locator("#userEmail");
        this.MobileNumber = page.locator("#userMobile");
        this.dropdown = page.locator("select");
        this.MaleOption = page.locator("[value='Male']");
         this.FemaleOption = page.locator("[value='female']");
        this.Password = page.locator("#userPassword");
        this.ConfirmPassword = page.locator("#confirmPassword");
        this.Checkbox = page.locator("[type='checkbox']");
        this.submitButton = page.locator("#login");
        this.toastMsg = page.locator("[ aria-label='User already exisits with this Email Id!']");
        this.registrationSuccessfullMessage = page.locator(".headcolor");
    }

    async newUserRegistration() {

        await this.registerButton.click();      
    
    }

    async firstName(firstName) {
           await this.FirstName.fill(firstName);
       
    }

    
    async lastName(lastName){
         await this.LastName.fill(lastName);
    }

    async userEmail(userEmail){
     await this.UserEmail.fill(userEmail);
    }

    async mobileNumber(mobileNumber){
          await this.MobileNumber.fill(mobileNumber);
    }



    async occupation(option){
         await this.dropdown.selectOption(option);
    }
    async femaleOption(){

          await this.FemaleOption.click();
    }

    async maleOption(){
        await this.MaleOption.click();
       
    }


    async password(userPassword){
         await this.Password.fill(userPassword);
    }

    async confirmPassword(confirmPassword){
         await this.ConfirmPassword.fill(confirmPassword);
    }

    async checkbox(){
         await this.Checkbox.click();
    }

    async register(){
          await this.submitButton.click();
    }

    async validateNewUserRegistrationMessage(){
         await expect(this.registrationSuccessfullMessage).toBeVisible();
    }

    async existingUserRegistration() {
     
        await this.registerButton.click();
       
    }

    async validateExistingUserRegistrationMessage(){

         await expect(this.toastMsg).toBeVisible();

        // Validate text
        await expect(this.toastMsg).toHaveText("User already exisits with this Email Id!");
    }
}

module.exports = {RegistrationPage};