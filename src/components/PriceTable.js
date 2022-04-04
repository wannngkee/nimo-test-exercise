import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system";
import style from "./PriceTable.module.css";
import CustomPagination from "./CustomPagination";
import EnhancedTableHead from "./EnhancedTableHead";

const PriceTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const columns = [
    { id: "rank", label: "#", align: "left" },
    { id: "coin", label: "Coin", align: "left" },
    { id: "price", label: "Price", align: "right" },
    { id: "h1", label: "1h", align: "right" },
    { id: "h24", label: "24h", align: "right" },
    { id: "d7", label: "7d", align: "right" },
    { id: "h24volume", label: "24h\u00a0Volume", align: "right" },
    { id: "mkt", label: "Mkt\u00a0Cap", align: "right" },
    { id: "last7d", label: "Last\u00a07\u00a0Days", align: "center" },
  ];
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
            page: currentPage,
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

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };
  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };
  const ChangePageByValue = (value) => {
    setCurrentPage(currentPage + value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const Root = styled("div")(
    ({ theme }) => `
  td, th{
    color: #212529;
  }
  th {
    font-weight: bold;
  }

  @media screen and (max-width: 1200px){
    table thead tr th:nth-of-type(1){
      position: sticky;
      left:0px;
      background-color: white;
      z-index:100;
    }
    table thead tr th:nth-of-type(2){
      position: sticky;
      left: 60px;
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
      left: 60px;
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
    <>
      <TableContainer component={Paper} sx={{ overflow: "scroll" }}>
        <Root sx={{ width: "1350px", maxHeight: "80vh" }}>
          <Table stickyHeader aria-label="Cryptocurrency Prices">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              columns={columns}
            />
            <TableBody>
              {rows.sort(getComparator(order, orderBy)).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
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
                      {row.price
                        ? `$${row.price.toLocaleString("en-US")}`
                        : "?"}
                    </TableCell>
                    <TableCell align="right">
                      <span className={determineColor(row.h1)}>
                        {row.h1 ? `${row.h1.toFixed(1)}%` : "?"}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <span className={determineColor(row.h24)}>
                        {row.h24 ? `${row.h24.toFixed(1)}%` : "?"}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <span className={determineColor(row.d7)}>
                        {row.d7 ? `${row.d7.toFixed(1)}%` : "?"}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      {row.h24volume
                        ? `$${row.h24volume.toLocaleString("en-US")}`
                        : "?"}
                    </TableCell>
                    <TableCell align="right">
                      {row.mkt ? `$${row.mkt.toLocaleString("en-US")}` : "?"}
                    </TableCell>
                    <TableCell align="center">
                      {row.last7d
                        ? `$${row.last7d.toLocaleString("en-US")}`
                        : ""}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Root>
      </TableContainer>
      <CustomPagination
        currentPage={currentPage}
        onChange={handleChangePage}
        changePage={ChangePageByValue}
      />
    </>
  );
};

export default PriceTable;
