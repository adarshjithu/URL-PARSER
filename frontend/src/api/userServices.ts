import { Axis3D } from "lucide-react";
import { ISignup } from "../Interface/IAuth";
import { axiosInstance } from "./baseUrl";

export const userSignup = async (formData: ISignup) => {
    
    const response = await axiosInstance.post("/auth/signup", formData);

    return response;
};
export const useLogin = async (formData: ISignup) => {
    
    const response = await axiosInstance.post("/auth/login", formData);
    return response;
};
