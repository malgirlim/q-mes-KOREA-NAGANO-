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

// 조회
router.get("/", async (req, res) => {
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

// 추가
router.post("/", async (req, res) => {
  // try
  try {
    const Pool = await pool;
    // select
    const result = await Pool.request()
      .input("content", sql.NVarChar, req.body.content)
      .query(
        "SELECT \
        ITEM_SKU AS content, \
        ITEM_NAME AS name, \
        ITEM_SIZE AS size, \
        COALESCE(IR.입고수 - ID.출고수,0) AS stock, \
        1 AS number \
      FROM [QINNOTEK].[dbo].[MASTER_ITEM_TB] AS ITEM \
      LEFT JOIN \
      ( \
        SELECT \
          ITRE_ITEM_SKU, \
          SUM(ITRE_AMOUNT * 1.0) AS 입고수 \
        FROM [QINNOTEK].[dbo].[MANAGE_ITEM_RECEIVE_TB] \
        WHERE ITRE_ITEM_SKU = @content \
        GROUP BY ITRE_ITEM_SKU \
      ) AS IR ON IR.ITRE_ITEM_SKU = ITEM.ITEM_SKU \
      LEFT JOIN \
      ( \
        SELECT \
          ITDE_ITEM_SKU, \
          SUM(ITDE_AMOUNT * 1.0) AS 출고수 \
        FROM [QINNOTEK].[dbo].[MANAGE_ITEM_DELIVER_TB] \
        WHERE ITDE_ITEM_SKU = @content \
        GROUP BY ITDE_ITEM_SKU \
      ) AS ID ON ID.ITDE_ITEM_SKU = ITEM.ITEM_SKU \
      WHERE ITEM_SKU = @content \
      GROUP BY ITEM_SKU, ITEM_NAME, ITEM_SIZE, IR.입고수, ID.출고수"
      );
    // console.log(result.recordset);
    res.send(result.recordset);
  } catch (err) {
    // console.log(err);
    res.status(500);
    res.send(err.message);
  }
});

//입고 등록
router.post("/receive", async (req, res) => {
  // console.log(req.body.length);
  try {
    const Pool = await pool;

    for (var i = 0; i < req.body.length; i++) {
      console.log(req.body[i].content);
      // insert
      await Pool.request()
        .input("content", sql.NVarChar, req.body[i].content)
        .input("number", sql.Int, req.body[i].number)
        .query(
          `exec [QINNOTEK].[dbo].[MANAGE_ITEM_RECEIVE_MOBILE2_INS_SP] @content, @number`
        );
    }
    res.send("POST 입고");
  } catch (err) {
    // 오류
    res.status(500);
    res.send(err.message);
  }
});
// 출고 등록
router.post("/deliver", async (req, res) => {
  try {
    const Pool = await pool;

    for (var i = 0; i < req.body.length; i++) {
      // insert
      await Pool.request()
        .input("content", sql.NVarChar, req.body[i].content)
        .input("number", sql.Int, req.body[i].number)
        .query(
          `exec [QINNOTEK].[dbo].[MANAGE_ITEM_DELIVER_MOBILE2_INS_SP] @content, @number`
        );
    }
    res.send("POST 출고");
  } catch (err) {
    // console.log(err);
    res.status(500);
    res.send(err.message);
  }
});
// 불량 등록
router.post("/bad", async (req, res) => {
  try {
    const Pool = await pool;

    for (var i = 0; i < req.body.length; i++) {
      // insert
      await Pool.request()
        .input("content", sql.NVarChar, req.body[i].content)
        .input("number", sql.Int, req.body[i].number)
        .query(
          `exec [QINNOTEK].[dbo].[MANAGE_ITEM_BAD_MOBILE2_INS_SP] @content, @number`
        );
    }
    res.send("POST 불량");
  } catch (err) {
    // console.log(err);
    res.status(500);
    res.send(err.message);
  }
});

module.exports = router;
