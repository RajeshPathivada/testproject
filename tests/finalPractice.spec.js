const { test, expect} =require('@azure/playwright');

test("",  async ({browser})=>{


    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    await page.on('dialog', async ({dialog}) => {
        
        await dialog.accept();
        }); 
     
        await page.locator("#confirmbtn").click();


  const  [newPage] =  await Promise.all([

    await page.waitforevent("page"),
    await page.locaotr("#openwindow").click(),
  ])

    }


})