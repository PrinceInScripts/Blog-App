import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axiosInstance from '../../config/axiosInstance'
import toast from 'react-hot-toast'

const initialState={
    isLoggedIn:localStorage.getItem("isLoggedIn") || false,
    data:JSON.parse(localStorage.getItem("data"))|| {}
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
export const getUserData=createAsyncThunk("/auth/me",async ()=>{
    try {
        const response=axiosInstance.get("users/me")
       console.log(response);

        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const forgetPassword=createAsyncThunk("/auth/forgotPassword",async (email)=>{
    try {
        const response=axiosInstance.post("auth/forget-password",{email})
    
        toast.promise(response,{
            loading:'Laoding',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Faild to verification email'
        })

        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const resetPassword=createAsyncThunk("/auth/reset",async (data)=>{
    try {
        const response=axiosInstance.patch(`auth/reset-password/${data.resetToken}`,{password:data.password})
      
        toast.promise(response,{
            loading:'Resetting....',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Faild to reset your password'
        })  

        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
export const refreshToken=createAsyncThunk("/auth/refreshToken",async ()=>{
    try {
        const response=axiosInstance.post("auth/refresh-token")
      
        toast.promise(response,{
            loading:'Refreshing....',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Faild to refresh token'
        })  

        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
export const changePassword=createAsyncThunk("/auth/changePassword",async (userPassword)=>{
    try {
        const response=axiosInstance.post("users/change-password",userPassword)
      
        toast.promise(response,{
            loading:'Loading....',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Faild to change Password'
        })  

        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
export const updateAccount=createAsyncThunk("/auth/updateAccount",async (data)=>{
    try {
        const response=axiosInstance.patch("users/update-account",data)
      
        toast.promise(response,{
            loading:'Wait! updating your account',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Faild to update your account'
        })  

        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
export const updateAvatar=createAsyncThunk("/auth/updateAvatar",async (avatar)=>{
    try {
        const response=axiosInstance.patch("users/avatar",avatar)
        console.log(response);
        toast.promise(response,{
            loading:'Wait! updating your avatar',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Faild to update your avatar'
        })  

        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
export const updateCoverImage=createAsyncThunk("/auth/updateCoverImage",async (coverImage)=>{
    try {
        const response=axiosInstance.patch("users/coverImage",coverImage)
        console.log(response);
        toast.promise(response,{
            loading:'Wait! updating your coverImage',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Faild to update your coverImage'
        })  

        console.log(await response);
        return (await response).data;
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
           .addCase(getUserData.fulfilled,(state,action)=>{
            if(!action?.payload?.user) return

            localStorage.setItem("data",JSON.stringify(action?.payload?.user))
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("role",action?.payload?.user?.role)
            state.isLoggedIn=true;
            state.role=action?.payload?.user?.role
            state.data=action?.payload?.user
           })
           .addCase(updateAccount.fulfilled,(state,action)=>{
              const updatingDetials=action.payload?.data.data.user;
              state.data={...state.data,...updatingDetials}

              localStorage.setItem("data",JSON.stringify(state.data))
           })
           .addCase(updateAvatar.fulfilled,(state,action)=>{
            const updatingDetials=action.payload?.data;
            state.data={...state.data,...updatingDetials}
              localStorage.setItem("data",JSON.stringify(state.data))
           })
           .addCase(updateCoverImage.fulfilled,(state,action)=>{
           
              const updatingDetials=action.payload?.data;
              state.data={...state.data,...updatingDetials}

              localStorage.setItem("data",JSON.stringify(state.data))
           })
    }
})

export default authSlice.reducer;