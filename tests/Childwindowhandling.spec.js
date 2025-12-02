const { test} = require('../PageObjects/Fixtures');

test('child windows handling', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),//listener waiting promises -pending,rejected,fulfilled
        documentLink.click(),//page opened

    ]);
   
    const text = await newPage.locator(".red").textContent();
    console.log(text);
    const arraytext = text.split("@")
    const domainname = arraytext[1].split(" ")[0];
    console.log(domainname);

    await page.locator("#username").fill(domainname);
    // await page.pause();
    const textgrabbed = await page.locator("#username").inputValue();
    console.log(textgrabbed);

});
