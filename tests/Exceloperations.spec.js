const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function Readfile(path,originaltext, replacedtext,change) {
    const workbook = new ExcelJs.Workbook();
 await workbook.xlsx.readFile(path);
 const worksheet = workbook.getWorksheet('Sheet1');
 Writefile(path,originaltext,replacedtext,worksheet,workbook,change);

}
 
  async function Writefile(path,originaltext,replacedtext,worksheet,workbook,change) {
   let output ={ row:-1, column:-1}
    worksheet.eachRow(  (row, rowNumber)=> {
              
          row.eachCell(  (cell, colNumber)=> {

             if (cell.value === originaltext)
             { 
                output.row = rowNumber;
                output.column= colNumber;
             }
          })   
         
 })

  const cell = worksheet.getCell(output.row, output.column+change.colChange);
 cell.value = replacedtext;
 await workbook.xlsx.writeFile(path);

}

//Readfile('C:\\Users\\rpathivada\\Downloads\\ExceldownloadTest.xlsx', "Kivi",350,{rowChange:0,colChange:2 }); 


test( 'Upload-download test',  async({page})=>
{
    const searchtext = 'Banana';
    const updated = "500";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    await page.getByRole("button",{name:'Download'}).click();    
    Readfile('C:\\Users\\rpathivada\\Downloads\\download.xlsx', "Banana",500,{rowChange:0,colChange:2 }); 
    await page.locator("#fileinput").setInputFiles("C:\\Users\\rpathivada\\Downloads\\download.xlsx");
  const textlocator = page.getByText(searchtext);
   const desiredrow  = page.getByRole("row").filter({ has: textlocator });
     await expect(desiredrow.locator("#cell-4-undefined")).toContainText(updated);

});

