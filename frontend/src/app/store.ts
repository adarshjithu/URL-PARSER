

import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";

export interface IRootState  {
    auth:Record<string,any>
}
 const store =  configureStore({
    reducer:{
        auth:authReducer
    }
})

export default store;