const { test, expect } = require("@playwright/test");
const  loginData  = require("../Utils/loginData.json");



for (const data of loginData) {

    test(`login test - ${data.scenario}`, async ({ page }) => {

        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await page.locator("#userEmail").fill(data.email);
        await page.locator("#userPassword").fill(data.password);
        await page.locator("#login").click();


        if (data.expected === 'success') {
            await expect(page).toHaveURL(/dashboard/);
        } else {
            await expect(page.locator('[aria-label="Incorrect email or password."]')).toBeVisible();
        }
    }
    );


}