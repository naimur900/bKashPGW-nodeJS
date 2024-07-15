const { getToken } = require("./getTokenController");
const { axiosPost } = require("./postController");
const dotenv = require("dotenv");
dotenv.config();

const app_key = process.env.APP_KEY;
const base_URL = process.env.BASE_URL;

const queryPayment = async (req, res) => {
  try {
    const { paymentID } = req.body;

    if (!paymentID) {
      return res
        .status(400)
        .json({ status: false, message: "paymentID is required" });
    }

    const token = await getToken();

    payload = {
      paymentID,
    };

    headers = {
      Authorization: token,
      "X-APP-Key": app_key,
    };

    const data = await axiosPost(
      `${base_URL}/payment/status`,
      payload,
      headers
    );
    console.log(data);

    res.status(200).json({
      status: true,
      message: data,
    });

    // res.send(data);
  } catch (error) {
    console.error("Error in queryPayment:", error);
    res.status(500).json({
      status: false,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = { queryPayment };
