const { test, expect } = require("@playwright/test");
const {practiceAPI} =require("../tests/practiceAPI");

let context;
let page;
test.beforeAll("login before all tests", async ({browser})=>{

context = await browser.newContext();
 page = await context.newPage();
const practiceapi = new practiceAPI();
const token = await practiceapi.apicontext();

    await page.addInitScript(value => {
        window.localStorage.setItem("token",value)} ,token);    
   
 


 await page.goto("https://rahulshettyacademy.com/client/#/auth/login");



})


test("interview practice", async () => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("sanapathi@gmail.com");
    await page.locator("#userPassword").fill("Bhagya@71");
    await page.locator("#login").click();
    await expect(page.locator("div .left")).toBeVisible();
});

test(" search product add to cart", async () => {

    
   await expect(page.locator(".container")).toBeVisible();
    const products = await page.locator(".card-body b");
    const totalNoOfProducts = await products.count();

    for (let i = 0; i < totalNoOfProducts; i++) {
        if (await products.nth(i).textContent() === "iphone 13 pro") {

            await page.locator(".card-body").nth(i).getByRole("button", { name: "Add To Cart" }).click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();

    await expect(page.getByText("My Cart")).toBeVisible();

    await expect(page.getByText("iphone 13 pro")).toBeVisible();
    await page.getByRole("button", { name: "Checkout" }).click();

    await page.locator("input[value='4542 9931 9292 2293']").fill(" ");
    await page.locator("input[value='4542 9931 9292 2293']").fill("3421123456780987");
    await page.locator(".ddl").first().selectOption("05");
    await page.locator(".ddl").nth(1).selectOption("16");
    await page.locator(".txt").nth(1).fill("123");
    await page.locator(".txt").nth(2).fill("Rajesh");
    await page.locator(".txt").nth(3).fill("rahulshettyacademy");
    await page.getByRole("button", { name: "Apply Coupon" }).click();
    await page.locator("[placeholder='Select Country']").click();
    await page.locator("[placeholder='Select Country']").pressSequentially("ind");
    await expect(page.locator(".ta-results")).toBeVisible();
    const dropdown = page.locator(".ta-results");
    const NoOfCountries = await page.locator(".ta-item").count();
    for (let i = 0; i < NoOfCountries; i++) {
        if ((await page.locator(".ta-item").nth(i).textContent()).trim() === "India") {

            await page.locator(".ta-item").nth(i).click();
            break;
        }
    }


    await page.locator(".btnn.action__submit.ng-star-inserted").click();
    await expect(page.getByText("iphone 13 pro")).toBeVisible();
    const orderId = await page.locator("td  label.ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();

    await expect(page.locator("tbody")).toBeVisible();
    const rows = page.locator(" tbody tr");
    const NoOfRows = await rows.count();

    for (let i = 0; i < NoOfRows; i++) {

        if (orderId.includes(await rows.nth(i).locator("th").textContent())) {

            await rows.nth(i).locator("button").first().click();
            break;
        }

    }

    await page.pause();

});

test("delete all orders", async ()=>{
      
     await page.locator("[routerlink*='myorders']").click();
     await expect(page.locator("tbody")).toBeVisible();
      const rows = page.locator(" tbody tr");
    const NoOfRows = await rows.count();

    for(let i = NoOfRows-1; i>=0; i--){
        await rows.nth(i).locator("button").nth(1).click();
    }
    // await expect(page.getByText(" You have No Orders to show at this time.")).toBeVisible();
    await expect(page.locator(" tbody tr")).toHaveCount(0);
    await page.waitForResponse(response => response.url().includes("api/orders")) && response.status() === 200)
    await page.on('dialog',async dailog =>{
        await  dailog.dismiss();
    }
    await page.locator("#alrtBtn").click();

    await [download] = promise.all([
        page.waitforevent('download'),
        page.locator("#donwlaod").click()

    ]);

    await download.savAs("downloads/orderdetails.pdf");
    
);
 


