// import * as XLSX from "xlsx";

// const downloadExcelFile = (data, filename) => {
//   // Convert date values to Excel date format
//   const dataArray = [data];

//   const ws = XLSX.utils.json_to_sheet(dataArray, {
//     cellDates: true,
//   });

//   // Manually set a fixed column width for all columns (adjust the value based on your needs)
//   const columnWidth = 15;

//   // Get the range of cell addresses in the worksheet
//   const range = XLSX.utils.decode_range(ws["!ref"]);

//   // Ensure that !cols property exists in the worksheet
//   if (!ws["!cols"]) {
//     ws["!cols"] = [];
//   }

//   // Apply the fixed column width to all columns
//   for (let i = range.s.c; i <= range.e.c; i++) {
//     ws["!cols"][i] = { wch: columnWidth };
//   }

//   const wb = XLSX.utils.book_new();

//   XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

//   XLSX.writeFile(wb, filename);
// };
// export default downloadExcelFile;

import * as XLSX from "xlsx";

const downloadExcelFile = (dataArray, filename) => {
  // Convert date values to Excel date format

  const ws = XLSX.utils.json_to_sheet(dataArray, {
    cellDates: true,
  });

  // Manually set a fixed column width for all columns (adjust the value based on your needs)
  const columnWidth = 15;

  // Get the range of cell addresses in the worksheet
  const range = XLSX.utils.decode_range(ws["!ref"]);

  // Ensure that !cols property exists in the worksheet
  if (!ws["!cols"]) {
    ws["!cols"] = [];
  }

  // Apply the fixed column width to all columns
  for (let i = range.s.c; i <= range.e.c; i++) {
    ws["!cols"][i] = { wch: columnWidth };
  }

  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

  XLSX.writeFile(wb, filename);
};

export default downloadExcelFile;
