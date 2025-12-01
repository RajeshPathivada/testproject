const base = require("@playwright/test");



exports.test = base.test.extend({

    AuthToken: async ({ request }, use) => {


        const response = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: {
                    userEmail: "sanapathi@gmail.com",
                    userPassword: "Bhagya@71"
                }
            });
        const responseJson = await response.json();
        const Token = await responseJson.token;
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









