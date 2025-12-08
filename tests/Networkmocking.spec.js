const { test, request, expect } = require('@playwright/test');

const loginPayLoad = {
  userEmail: "sanapathi@gmail.com",
  userPassword: "Bhagya@71"
};

let fakepayLoad = { data: [], message: "No Orders" };

test("intercepting api calls practice", async ({ page }) => {

  // 1️⃣ Login via API to get token
  const apiContext = await request.newContext();
  const response = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    { data: loginPayLoad }
  );

  const Jsonresponse = await response.json();
  const token = Jsonresponse.token;

  // 2️⃣ Inject token into localStorage before page load
 
  await page.addInitScript(value => {
    window.localStorage.setItem("token",value)},token);

  // 3️⃣ Intercept API call BEFORE page navigation
    
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",

    async route =>{
        route.fulfill({
            body: JSON.stringify(fakepayLoad),
        })
    }
  )


  // 4️⃣ Navigate to client app
  await page.goto("https://rahulshettyacademy.com/client");

  // 5️⃣ Trigger API call from UI
  await page.locator("button[routerlink*='myorders']").click();
  await page.pause();

});


