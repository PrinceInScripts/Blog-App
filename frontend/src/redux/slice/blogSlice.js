import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/axiosInstance"
import toast from "react-hot-toast"

const initialState={
    blogs:[]
}

export const getAllBlogs=createAsyncThunk("blog/getAllBlog",async () => {
    try {
        const response=axiosInstance.get("/blog")
       console.log(response);
        toast.promise(response,{
            loading:"Wait! feching you blogs",
            success: (data) => {
                return data?.data?.message;
              },
              error: 'Faild to load blogs'
        })

        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const blogSlice=createSlice({
    name:"blog",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
    builder
           .addCase(getAllBlogs.fulfilled,(state,action)=>{
            console.log(action);
            if(action?.payload){
               state.blogs=[...action.payload.data.data]
            }
           })
    }
})

export default blogSlice.reducer;