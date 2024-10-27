import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiURL } from "../../constants";

export const login = createAsyncThunk("login",async (body)=>{
    const response = await fetch(`${apiURL}/auth/login`,{
        headers:{
          "Content-Type":"application/json"
        },
        method:"POST",
        body:JSON.stringify(body)
      }).then((res)=>res.json());
      return response;
});

export const register = createAsyncThunk("register",async (body)=>{
    const response = await fetch(`${apiURL}/auth/register`,{
        headers:{
          "Content-Type":"application/json"
        },
        method:"POST",
        body:JSON.stringify(body)
      }).then((res)=>res.json());
      return response;
});

const authSlice = createSlice({
    name:"auth",
    initialState:{
        token:sessionStorage.getItem('EXPENSE-TRACKER-TOKEN'),
        userDetails:JSON.parse(sessionStorage.getItem('EXPENSE-TRACKER-USER-DETAILS'))
    },
    reducers:{
        logout:(state,action)=>{
            sessionStorage.removeItem('EXPENSE-TRACKER-TOKEN');
            sessionStorage.removeItem('EXPENSE-TRACKER-USER-DETAILS');
            state.token = null;
            state.userDetails = null;
        },
        updateUserState:(state,action)=>{
            const newDetails =  {...state.userDetails,...action.payload};
            state.userDetails = newDetails;
            sessionStorage.setItem("EXPENSE-TRACKER-USER-DETAILS",JSON.stringify(newDetails));
        }
    },
    extraReducers:builder=>{
        builder
            .addCase(login.fulfilled,(state,action)=>{
               if(action.payload.status===200){
                sessionStorage.setItem("EXPENSE-TRACKER-TOKEN",action.payload.token);
                sessionStorage.setItem("EXPENSE-TRACKER-USER-DETAILS",JSON.stringify(action.payload.data));
                    state.userDetails=action.payload.data;
                    state.token=action.payload.token;
                
               }
              
            })
    }
});

export const {logout,updateUserState} = authSlice.actions;
export default authSlice.reducer;
