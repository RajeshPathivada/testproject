 const {test,expect}=require("@playwright/test");

 const payLoad = {userEmail:"sanapathi@gmail.com",userPassword:"Bhagya@71"};
 const orderPayload =  
  {
    orders:[{country:"Australia",productOrderedId:"6964a1cbc941646b7a91786b"}]
  };

 const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGY3N2E4ZWY2NjlkNmNiMGEyMWM4NzgiLCJ1c2VyRW1haWwiOiJzYW5hcGF0aGlAZ21haWwuY29tIiwidXNlck1vYmlsZSI6OTg4Nzg1NDY3OCwidXNlclJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3MDI4NDIyNSwiZXhwIjoxODAxODQxODI1fQ.kolrsPcc-SqFlKXbXFH3SON2Cnb9cMtbrBMPOKKUPz4"


 //get token 

test("get token", async({request})=>{

 const response =    await request.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data : payLoad,
        }
    );
 
     expect(response.ok()).toBeTruthy();
     expect(response.status()).toBe(200);

    
    


   const Jsonresponse=  await response.json();
    expect(Jsonresponse.message).toBe("Login Successfully"); //json object parsed into javascript object
 expect(Jsonresponse).toHaveProperty('token');
    const token = await  Jsonresponse.token; //reading token form jsos body
    console.log(token);    //printing the token

});

//create order 

test("Create order", async ({request})=>{

  const response =   await request.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                Authorization: token,
            }
        }
    )

    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();

    const jsonresponse = await response.json();
    console.log(jsonresponse);
    const orderId = await jsonresponse.orders[0];
    console.log(orderId);



})
;