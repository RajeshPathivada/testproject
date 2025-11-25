const { LoginPage } = require('../PageObjects/LoginPage');
const {DashboardPage} =require('../PageObjects/DashboardPage')
const{CheckoutPage} = require('../PageObjects/CheckoutPage');
const{PlaceorderPage} = require('../PageObjects/PlaceorderPage')
const{OrderconfirmationPage}=require('../PageObjects/OrderconfirmationPage')
const{OrderhistoryPage}=require("../PageObjects/OrderhistoryPage");
const{RegistrationPage}= require("../PageObjects/RegistrationPage");
class POManager{

    constructor(page,email,password){
    this.page =page;
    
     this.email=email;
     this.password=password;
    }
   
     LoginPage(){
    
         return new LoginPage(this.page, this.email, this.password);
    }

     DashboardPage(productName){
        return new DashboardPage(this.page, productName);
    }

     CheckoutPage(){
        return new CheckoutPage(this.page);
    }
     PlaceorderPage(){

        return new PlaceorderPage(this.page);
    }

     OrderconfirmationPage(){
      return   new OrderconfirmationPage(this.page);
    }

     OrderhistoryPage(){
       return  new OrderhistoryPage(this.page,this.orderId);
    }

     RegistrationPage(){
        
        return new RegistrationPage(this.page)
    } 

    async newmethod(){

        
    }
   
}
module.exports={POManager}; 

