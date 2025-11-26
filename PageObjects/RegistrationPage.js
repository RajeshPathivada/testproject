const { expect } = require('@playwright/test');
const TestData = require("../Utils/E2EProjectTestData.json");
class RegistrationPage {

    constructor(page) {
        this.page = page;

    }

    async newUserRegistration() {


        await this.page.getByRole('link', { name: 'Register' }).click();
        await this.page.locator("#firstName").fill(TestData.firstName);
        await this.page.locator("#lastName").fill(TestData.lastName);
        await this.page.locator("#userEmail").fill(TestData.userEmail);
        await this.page.locator("#userMobile").fill(TestData.userMobile);
        await this.page.locator("select").selectOption(TestData.option);
        await this.page.locator("[value='Male']").click();
        await this.page.locator("#userPassword").fill(TestData.userPassword);
        await this.page.locator("#confirmPassword").fill(TestData.confirmPassword);
        await this.page.locator("[type='checkbox']").click();
        await this.page.locator("#login").click();
        await expect(this.page.locator(".headcolor")).toBeVisible();


    }

    async existingUserRegistration() {

        await this.page.getByRole('link', { name: 'Register' }).click();
        await this.page.locator("#firstName").fill(TestData.firstName);
        await this.page.locator("#lastName").fill(TestData.lastName);
        await this.page.locator("#userEmail").fill(TestData.userEmail);
        await this.page.locator("#userMobile").fill(TestData.userMobile);
        await this.page.locator("select").selectOption(TestData.option);
        await this.page.locator("[value='Male']").click();
        await this.page.locator("#userPassword").fill(TestData.userPassword);
        await this.page.locator("#confirmPassword").fill(TestData.confirmPassword);
        await this.page.locator("[type='checkbox']").click();
        await this.page.locator("#login").click();
        const toastMsg = await this.page.locator("[ aria-label='User already exisits with this Email Id!']");
       
        // Wait for toast message only 
        await expect(toastMsg).toBeVisible();

        // Validate text
        await expect(toastMsg).toHaveText("User already exisits with this Email Id!");


    }
}

module.exports = {RegistrationPage};