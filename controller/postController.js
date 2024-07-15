const axios = require("axios");

const axiosPost = async (endPointURL, payload, headers) => {
  const controller = new AbortController();
  
  // If the response is not processed within 4 seconds, the request is aborted
  const timeOut = setTimeout(() => {
    controller.abort();
  }, 4000); // corrected timeout value

  try {
    const { data } = await axios({
      method: "post",
      url: endPointURL,
      data: payload,
      headers: headers,
      signal: controller.signal,
    });

    if (data.errorMessage) throw new Error(data.errorMessage);
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  } finally {
    clearTimeout(timeOut);
  }
};

module.exports = { axiosPost };
