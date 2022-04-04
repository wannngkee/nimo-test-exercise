import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system";
import style from "./PriceTable.module.css";

const columns = [
  { id: "rank", label: "#", align: "left" },
  { id: "coin", label: "Coin", align: "left" },
  {
    id: "price",
    label: "Price",
    align: "right",
  },
  {
    id: "h1",
    label: "1h",
    align: "right",
  },
  {
    id: "h24",
    label: "24h",
    align: "right",
  },
  {
    id: "d7",
    label: "7d",
    align: "right",
  },
  {
    id: "h24volume",
    label: "24h\u00a0Volume",
    align: "right",
  },
  {
    id: "mkt",
    label: "Mkt\u00a0Cap",
    align: "right",
  },
  {
    id: "last7d",
    label: "Last\u00a07\u00a0Days",
    align: "center",
  },
];

const PriceTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rows, setRows] = useState([]);
  const createData = (
    rank,
    coin,
    price,
    h1,
    h24,
    d7,
    h24volume,
    mkt,
    last7d
  ) => {
    return { rank, coin, price, h1, h24, d7, h24volume, mkt, last7d };
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            per_page: 100,
            page: currentPage + 1,
            sparkline: true,
            price_change_percentage: "1h,24h,7d",
          },
        }
      );
      const data = res.data.map((item, index) => {
        return createData(
          item["market_cap_rank"],
          [item["image"], item["name"], item["symbol"]],
          item["current_price"],
          item["price_change_percentage_1h_in_currency"],
          item["price_change_percentage_24h_in_currency"],
          item["price_change_percentage_7d_in_currency"],
          item["total_volume"],
          item["market_cap"],
          item["sparkline_in_7d"]["price"][0]
        );
      });
      setRows(data);
    };
    fetchData();
  }, [currentPage]);
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const Root = styled("div")(
    ({ theme }) => `
  td, th{
    color: #212529;
  }
  th {
    font-weight: bold;
  }

  @media screen and (max-width: 1014px){
    table thead tr th:nth-of-type(1){
      position: sticky;
      left:0px;
      background-color: white;
      z-index:100;
    }
    table thead tr th:nth-of-type(2){
      position: sticky;
      width: 70px;
      left: 56px;
      background-color: white;
      z-index:100;
    }

    table tbody tr td:nth-of-type(1){
      position: sticky;
      left:0px;
      background-color: white;

    }

     table tbody tr td:nth-of-type(2){
      position: sticky;
      width: 70px;
      left: 56px;
      background-color: white;
    }
  }

  `
  );

  // Function to determine the text color based on the value
  const determineColor = (value) => {
    if (value > 0) {
      return `${style.rise}`;
    } else if (value < 0) {
      return `${style.drop}`;
    } else {
      return "none";
    }
  };
  return (
    <Root sx={{ width: "100%", overflowX: "scroll" }}>
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
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.rank}>
                <TableCell align="left">{row.rank}</TableCell>
                <TableCell align="left">
                  <span className={style.coin}>
                    <img
                      className={style.coinImg}
                      loading="lazy"
                      src={row.coin[0]}
                      alt={row.coin[1]}
                    ></img>
                    <span className={style.coinName}>
                      <span className={style.name}>{row.coin[1]}</span>
                      <span className={style.symbol}>
                        {row.coin[2].toUpperCase()}
                      </span>
                    </span>
                  </span>
                </TableCell>
                <TableCell align="right" className={style.price}>
                  {`$${row.price.toLocaleString("en-US")}`}
                </TableCell>
                <TableCell align="right">
                  <span className={determineColor(row.h1)}>
                    {`${row.h1.toFixed(1)}%`}
                  </span>
                </TableCell>
                <TableCell align="right">
                  <span className={determineColor(row.h24)}>{`${row.h24.toFixed(
                    1
                  )}%`}</span>
                </TableCell>
                <TableCell align="right">
                  <span className={determineColor(row.d7)}>{`${row.d7.toFixed(
                    1
                  )}%`}</span>
                </TableCell>
                <TableCell align="right">{`$${row.h24volume.toLocaleString(
                  "en-US"
                )}`}</TableCell>
                <TableCell align="right">{`$${row.mkt.toLocaleString(
                  "en-US"
                )}`}</TableCell>
                <TableCell align="center">{`$${row.mkt.toLocaleString(
                  "en-US"
                )}`}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={13500}
        rowsPerPage={100}
        page={currentPage}
        onPageChange={handleChangePage}
      />
    </Root>
  );
};

export default PriceTable;
