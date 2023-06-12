import xlsExport from "xlsexport";
import exportFromJSON from 'export-from-json'


import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";


const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
// Desired file extesion
const fileExtension = ".xlsx";

const exportData = (data, fName = "excelData") => {
  //  1)
  // const xls = new xlsExport(data);
  // xls.exportToXLS("all-orders-gdm.xls");
  // 2)
  // const fileName = 'download'
  // const exportType =  exportFromJSON.types.xls
  // exportFromJSON({ data, fileName, exportType })
  // 3)
    //Create a new Work Sheet using the data stored in an Array of Arrays.

    const workSheet = XLSX.utils.json_to_sheet(data);
    // Generate a Work Book containing the above sheet.
    const workBook = {
      Sheets: { data: workSheet },
      SheetNames: ["data"]
    };
    // Exporting the file with the desired name and extension.
    const excelBuffer = XLSX.write(workBook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: fileType });

    const fileName = fName
    
    FileSaver.saveAs(fileData, fileName + fileExtension);
    console.log(excelBuffer)

  
};

export default exportData;


