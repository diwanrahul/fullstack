import axios from "axios";
import config from "./config";

export const login = async (data) => {
  try {
    const res = await axios.post(`${config.baseurl}/api/auth/login`, data, {
      withCredentials: true,
    });
    const result = res.data;
    console.log("login res=>", result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const res = await axios.post(`${config?.baseurl}/api/logout`);
    const message = res.message;
    console.log("logged out message", message);
  } catch (error) {
    console.log(error);
  }
};

export const register = async (data) => {
  try {
    const res = await axios.post(`${config.baseurl}/api/auth/register`, data);

    const result = await res.json();
    console.log("register res=>", result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
