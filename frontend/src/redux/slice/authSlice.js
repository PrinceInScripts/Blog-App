import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axiosInstance from '../../config/axiosInstance'
import toast from 'react-hot-toast'

const initialState={
    isLoggedIn:localStorage.getItem("isLoggedIn") || false,
    data:localStorage.getItem("data") || {}
}

export const createAccount=createAsyncThunk("/auth/signup",async (data)=>{
    try {
        const response=axiosInstance.post("auth/register",data)
        console.log(response);
        toast.promise(response,{
            loading:'Wait! creating your account',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Faild to create your account'
        })

        return await response;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const login=createAsyncThunk("/auth/login",async (data)=>{
    try {
        const response=axiosInstance.post("auth/login",data)
       
        toast.promise(response,{
            loading:'Wait! authenticating your account',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Faild to authenticate your account'
        })

        return await response;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
export const logout=createAsyncThunk("/auth/logout",async ()=>{
    try {
        const response=axiosInstance.get("users/logout")
       console.log(response);
        toast.promise(response,{
            loading:'Wait! logging out your account',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Faild to logout your account'
        })

        return await response;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})



const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
    builder
           .addCase(login.fulfilled,(state,action)=>{
              
               const user=action.payload?.data?.data?.user;

               if(user){
                localStorage.setItem('data',JSON.stringify(user))
                localStorage.setItem('isLoggedIn',true)

                state.isLoggedIn=true;
                state.data=user;
               }
           })  
           .addCase(logout.fulfilled,(state)=>{
            localStorage.clear()
            state.isLoggedIn=false
            state.role=""
            state.data={}
           })
    }
})

export default authSlice.reducer;