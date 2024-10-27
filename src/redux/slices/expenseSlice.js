import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiURL, fetchHeaders } from "../../constants";

export const fetchExpenses = createAsyncThunk("fetchExpenses",async (body)=>{
    const response = await fetch(`${apiURL}/expense`,{
        headers:fetchHeaders,
        method:"GET",
        body:JSON.stringify(body)
      }).then((res)=>res.json());
      return response;
});

export const createExpense = createAsyncThunk("createExpense",async (body)=>{
    const response = await fetch(`${apiURL}/expense`,{
        headers:fetchHeaders,
        method:"POST",
        body:JSON.stringify(body)

      }).then((res)=>res.json());
      return response;
});

export const updateExpense = createAsyncThunk("updateExpense",async (body)=>{
  const response = await fetch(`${apiURL}/expense`,{
      headers:fetchHeaders,
      method:"PUT",
      body:JSON.stringify(body)

    }).then((res)=>res.json());
    return response;
});

export const deleteExpense = createAsyncThunk("deleteExpense",async(body)=>{
  const response = await fetch(`${apiURL}/expense`,{
      headers:fetchHeaders,
      method:"DELETE",
      body:JSON.stringify(body)

    }).then((res)=>res.json());
    return response;
});

const expenseSlice = createSlice({
    name:"expense",
    initialState:{
        expenseList:[]
    },
    extraReducers:builder=>{
        builder
            .addCase(fetchExpenses.fulfilled,(state,action)=>{
                if(action.payload.status===200){
                  let itemBalance = 0;
                  const list=[...action?.payload?.data]?.sort((a,b)=>{
                      const dateTimeA =new Date(a.date+ ' '+a.time).getTime();
                      const dateTimeB = new Date(b.date+ ' '+b.time).getTime();
                      return dateTimeA-dateTimeB;    
                  });
                  const newList = list.map((item)=>{
                    itemBalance = item.type==="CR"?itemBalance+item.amount:itemBalance-item.amount;
                    return {...item,itemBalance};
                  })
                  state.expenseList=newList.reverse();
                }
               
            })
    }
});

export const {setToken} = expenseSlice.actions;
export default expenseSlice.reducer;
