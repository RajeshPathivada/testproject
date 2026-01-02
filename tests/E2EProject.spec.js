const { test } = require("../PageObjects/Fixtures");
const { request } = require("@playwright/test");
const { POManager } = require('../PageObjects/POManager');
const TestData = require("../Utils/E2EProjectTestData.json");
const { ApiUtils } = require("../Utils/ApiUtils");

let page;
let Pomanager;
let loginpage;
let dashboardpage;
let checkoutpage;
let placeorderpage;
let orderconfirmationpage;
let orderhistorypage;
let registrationpage;
let orderId;


test.beforeAll("Create Order API", async () => {
    const ApiContext = await request.newContext();
    const apicontext = new ApiUtils(ApiContext, TestData.loginPayLoad, TestData.orderPayload);
    orderId = await apicontext.createOrder();
});


test.beforeEach(async ({ browser, AuthToken }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    Pomanager = new POManager(page);
    dashboardpage = Pomanager.dashboardPage();
    loginpage = Pomanager.loginPage();
    checkoutpage = Pomanager.checkoutPage();
    placeorderpage = Pomanager.placeorderPage();
    orderconfirmationpage = Pomanager.orderConfirmationPage();
    orderhistorypage = Pomanager.orderHistoryPage();
    registrationpage = Pomanager.registrationPage();

    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, AuthToken);

    await loginpage.goTo(TestData.url);
});

test.afterEach("Page close", ()=>{

     page.close();
})


test.describe("After Login functionalities", () => {

    test("@Web Validate user is able to add product to cart and proceed to checkout successfully", async () => {
        await dashboardpage.searchProductaddtoCart(TestData.productName);
        await dashboardpage.gotoCart();
        await checkoutpage.verifyProductinCart(TestData.productName);
        await checkoutpage.checkOut();
        await placeorderpage.enterPaymentDetails(TestData.productName,TestData.cardNumber, TestData.month, TestData.year, TestData.cvv, TestData.nameOnCard, TestData.couponCode, TestData.country)
        await placeorderpage.placeOrder();
        await orderconfirmationpage.verifyOrderConfirmation(TestData.productName);
        await orderconfirmationpage.goToOrders();
        await orderhistorypage.viewOrderDetails(orderId);
        await orderhistorypage.verifyProduct(orderId);
        await dashboardpage.signOut();

    });


    test("@Web Validate user is able to navigate to home page when user clicks on Automation title from any page", async () => {

        await orderconfirmationpage.goToOrders();
        await orderconfirmationpage.validateYourOrdersText();
        await dashboardpage.gotoHome();
        await dashboardpage.validateFilterstext();
        await dashboardpage.gotoCart();
        await dashboardpage.validateMyCartText();
        await dashboardpage.gotoHome();

    }
    );


    test("@Web Validate user is able to search for a product and able to order the product successfully", async () => {

        await dashboardpage.searchProductinSearchBar(TestData.productName);
        await dashboardpage.validateResultsareDisplayed();
        await dashboardpage.addtoCart();
        await dashboardpage.gotoCart();
        await checkoutpage.verifyProductinCart(TestData.productName);
        await checkoutpage.checkOut();
        await placeorderpage.enterPaymentDetails(TestData.productName,TestData.cardNumber, TestData.month, TestData.year, TestData.cvv, TestData.nameOnCard, TestData.couponCode, TestData.country);
        await placeorderpage.placeOrder();
        await orderconfirmationpage.verifyOrderConfirmation(TestData.productName);


    })

    test("@Web Validate user is able to set minimum and maximum price and then select the first product and able to placee the order successfully", async () => {


        await dashboardpage.setMinprice(TestData.minPrice);
        await dashboardpage.setMaxprice(TestData.maxPrice);
        await dashboardpage.validateResultsareDisplayed();
        await dashboardpage.addtoCart();
        await dashboardpage.gotoCart();
        await checkoutpage.verifyProductinCart(TestData.productName);
        await checkoutpage.checkOut();
        await placeorderpage.enterPaymentDetails(TestData.productName,TestData.cardNumber, TestData.month, TestData.year, TestData.cvv, TestData.nameOnCard, TestData.couponCode, TestData.country);
        await placeorderpage.placeOrder();
        await orderconfirmationpage.verifyOrderConfirmation(TestData.productName);


    })


    test("@Web Validate user is able to click on fashion and validate no products found message", async () => {



        await dashboardpage.categorySelection();
        await dashboardpage.validateNoProductsFoundMessage();

    });


    test("@Web Validate user is able to empty orders and validate no orders in the orderspage and then add a product and validate in cart", async () => {


        await orderconfirmationpage.goToOrders();
        await orderhistorypage.deleteAllOrders();
        await orderhistorypage.validateNOOrdersMessageisDisplayed();
        await dashboardpage.gotoHome();
        await dashboardpage.searchProductaddtoCart(TestData.productName);
        await dashboardpage.gotoCart();
        await checkoutpage.verifyProductinCart(TestData.productName);
        await checkoutpage.checkOut();
        await placeorderpage.enterPaymentDetails(TestData.productName,TestData.cardNumber, TestData.month, TestData.year, TestData.cvv, TestData.nameOnCard, TestData.couponCode, TestData.country);
        await placeorderpage.placeOrder();
        await orderconfirmationpage.verifyOrderConfirmation(TestData.productName);
        await orderconfirmationpage.goToOrders();


    });

    test("Add products to cart", async ()=>{
  
        await dashboardpage.searchProductaddtoCart(TestData.productName);
        await checkoutpage.verifyProductinCart(TestData.productName);

    });


    test("@Web Validate user is able to empty cart and validate no products in cart ", async () => {


        await dashboardpage.gotoCart();
        await dashboardpage.deleteAllCartItems();
        await dashboardpage.validateNoProductsinCartMessage()



    });


    test("@Web Validate user is able to search for a product and able to Cart successfully", async () => {

        await dashboardpage.searchProductaddtoCart(TestData.productName);
        await dashboardpage.gotoCart();
    });

});

