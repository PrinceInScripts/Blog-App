import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/axiosInstance"
import toast from "react-hot-toast"

const initialState={
    allBlogs:[],
    userBlogs:[]
}



export const addBlog=createAsyncThunk("blog/addBlog",async (data) => {
    try {
        const response=axiosInstance.post("/blog/addBlog",data)
       
        toast.promise(response,{
            loading:"Wait! added blog",
            success: (data) => {
                return data?.data?.message;
              },
              error: 'Faild to add blog'
        })

        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
export const getAllBlogs=createAsyncThunk("blog/getAllBlog",async () => {
    try {
        const response=axiosInstance.get("/blog")
       
        toast.promise(response,{
            loading:"Wait! feching blogs",
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
export const getUserBlogs=createAsyncThunk("blog/getUserBlogs",async () => {
    try {
        const response=axiosInstance.get("/blog/user/blogs")
        toast.promise(response,{
            loading:"Wait! feching your blogs",
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
export const getBlogDetails=createAsyncThunk("blog/getBlogDetails",async (slug) => {
    try {
        const response=axiosInstance.get(`/blog/${slug}`)
       console.log(response);
        toast.promise(response,{
            loading:"Wait! feching your blog details",
            success: (data) => {
                return data?.data?.message;
              },
              error: 'Faild to load blog details'
        })

        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
export const editBlog=createAsyncThunk("blog/editBlogDetails",async (slug) => {
    try {
        const response=axiosInstance.get(`/blog/edit-blog/${slug}`)
       console.log(response);
        toast.promise(response,{
            loading:"Wait! updating your blog details",
            success: (data) => {
                return data?.data?.message;
              },
              error: 'Faild to updating blog details'
        })

        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
export const editBlogDetails=createAsyncThunk("blog/editBlogDetails",async (slug,data) => {
    try {
        const response=axiosInstance.patch(`/blog/${slug}/edit-blog-detials`,data)
       console.log(response);
        toast.promise(response,{
            loading:"Wait! updating your blog details",
            success: (data) => {
                return data?.data?.message;
              },
              error: 'Faild to updating blog details'
        })

        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
export const editBlogImage=createAsyncThunk("blog/editBlogImage",async (slug,image) => {
    try {
        const response=axiosInstance.patch(`/blog/${slug}/edit-blog-image`,image)
       console.log(response);
        toast.promise(response,{
            loading:"Wait! updating your blog image",
            success: (data) => {
                return data?.data?.message;
              },
              error: 'Faild to updating blog image'
        })

        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const deleteBlog=createAsyncThunk("blog/editBlogImage",async (slug) => {
    try {
        const response=axiosInstance.delete(`/blog/${slug}/delete-blog`)
       console.log(response);
        toast.promise(response,{
            loading:"Wait! deleting your blog",
            success: (data) => {
                return data?.data?.message;
              },
              error: 'Faild to delete blog'
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
            if(action?.payload){
               state.allBlogs=[...action.payload.data.data]
            }
           })
           .addCase(getUserBlogs.fulfilled,(state,action)=>{
            if(action?.payload){
               state.userBlogs=[...action.payload.data.data]
            }
           })
    }
})

export default blogSlice.reducer;