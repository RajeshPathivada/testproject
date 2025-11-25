const{expect} = require('@playwright/test');

class PlaceorderPage {

    constructor(page) {
        this.page =page;
       
    }

    async enterPaymentDetails() {

        await expect(this.page.locator("div .item__title")).toHaveText(' iphone 13 pro ');
        await this.page.locator(".input.txt.text-validated").first().fill("1234 4567 2345 1234");
        await this.page.locator(".input.ddl").first().selectOption('11');
        await this.page.locator(".input.ddl").nth(1).selectOption('28');
        await this.page.locator(".input.txt").nth(1).fill("435");
        await this.page.locator(".input.txt").nth(2).fill("Rajesh Pathivada");
        await this.page.locator("[name ='coupon']").fill("rahulshettyacademy");
        await this.page.locator("[type='submit']").click();
        expect(await this.page.getByText("sanapathi@gmail.com").isVisible()).toBeTruthy();
        await this.page.locator("input[placeholder='Select Country']").click();
        await this.page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 150 });
        const dropdown = await this.page.locator(".ta-results");
        await expect(dropdown).toBeVisible({timeout: 5000});
        const options = await dropdown.locator('.ta-item');
        const NoofButtons = await options.count();

        for (let i = 0; i < NoofButtons; i++) {

            if ((await options.nth(i).textContent()).trim() === 'India') {
                await options.nth(i).click();
                break;
            }
        }
    }


    async placeOrder(){
        
            await this.page.locator(".btnn.action__submit.ng-star-inserted").click();
    }
}

module.exports={PlaceorderPage};