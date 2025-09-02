import axios from "axios";
import config from "./config";

export const getHistory = async () => {
  try {
    const res = await axios.get(`${config.baseurl}/api/history`, {
      withCredentials: true,
      headers: {
          "Authorization": `Bearer ${config.token}`,
      }
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
