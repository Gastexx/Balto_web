import axios from "axios";
import BASE_URL from "../config/config";

const API_FILE_URL = `${BASE_URL.replace(/\/$/, "")}/api.php`;

const API = axios.create({
  baseURL: API_FILE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default API;
