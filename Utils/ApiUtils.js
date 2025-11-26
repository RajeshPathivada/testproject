class ApiUtils {

    constructor(ApiContext, loginPayLoad) {

        this.ApiContext = ApiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() {


        const response = await this.ApiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.loginPayLoad },);
        const responseJson = await response.json();
        const Token = await responseJson.token;
        return Token;

    }

}
module.exports = { ApiUtils };