const express = require("express");
const bodyParser = require("body-parser");
// const database = require("./database");
const { sql, pool } = require("../mssql");

const router = express.Router();
router.use(bodyParser.json());

router.use((req, res, next) => {
  // console.log("middleware for test!");
  next();
});

router.get("/memos", async (req, res) => {
  try {
    const Pool = await pool;
    // select
    const result = await Pool.request().query(
      "SELECT ITEM_SKU AS content, ITEM_NAME AS name, ITEM_SIZE AS size, 1 AS number FROM [QINNOTEK].[dbo].[MASTER_ITEM_TB]"
    );
    res.send(JSON.stringify(result.recordset));
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
  // res.send("GET 전송완료");
});

module.exports = router;
