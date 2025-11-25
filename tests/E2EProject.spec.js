const { test, expect } = require('@playwright/test');
const { POManager } = require('../PageObjects/POManager');
const email = 'sanapathi@gmail.com';
const password = 'Bhagya@71';
const productName = 'iphone 13 pro';


let page;
let Pomanager;
let loginpage;
let dashboardpage;
let checkoutpage;
let placeorderpage;
let orderconfirmationpage;
let orderhistorypage;
let registrationpage;


// let LoginPayload = {"userEmail":"sanapathi@gmail.com","userPassword":"Bhagya@71"};
// let Token;
//By Pass Authentication Using Api calls 

// test.beforeAll( async ({request})=>{

  
//     const ApiContext = await request.newContext();
//     const LoginResponse = await ApiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",

//         {data: LoginPayload});
//      const LoginResponseJson = await LoginResponse.json();
//       Token = await LoginResponseJson.token;
  

// })


test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    Pomanager = new POManager(page, email, password);
    dashboardpage = Pomanager.DashboardPage(productName);
    loginpage = Pomanager.LoginPage();
    checkoutpage = Pomanager.CheckoutPage();
    placeorderpage = Pomanager.PlaceorderPage();
    orderconfirmationpage = Pomanager.OrderconfirmationPage();
    orderhistorypage = Pomanager.OrderhistoryPage();
    registrationpage = Pomanager.RegistrationPage();
    await loginpage.goTo();
    await loginpage.validLogin();

})

test.afterEach(async () => {

  await page.close();
 })


test("@Web Validate user is able to add product to cart and proceed to checkout successfully", async () => {

    //  const loginpage =  await Pomanager.LoginPage();
    //  await loginpage.goTo(); 
    // await loginpage.validLogin();
    // await loginpage.signOut();
    // await loginpage.invalidLogin("wrong@gmail.com", "wnrgpasword");
    // const errorMsg = await loginpage.getErrorMessage();
    // await expect(errorMsg).toBeVisible();
    // await expect(errorMsg).toHaveText(" Incorrect email or password. ");
    //  await loginpage.validLogin();
    //  await page.addInitScript(value => {

    //     window.localStorage.setItem('token', value);
    // }, Token);
    await dashboardpage.searchProductaddtoCart();
    await dashboardpage.gotoCart();
    await checkoutpage.verifyProductincart();
    await checkoutpage.checkOut();
    await placeorderpage.enterPaymentDetails();
    await placeorderpage.placeOrder();
    const orderId = await orderconfirmationpage.verifyOrderConfirmation();
    await orderconfirmationpage.goToOrders();
    await orderhistorypage.viewOrderDetails(orderId);
    await orderhistorypage.verifyProduct(orderId);
    await dashboardpage.signOut();

}); 


test('@Web Validate user is able to login successfully', async () => {


    await expect(page.locator("[aria-label='Login Successfully']")).toBeVisible();


});



test("@Web Validate user is able to register successfully", async () => {


    await dashboardpage.signOut();
    await registrationpage.newUserRegistration();

});



test("@Web Validate user receives a error popup when an existing user gets registered again", async () => {

    await dashboardpage.signOut();
    await registrationpage.existingUserRegistration();


})


test("@Web Validate user is able to receive a popup for any of the invalid credentials", async () => {
    await dashboardpage.signOut();
    await loginpage.invalidLogin("wrong@gmail.com", "wrngpassword");

});


test("@Web Validate user is able to navigate to home page when user clicks on Automation title from any page", async () => {
    //  await page.addInitScript(value => {

    //     window.localStorage.setItem('token', value);
    // }, Token);
    await orderconfirmationpage.goToOrders();
    await dashboardpage.gotoHome();
    await dashboardpage.gotoCart();
    await dashboardpage.gotoHome();

}
);


test("@Web Validate user is able to search for a product and able to order the product successfully", async () => {
    //  await page.addInitScript(value => {

    //     window.localStorage.setItem('token', value);
    // }, Token);
    await dashboardpage.searchProductinSearchBarAddtoCart();
    await dashboardpage.gotoCart();
    await checkoutpage.verifyProductincart();
    await checkoutpage.checkOut();
    await placeorderpage.enterPaymentDetails();
    await placeorderpage.placeOrder();
    await orderconfirmationpage.verifyOrderConfirmation();


})



test("@Web Validate user is able to set minimum and maximum price and then select the first product and able to placee the order successfully", async () => {
    
    //  await page.addInitScript(value => {

    //     window.localStorage.setItem('token', value);
    // }, Token);
    await dashboardpage.setMinPriceandMaxPricefindProductAddtoCart();
    await dashboardpage.gotoCart();
    await checkoutpage.verifyProductincart();
    await checkoutpage.checkOut();
    await placeorderpage.enterPaymentDetails();
    await placeorderpage.placeOrder();
    await orderconfirmationpage.verifyOrderConfirmation();


})


test("@Web Validate user is able to click on fashion and validate no products found message", async () => {
    
    //  await page.addInitScript(value => {

    //     window.localStorage.setItem('token', value);
    // }, Token);

    await dashboardpage.categorySelection();


});


test("@Web Validate user is able to empty orders and validate no orders in the orderspage and then add a product and validate in cart", async () => {
   
    //  await page.addInitScript(value => {

    //     window.localStorage.setItem('token', value);
    // }, Token);
    await orderconfirmationpage.goToOrders(); 
    await orderhistorypage.deleteAllOrders();
    await dashboardpage.gotoHome();
    await dashboardpage.searchProductaddtoCart();
    await dashboardpage.gotoCart();
    await checkoutpage.verifyProductincart();
    await checkoutpage.checkOut();
    await placeorderpage.enterPaymentDetails();
    await placeorderpage.placeOrder();
    await orderconfirmationpage.verifyOrderConfirmation();
    await orderconfirmationpage.goToOrders();

   
});



test("@Web Validate user is able to empty cart and validate no products in cart ",async()=>{
    
    //   page.addInitScript(value => {

    //     window.localStorage.setItem('token', value);
    // }, Token);
    await dashboardpage.gotoCart();
    await dashboardpage.deleteAllCartItems();

   

});











































