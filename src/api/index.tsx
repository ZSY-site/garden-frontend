import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
axios.defaults.baseURL = "http://localhost:8001";
// 指定请求体类型
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

//axios.defaults.transformRequest = (data = {}) => qs.stringify(data);


axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        let access_token = sessionStorage.getItem("access_token");
        if (access_token) {  // 给请求头加上字段
            config.headers['Authorization'] = `Bearer ${access_token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);

export default axios;