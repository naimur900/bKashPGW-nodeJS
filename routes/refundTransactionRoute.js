const {refundTransaction} = require("../controller/refundTransactionController");
const refundTransactionRouter = require("express").Router();

refundTransactionRouter.post("/refundTransaction", refundTransaction);

module.exports = { refundTransactionRouter };
