import axios from "axios";

const BASE_URL = "https://localhost:5016";

const axiosInstance = axios.create({ baseURL: BASE_URL });

export default axiosInstance;
