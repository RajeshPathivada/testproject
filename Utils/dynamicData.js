class dynamicData {

    constructor() {

    }


    async generateDynamicTestData() {

        const timestamp = Date.now();

        return {

            email: `user_${timestamp}test@gmail.com`,
            firstName: "Harika",
            lastName: "Moningi",
            option: "Student",
            userPassword: "Amma@143",
            confirmPassword: "Amma@143",
            mobileNumber: "9986751233",
            gender: "Male",
        }
    }
}


module.exports = { dynamicData }