import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://we-care-server-five.vercel.app",
  // baseURL: "http://localhost:3000",
});

const useAxios = () => {
  return axiosInstance;
};
export default useAxios;
