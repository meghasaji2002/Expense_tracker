import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiURL, fetchHeaders, fetchHeadersMultipart } from "../../constants";

export const fetchUserList = createAsyncThunk("fetchUserList",async ()=>{
    const response = await fetch(`${apiURL}/user`,{
        headers:fetchHeaders,
        method:"GET",
      }).then(res=>res.json());
      return response;
});

export const editUser = createAsyncThunk("editUser",async (formdata,isMultipart=false)=>{
    const response = await fetch(`${apiURL}/user`,{
        headers:isMultipart?fetchHeadersMultipart:fetchHeaders,
        method:"PUT",
        body:formdata
      }).then(res=>res.json());
      return response;
});



export const changeUserType = createAsyncThunk("changeUserType",async (body)=>{
    const response = await fetch(`${apiURL}/user/type`,{
        headers:fetchHeaders,
        method:"POST",
        body:JSON.stringify(body)
      }).then(res=>res.json());
      return response;
});



export const deleteUser = createAsyncThunk("deleteUser",async (body)=>{
    const response = await fetch(`${apiURL}/user`,{
        headers:fetchHeaders,
        method:"DELETE",
        body:JSON.stringify(body)
      }).then(res=>res.json());
      return response;
});




const userSlice = createSlice({
    name:"user",
    initialState:{
        userlist:[]
    },
    extraReducers:builder=>{
        builder
            .addCase(fetchUserList.fulfilled,(state,action)=>{
                if(action.payload.status===200){
                state.userlist=action.payload.data;
                }
               
            })
    }
});


export default userSlice.reducer;
