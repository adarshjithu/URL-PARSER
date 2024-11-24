

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem('userInfo')||''):null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUserCredential:(state,action)=>{
              state.userInfo = action.payload;
              localStorage.setItem("userInfo",JSON.stringify(action.payload))
        },
        logoutUser:(state,action)=>{
            localStorage.removeItem("userInfo")
            state.userInfo = null;
            localStorage.removeItem("url-parser-token")
        }
    }

})

export const {setUserCredential,logoutUser} = authSlice.actions;

export const authReducer =  authSlice.reducer