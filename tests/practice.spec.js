const {test} =require("@playwright/test");

test("",async({browser})=>{


   const context =  await browser.newContext();
   const page = await context.newPage();
   const documentlink =  page.locator(".blinkingText");
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  
 

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentlink.click(),
  ]);

  

    
   const title = await newPage.locator(".inner-box").textContent();
   console.log(title);




})