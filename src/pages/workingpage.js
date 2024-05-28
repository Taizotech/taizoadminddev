/* eslint-disable no-unused-vars */
import * as XLSX from "xlsx";
export const calculateMaxColumnWidths = (data) => {
  const maxColWidths = Array.from(
    { length: data.length > 0 ? Object.keys(data[0]).length : 0 },
    () => 10 // Default width if no content
  );

  data.forEach((row) => {
    Object.keys(row).forEach((col, colIndex) => {
      const cellValue = row[col];
      const cellLength = cellValue ? String(cellValue).length : 0;
      if (cellLength > maxColWidths[colIndex]) {
        maxColWidths[colIndex] = cellLength;
      }
    });
  });

  return maxColWidths;
};
