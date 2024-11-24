import axios from "axios";

//http://localhost:3000
//https://www.myarticle.shop
export const axiosInstance = axios.create({
    baseURL: "https://www.myarticle.shop",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('url-parser-token');  // Or use cookies/sessionStorage if needed

        // If token exists, add it to the Authorization header
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
