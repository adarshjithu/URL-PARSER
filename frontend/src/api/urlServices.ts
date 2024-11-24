import { axiosInstance } from "./baseUrl"


export const createShortUrl =async(url:string)=>{
    const response = await axiosInstance.post("/",{url:url})
    return response;
}


export const getUserUrls =async()=>{
   
    const Response =  await axiosInstance.get("/");
    return Response;
}

export const deleteUrlData = async(url:string)=>{
   
    const Response =  await axiosInstance.delete(`/?url=${url}`);
    return Response;
}