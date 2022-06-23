import axios from "axios";
export const API_URL = "http://localhost:3500";

export default axios.create({
  baseURL: API_URL
});

export const axiosPrivate = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});
