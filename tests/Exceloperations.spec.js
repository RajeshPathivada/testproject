const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function Readfile(path,originaltext, replacedtext,change) {
    const workbook = new ExcelJs.Workbook();
 await workbook.xlsx.readFile(path);
 const worksheet = workbook.getWorksheet('Sheet1');
 await Writefile(path,originaltext,replacedtext,worksheet,workbook,change);

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

  if (output.row === -1) {
    throw new Error(`Value '${originaltext}' not found in worksheet`);
  }

  const targetRow = output.row + (change && change.rowChange ? change.rowChange : 0);
  const targetCol = output.column + (change && change.colChange ? change.colChange : 0);

  const cell = worksheet.getCell(targetRow, targetCol);
  cell.value = replacedtext;
  await workbook.xlsx.writeFile(path);

}

//Readfile('C:\\Users\\rpathivada\\Downloads\\ExceldownloadTest.xlsx', "Kivi",350,{rowChange:0,colChange:2 }); 


test( 'Upload-download test',  async({page})=>
{
    const searchtext = 'Banana';
    const updated = "500";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', { name: 'Download' }).click()
    ]);

    const downloadPath = await download.path();
    if (!downloadPath) throw new Error('Download path not available');

    await Readfile(downloadPath, "Banana", updated, { rowChange: 0, colChange: 2 });
    await page.locator('#fileinput').setInputFiles(downloadPath);
  const textlocator = page.getByText(searchtext);
   const desiredrow  = page.getByRole("row").filter({ has: textlocator });
         await expect(desiredrow).toContainText(updated);

});

