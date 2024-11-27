import axios from "axios";
import store from "../app/store";
import { logoutUser } from "../app/authSlice";
import toast from "react-hot-toast";

//http://localhost:3000
//https://www.myarticle.shop
const baseAddress = 'https://www.myarticle.shop'

const internalServerAddress = `${baseAddress}/internal-server-error`
const pageNotFoundAddress = `${baseAddress}"/page-not-found`

export const axiosInstance = axios.create({
    baseURL: "https://www.myarticle.shop",
    headers: {
        "Content-Type": "application/json",
    },
});


axiosInstance.interceptors.response.use(response=>response,(error)=>{
    
    
    if(error?.response?.data?.message=='Access Token Expired'){
        toast.error("User Session Expired Login Again")
        store.dispatch(logoutUser(''))
    }

    if(error?.response?.data?.message=='Internal server error'||error.response==undefined){
        toast.error("Internal Server Error")
      window. location.href=internalServerAddress
    }
    if (error.response.data.message === 'Page not found') {
      
        window. location.href=pageNotFoundAddress
      }
   
    return Promise.reject(error)
})
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
