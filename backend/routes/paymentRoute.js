const express = require("express");
const {
  processPayment,
  sendStripApiKey,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/process/payment").post(isAuthenticatedUser, processPayment);
router.route("/stripe-Api-key").get(isAuthenticatedUser, sendStripApiKey);
module.exports = router;
