import Axios from "axios";

const axion = async (method, url, body) => {
  try {
    let result;
    if (body) {
      result = await Axios[method](url, body);
    } else {
      result = await Axios[method](url);
    }
    return result.data;
  } catch (err) {
    return err.response ? err.response.data : err;
  }
};

export default axion;
