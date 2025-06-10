import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToCSV = (data, columns, fileName = "report") => {
  const ws = utils.json_to_sheet(data, {
    header: columns,
    skipHeader: false,
  });
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Report");
  writeFile(wb, `${fileName}.csv`);
};

export const exportToPDF = (data, columns, fileName = "report") => {
  const doc = new jsPDF();

  const tableData = data.map((row) =>
    columns.map((col) => row[col] ?? "-")
  );

  autoTable(doc, {
    head: [columns],
    body: tableData,
    styles: { fontSize: 10 },
    margin: { top: 20 },
  });

  doc.save(`${fileName}.pdf`);
};
