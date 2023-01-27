const express = require("express");
const memoRouter = require("./router/memos");
const masterProductRouter = require("./router/master/masterProduct");
const masterClientRouter = require("./router/master/masterClient");
const masterBadRouter = require("./router/master/masterBad");
const masterUserRouter = require("./router/master/masterUser");
const monitorBadRouter = require("./router/monitor/monitorBad");
const monitorSafeRouter = require("./router/monitor/monitorSafe");
const monitorStockRouter = require("./router/monitor/monitorStock");
const stockBadRouter = require("./router/stock/stockBad");
const stockReceiveRouter = require("./router/stock/stockReceive");
const stockUseRouter = require("./router/stock/stockUse");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
// const database = require("./database");
const { sql, pool } = require("./mssql");

app.use(bodyParser.json());

// 테스트 - router/memos.js
app.use("/api/memos", memoRouter);

// 기준정보 / 품목 등록 - router/master/masterProduct.js
app.use("/api/master/product", masterProductRouter);
// 기준정보 / 거래처 등록 - router/master/masterProduct.js
app.use("/api/master/client", masterClientRouter);

app.listen(port, () => {
  console.log(`Q-MES app listening on port ${port}`);
});
