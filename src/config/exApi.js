import axios from "axios";
const baseUrl = import.meta.env.VITE_EXTERNAL_API_BASE_URL;

const exApi = axios.create({
    baseURL: baseUrl
});

//lam hanh dong truoc khi call api
const handleBefore = (config) => {
    const token = localStorage.getItem("token")?.replaceAll('"', "");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
};

const handleError = (error) => {
    console.log(error);
};

exApi.interceptors.request.use(handleBefore, handleError);
export default exApi;