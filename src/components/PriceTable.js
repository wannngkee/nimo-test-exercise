import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system";
import style from "./PriceTable.module.css";

const columns = [
  { id: "index", label: "#" },
  { id: "coin", label: "Coin" },
  {
    id: "price",
    label: "Price",
    align: "right",
    format: (value) => `$${value.toLocaleString("en-US")}`,
  },
  {
    id: "1h",
    label: "1h",
    format: (value) => `${value.toFixed(1)}%`,
  },
  {
    id: "24h",
    label: "24h",
    format: (value) => `${value.toFixed(1)}%`,
  },
  {
    id: "7d",
    label: "7d",
    format: (value) => `${value.toFixed(1)}%`,
  },
  {
    id: "24hVolume",
    label: "24h\u00a0Volume",
    format: (value) => `$${value.toLocaleString("en-US")}`,
  },
  {
    id: "mkt",
    label: "Mkt\u00a0Cap",
    format: (value) => `$${value.toLocaleString("en-US")}`,
  },
  {
    id: "last7d",
    label: "Last\u00a07\u00a0Days",
    format: (value) => `$${value.toLocaleString("en-US")}`,
  },
];

const PriceTable = () => {
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const Root = styled("div")(
    ({ theme }) => `

  th {
    font-weight: bold
  }
  `
  );
  return (
    <>
      <Root sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="Cryptocurrency Prices">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody> */}
        </Table>
      </Root>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={135}
        rowsPerPage={100}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default PriceTable;
