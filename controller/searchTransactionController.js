const { getToken } = require("./getTokenController");
const { axiosPost } = require("./postController");
const dotenv = require("dotenv");
dotenv.config();

var app_key = process.env.APP_KEY;
var base_URL = process.env.BASE_URL;

const searchTransaction = async (trxID) => {
  try {

    if (!trxID) {
      throw new Error("trxID is required");
    }

    const token = await getToken();

    payload = {
      trxID,
    };

    headers = {
      Authorization: token,
      "X-APP-Key": app_key,
    };

    const data = await axiosPost(`${base_URL}/general/searchTransaction`,payload,headers);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error in searchTransaction:", error);
    throw error;
  }
};

module.exports = { searchTransaction };
