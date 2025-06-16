import React from "react";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { reportTypes } from "./reportTypes";
import "./TableData.css"

const TableData = ({ reportType, reportData }) => {
  if (!reportType || reportData.length === 0) return null;

  const config = reportTypes[reportType];
  const columns = config?.columns || [];
  const keys = config?.keys || [];

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
              {keys.map((key, j) => (
                <TableCell key={j}>{row[key] !== undefined ? row[key] : "-"}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TableData;
