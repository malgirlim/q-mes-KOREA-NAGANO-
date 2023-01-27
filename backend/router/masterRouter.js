const express = require("express");
const router = express.Router();

const masterProductRouter = require("./master/masterProduct");
const masterClientRouter = require("./master/masterClient");
const masterBadRouter = require("./master/masterBad");
const masterUserRouter = require("./master/masterUser");

router.use((req, res, next) => {
  // console.log("middleware for test!");
  next();
});

// 기준정보 / 사용자 등록 - router/master/masterUser.js
router.use("/user", masterUserRouter);
// 기준정보 / 품목 등록 - router/master/masterProduct.js
router.use("/product", masterProductRouter);
// 기준정보 / 거래처 등록 - router/master/masterProduct.js
router.use("/client", masterClientRouter);
// 기준정보 / 불량내용 등록 - router/master/masterBad.js
router.use("/bad", masterBadRouter);

module.exports = router;
