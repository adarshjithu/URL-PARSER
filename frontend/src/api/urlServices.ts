import { axiosInstance } from "./baseUrl"


export const createShortUrl =async(url:string)=>{
    const response = await axiosInstance.post("/api/url",{url:url})
    return response;
}


export const getUserUrls =async()=>{
   
    const Response =  await axiosInstance.get("/api/url");
    return Response;
}

export const deleteUrlData = async(url:string)=>{
   
    const Response =  await axiosInstance.delete(`/api/url?url=${url}`);
    return Response;
}