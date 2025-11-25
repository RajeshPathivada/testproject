const { expect } = require('@playwright/test');
class RegistrationPage {

    constructor(page) {
        this.page = page;

    }

    async newUserRegistration() {


        await this.page.getByRole('link', { name: 'Register' }).click();
        await this.page.locator("#firstName").fill('govind');
        await this.page.locator("#lastName").fill("raju");
        await this.page.locator("#userEmail").fill("ramu.rachana@gmail.com");
        await this.page.locator("#userMobile").fill("9987765431");
        await this.page.locator("select").selectOption("Engineer");
        await this.page.locator("[value='Male']").click();
        await this.page.locator("#userPassword").fill("Nanna@143");
        await this.page.locator("#confirmPassword").fill("Nanna@143");
        await this.page.locator("[type='checkbox']").click();
        await this.page.locator("#login").click();
        await expect(this.page.locator(".headcolor")).toBeVisible();


    }

    async existingUserRegistration() {

        await this.page.getByRole('link', { name: 'Register' }).click();
        await this.page.locator("#firstName").fill('govind');
        await this.page.locator("#lastName").fill("raju");
        await this.page.locator("#userEmail").fill("ramu.rachana@gmail.com");
        await this.page.locator("#userMobile").fill("9987765431");
        await this.page.locator("select").selectOption("Engineer");
        await this.page.locator("[value='Male']").click();
        await this.page.locator("#userPassword").fill("Nanna@143");
        await this.page.locator("#confirmPassword").fill("Nanna@143");
        await this.page.locator("[type='checkbox']").click();
        await this.page.locator("#login").click();
        const toastMsg = await this.page.locator("[ aria-label='User already exisits with this Email Id!']");
       
        // Wait for toast message only 
        await expect(toastMsg).toBeVisible({ timeout: 5000 });

        // Validate text
        await expect(toastMsg).toHaveText("User already exisits with this Email Id!");


    }
}

module.exports = {RegistrationPage};