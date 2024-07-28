const express = require("express");
const assetController = require("../controllers/assetcontrollers");
const walletController = require("../controllers/walletController");

const router = express.Router();

router
  .post("/mint", assetController.mint)
  .post("/list", assetController.list)
  .post("/buy", assetController.buy)
  .get("/verify", assetController.verify)
  .get("/generate-wallet", walletController.generateWallet);

module.exports = router;
