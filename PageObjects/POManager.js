const { LoginPage } = require('../PageObjects/LoginPage');
const {DashboardPage} =require('../PageObjects/DashboardPage')
const{CheckoutPage} = require('../PageObjects/CheckoutPage');
const{PlaceorderPage} = require('../PageObjects/PlaceorderPage')
const{OrderconfirmationPage}=require('../PageObjects/OrderconfirmationPage')
const{OrderhistoryPage}=require("../PageObjects/OrderhistoryPage");
const{RegistrationPage}= require("../PageObjects/RegistrationPage");
class POManager{

    constructor(page){
    this.page =page;
   
    }
   
     loginPage(){
    
         return new LoginPage(this.page);
    }

     dashboardPage(){
        return new DashboardPage(this.page);
    }

     checkoutPage(){
        return new CheckoutPage(this.page);
    }
     placeorderPage(){

        return new PlaceorderPage(this.page);
    }

     orderConfirmationPage(){
      return   new OrderconfirmationPage(this.page);
    }

     orderHistoryPage(){
       return  new OrderhistoryPage(this.page);
    }

     registrationPage(){
        
        return new RegistrationPage(this.page)
    } 


}
module.exports={POManager}; 

