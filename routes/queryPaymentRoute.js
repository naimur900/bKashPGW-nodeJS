const {queryPayment} = require("../controller/queryPaymentController");
const queryPaymentRouter = require("express").Router();

queryPaymentRouter.post("/queryPayment", queryPayment);

module.exports = { queryPaymentRouter };
