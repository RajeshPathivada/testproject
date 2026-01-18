const {test,expect} = require("@playwright/test");



exports.test = test.extend({

    AuthToken: async ({ request }, use) => {


        const response = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: {
                    userEmail: "sanapathi@gmail.com",
                    userPassword: "Bhagya@71"
                }
            });
         expect(response.ok()).toBeTruthy();
        const responseJson = await response.json();
        const Token =  responseJson.token;
        await use(Token);

    },


    userData: async ({ }, use) => {
        const user = {
            email: "sanapathi@gmail.com",
            password: "Bhagya@71",
            productName: "iphone 13 pro",
            wrongemail: "wrong@gmail.com",
            wrongpassword: "wrongpassword",
            loginPayLoad: {
                userEmail: "sanapathi@gmail.com",
                userPassword: "Bhagya@71"
            },
            firstName: "govind",
            lastName: "raju",
            userEmail: "ramu.ravindran@gmail.com",
            userMobile: "9985613533",
            option: "Engineer",
            userPassword: "Nanna@143",
            confirmPassword: "Nanna@143",
        }

        await use(user);

    },




});









