import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import expenseSlice from "./slices/expenseSlice";
import dashboardSlice from "./slices/dashboardSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer:{
        auth:authSlice,
        expense:expenseSlice,
        dashboard:dashboardSlice,
        user:userSlice
    },
    middleware: (getDefaultmiddleware)=>
        getDefaultmiddleware({
            serializableCheck:false
        })
})

export default store;