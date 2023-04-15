import axios from "axios";

// ----------------------------------------------------------------------
const axiosInstance = axios.create({
  baseURL: "https://38ed-2405-201-d01b-90ae-311e-ea4d-2ae5-52bc.ngrok-free.app",
});

export default axiosInstance;