test.describe("Before Login functionalities", () => {



    test('@Web Validate user is able to login successfully', async () => {

        await dashboardpage.signOut();
        await dashboardpage.validateLogoutSuccessMessage();
        await loginpage.enterEmailandPassword(TestData.email, TestData.password);
        await loginpage.Login();
        await loginpage.validateLoginSuccessMessage();


    });



    test("@Web Validate user is able to register successfully", async () => {

        await dashboardpage.signOut();
        await dashboardpage.validateLogoutSuccessMessage();
        await registrationpage.newUserRegistration();
        await registrationpage.firstName(TestData.firstName);
        await registrationpage.lastName(TestData.lastName);
        await registrationpage.userEmail(TestData.userEmail);
        await registrationpage.mobileNumber(TestData.mobileNumber);
        await registrationpage.occupation(TestData.option);
        await registrationpage.maleOption();
        await registrationpage.password(TestData.userPassword);
        await registrationpage.confirmPassword(TestData.confirmPassword);
        await registrationpage.checkbox();
        await registrationpage.register();
        await registrationpage.validateNewUserRegistrationMessage();
    });


    test("@Web Validate user receives a error popup when an existing user gets registered again", async () => {

        await dashboardpage.signOut();
        await dashboardpage.validateLogoutSuccessMessage();
        await registrationpage.existingUserRegistration();
        await registrationpage.firstName(TestData.firstName);
        await registrationpage.lastName(TestData.lastName);
        await registrationpage.userEmail(TestData.userEmail);
        await registrationpage.mobileNumber(TestData.mobileNumber);
        await registrationpage.occupation(TestData.option);
        await registrationpage.maleOption();
        await registrationpage.password(TestData.userPassword);
        await registrationpage.confirmPassword(TestData.confirmPassword);
        await registrationpage.checkbox();
        await registrationpage.register();
        await registrationpage.validateExistingUserRegistrationMessage();


    })


    test("@Web Validate user is able to receive a popup for any of the invalid credentials", async () => {

        await dashboardpage.signOut();
        await dashboardpage.validateLogoutSuccessMessage();
        await loginpage.enterEmailandPassword(TestData.wrongemail, TestData.wrongpassword);
        await loginpage.Login();
        await loginpage.invalidLoginMessage();

    });
})









































