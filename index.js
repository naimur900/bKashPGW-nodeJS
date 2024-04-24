const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser")
const {createPaymentRouter} = require("./routes/createPaymentRoute");
const {executePaymentRouter} = require("./routes/executePaymentRoute");
const {refundTransactionRouter} = require("./routes/refundTransactionRoute");

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// let corsOptions = {
//     origin: "http://localhost:3000",
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   };
app.use(cors());

app.use("/", createPaymentRouter);
app.use("/", executePaymentRouter);
app.use("/", refundTransactionRouter);

app.listen(port, () => {
  console.log("Server is listening to port", port);
});
