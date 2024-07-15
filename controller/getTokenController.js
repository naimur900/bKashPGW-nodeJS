const { grantToken, refreshToken } = require("./tokenController");
const dotenv = require("dotenv");
dotenv.config();
// const username = "sandboxTokenizedUser03232";
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const app_key = process.env.APP_KEY;
const app_secret = process.env.APP_SECRET;

let token = ""; 
let refToken = "";
let tokenIssueTime = 0;

const getToken = async () => {
  try {
    if (token === "") {
      const { statusCode, statusMessage, id_token, refresh_token } = await grantToken(username, password, app_key, app_secret);

      if (statusMessage === "Successful" && statusCode === "0000") {
        refToken = refresh_token;
        token = id_token;
        tokenIssueTime = Date.now();
        console.log("got a brand new token");
        return token;
      }
    }
    const elapsedTime = (Date.now() - tokenIssueTime) / 1000;

    if (elapsedTime < 3000) {
      return token;
    } else {
      const { statusCode, statusMessage, id_token, refresh_token } = await refreshToken(username, password, app_key, app_secret, refToken);
      if (statusMessage === "Successful" && statusCode == "0000") {
        refToken = refresh_token;
        token = id_token;
        tokenIssueTime = Date.now();
        console.log("Got from refersh token");
        return token;
      }
    }
  } catch (error) {
    console.error("Error in getToken:", error);
    throw error;
  }
};

module.exports = { getToken };
