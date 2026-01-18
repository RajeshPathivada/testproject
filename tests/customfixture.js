const {test} = require("@playwright/test");

exports.test = test.extend({

authToken : async ({request}, use)=>{


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
          await use(token);

}

})