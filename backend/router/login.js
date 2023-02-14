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
      "exec [QMES].[dbo].[MASTER_BAD_READ_SP] '전체',''"
    );
    res.send(JSON.stringify(result.recordset));
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body.login_id._value);
    const Pool = await pool;
    // select
    const result = await Pool.request()
      .input("id", sql.NVarChar, req.body.login_id._value)
      .input("pw", sql.NVarChar, req.body.login_pw._value)
      .query(
        "SELECT [USER_ID] AS id, [USER_PW] AS pw FROM [QINNOTEK].[dbo].[MASTER_USER_TB] WHERE [USER_ID] = @id AND [USER_PW] = @pw"
      );
    res.send(JSON.stringify(result.recordset));
    // res.send(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

module.exports = router;
