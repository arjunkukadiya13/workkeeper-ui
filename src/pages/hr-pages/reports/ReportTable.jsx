import React from "react";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { reportTypes } from "./reportTypes";

const ReportTable = ({ reportType, reportData }) => {
  if (!reportType || reportData.length === 0) return null;

  const columns = reportTypes[reportType]?.columns || [];

  return (
    <Paper sx={{ mb: 2, p: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <TableCell key={index}>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {reportData.map((row, i) => (
            <TableRow key={i}>
              {columns.map((col, j) => (
                <TableCell key={j}>{row[col.replace(/\s/g, "").toLowerCase()] || "-"}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ReportTable;
