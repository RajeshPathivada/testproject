const { expect, request } = require("@playwright/test");

class practiceAPI {


   constructor() {

   }

   async apicontext() {

      // const apiContext = await request.newContext();
      // const response = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
      //    data: {
      //       userEmail: "sanapathi@gmail.com",
      //       userPassword: "Sanapathi@123"

      //    },
      // });

      const apicontext = await request.newContext();
      const response = await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
         data: {
            userEmail: "sanapathi@gmail.com",
            userPassword: "Bhagya@71"
         },
      });

 

   
  
       expect(response.ok()).toBeTruthy();
      const jsonrespnse = await response.json();
      const token = await jsonrespnse.token;
      return token;



   }
} module.exports = { practiceAPI };

