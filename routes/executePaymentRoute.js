const executePaymentRouter = require("express").Router()
const {executePayment} = require("../controller/executePaymentController")

executePaymentRouter.post("/executePayment", executePayment);

module.exports = { executePaymentRouter };
