const {test,expect} = require("@playwright/test")

test("storage state usage", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("sanapathi@gmail.com");
    await page.locator("#userPassword").fill("Bhagya@71");
    await page.locator("#login").click();
    await expect(page.locator("div .left")).toBeVisible();

    await page.context().storageState({path : 'auth.json'});


});


test("login using storage state", async ({page})=>{


    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await expect(page.locator("div .left")).toBeVisible();
});

test("more validations", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    

    page.on('dialog', async (dialog) => {
        await dialog.accept();  //event listenrer 
    })

    await page.locator("#confirmbtn").click(); 
 //trigger action

})

test("new window handling", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");


    const  [newtab] = await Promise.all([

        page.waitForEvent('popup'),
        page.locator("#opentab").click(),
    ]);

    await newtab.waitForLoadState();
    await  expect(newtab).toHaveURL("https://www.qaclickacademy.com/");
    await page.bringToFront();
    await page.pause();

    

});

test("file download handling", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    

    const[download] = await Promise.all([

        page.waitForEvent('download'),
        page.locator("#downloadButton").click(),
    ])

    await download.saveAs("downloads/example.pdf");

})

test("file upload handling", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
   
    await page.locator("#fileinput").setInputFiles("C:\\Users\\rpathivada\\Downloads\\download.xlsx");
  


});

test("iframes handling", async ({page})=>{

   
 await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const framepage = page.frameLocator("#courses-iframe");

await page.locator("#gf-BIG").scrollIntoViewIfNeeded();
await page.pause();

});