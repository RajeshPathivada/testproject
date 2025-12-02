const{test, expect} = require('@playwright/test') 

test("Screenshot test", async ({ page }) => {

   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
      await page.goto("http://google.com");
      await page.goBack();
      await page.goForward();

   await expect(page.locator("#displayed-text")).toBeVisible();
   await page.locator("#displayed-text").screenshot({path: 'element screenshot.png'});
   await page.locator("#hide-textbox").click();
   await page.screenshot({path: 'screenshot.png'});
   await expect(page.locator("#displayed-text")).toBeHidden();

});



test("visual test", async ({ page }) => {

   await page.goto("https://en.wikipedia.org/wiki/Narendra_Modi");
   
    expect (await page.screenshot()).toMatchSnapshot("modi.png");

});
