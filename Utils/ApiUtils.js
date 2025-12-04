class ApiUtils {

    constructor(ApiContext, loginPayLoad,orderPayload) {
        this.ApiContext = ApiContext;
        this.loginPayLoad = loginPayLoad;
        this.orderPayload= orderPayload;
    }
    async getToken() {
        const response = await this.ApiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.loginPayLoad },);
        const responseJson = await response.json();
        const Token = await responseJson.token;
        return Token;
    }
    async createOrder() {

    
        const OrderResponse = await this.ApiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: this.orderPayload,
                headers: {

                    "Authorization": await this.getToken()
                }

            });
        const Jsonresponse = await OrderResponse.json();

        const orderId = await Jsonresponse.orders[0];
        
        return orderId;


    }

}
module.exports = { ApiUtils };