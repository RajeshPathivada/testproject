const Exceljs = require("exceljs");
const {test,expect}= require("@playwright/test");



test("EXcel operatios",async()=>{

  
    let output ={
    row :-1,
    column: -1
}
const workbook = new Exceljs.Workbook();

await workbook.xlsx.readFile("C:\\Users\\rpathivada\\Downloads\\download.xlsx");


const worksheet = workbook.getWorksheet("Sheet1");


worksheet.eachRow( (row,rowNumber)=>{

 row.eachCell((cell, colNumber)=>{



         if (cell.text.trim() === "Banana"){

            output.row = rowNumber;
            output.column= colNumber; 
           
         }   


})

})

  

console.log(output.row);

await workbook.xlsx.writeFile("C:\\Users\\rpathivada\\Downloads\\download.xlsx");


});




