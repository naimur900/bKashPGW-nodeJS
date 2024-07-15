const { getToken } = require("./getTokenController");
const { axiosPost } = require("./postController");


const dotenv = require("dotenv");
dotenv.config();

const app_key = process.env.APP_KEY;
const base_URL = process.env.BASE_URL;

const refundTransaction = async () => {
  try {
    const { trxID, amount, paymentID, reason, sku } = req.body;

    if (!trxID || !amount || !paymentID) {
      return res.status(400).json({ status: false, message: "trxID, amount, and paymentID are required" });
    }

    const token = await getToken();

    payload = {
      trxID,
      amount,
      paymentID,
      reason: reason ?? "Refund",
      sku: sku ?? "NA",
    };

    headers = {
      Authorization: token,
      "X-APP-Key": app_key,
    };

    const data = await axiosPost(`${base_URL}/general/searchTransaction`, payload, headers);
    console.log(data);
    res.status(200).json({
      status: true,
      message: data,
    });
    // return data;
  } catch (error) {
    console.error("Error in refundTransaction:", error);
    res.status(500).json({
      status: false,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = { refundTransaction };
