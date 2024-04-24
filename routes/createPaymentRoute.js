const {createPayment} = require("../controller/createPaymentController");
const createPaymentRouter = require("express").Router();

createPaymentRouter.post("/createPayment", createPayment);

module.exports = { createPaymentRouter };
