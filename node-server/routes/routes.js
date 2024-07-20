const express = require("express");
const assetController = require("../controllers/assetcontrollers");
const router = express.Router();

router
  .post("/mint", assetController.mint)
  .post("/list", assetController.list)
  .post("/sell", assetController.sell);

module.exports = router;
