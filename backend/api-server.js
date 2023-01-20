const express = require("express");
const memoRouter = require("./router/memos");
const masterProductRouter = require("./router/master/masterProduct");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
// const database = require("./database");
const { sql, pool } = require("./mssql");

app.use(bodyParser.json());

// 테스트 - router/memos.js
app.use("/api/memos", memoRouter);

// 기준정보 - router/master.js
app.use("/api/master/product", masterProductRouter);

app.listen(port, () => {
  console.log(`Q-MES app listening on port ${port}`);
});
