import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiURL, fetchHeaders } from "../../constants";

export const fetchExpensesGraphData = createAsyncThunk("fetchExpensesGraphData",async (year)=>{
    const response = await fetch(`${apiURL}/dashboard/expense-graph-data?year=${year}`,{
        headers:fetchHeaders,
        method:"GET",
      }).then(res=>res.json());
      return response;
});


const dashboardSlice = createSlice({
    name:"dashboard",
    initialState:{
        expenseGraphData:{}
    },
    extraReducers:builder=>{
        builder
            .addCase(fetchExpensesGraphData.fulfilled,(state,action)=>{
                if(action.payload.status===200){
                state.expenseGraphData=action.payload.data;
                }
               
            })
    }
});


export default dashboardSlice.reducer;
