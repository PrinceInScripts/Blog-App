import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/axiosInstance"
import toast from "react-hot-toast"

const initialState = {
    allBlogs: [],
    userBlogs: []
}



export const addBlog = createAsyncThunk("blog/addBlog", async (data) => {
    try {
        const response = axiosInstance.post("/blog/addBlog", data)

        toast.promise(response, {
            loading: "Wait! added blog",
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
export const getAllBlogs = createAsyncThunk("blog/getAllBlog", async () => {
    try {
        const response = axiosInstance.get("/blog")

        toast.promise(response, {
            loading: "Wait! feching blogs",
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
export const getUserBlogs = createAsyncThunk("blog/getUserBlogs", async () => {
    try {
        const response = axiosInstance.get("/blog/user/blogs")

        toast.promise(response, {
            loading: "Wait! feching your blogs",
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
export const getBlogDetails = createAsyncThunk("blog/getBlogDetails", async (slug) => {
    try {
        const response = axiosInstance.get(`/blog/${slug}`)

        toast.promise(response, {
            loading: "Wait! feching your blog details",
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
export const editBlog = createAsyncThunk("blog/editBlogDetails", async (slug) => {
    try {
        const response = axiosInstance.get(`/blog/edit-blog/${slug}`)

        toast.promise(response, {
            loading: "Wait! updating your blog details",
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
export const editBlogDetails = createAsyncThunk("blog/editBlogDetails", async (data) => {
    try {

        const response = axiosInstance.patch(`/blog/${data.slug}/edit-blog-detials`, { content: data.content })

        toast.promise(response, {
            loading: "Wait! updating your blog details",
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
export const editBlogImage = createAsyncThunk("blog/editBlogImage", async (data) => {
    try {

        const response = axiosInstance.patch(`/blog/${data.slug}/edit-blog-image`, data.formData)

        toast.promise(response, {
            loading: "Wait! updating your blog image",
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

export const ondeleteBlog = createAsyncThunk("blog/editBlogImage", async (slug) => {
    try {
        const response = axiosInstance.delete(`/blog/${slug}/delete-blog`)

        toast.promise(response, {
            loading: "Wait! deleting your blog",
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




const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                if (action?.payload) {
                    state.allBlogs = [...action.payload.data.data];
                }
            })
            .addCase(getUserBlogs.fulfilled, (state, action) => {
                if (action?.payload) {
                    state.userBlogs = [...action.payload.data.data];
                }
            })
            .addCase(editBlogDetails.fulfilled, (state, action) => {

                if (action?.payload) {
                    const updatedBlog = action.payload.data.data;
                    const index = state.allBlogs.findIndex((blog) => blog.id === updatedBlog.id);
                    if (index !== -1) {
                        state.allBlogs[index] = updatedBlog;
                    }
                }
            })
            // .addCase(editBlogImage.fulfilled, (state, action) => {
            //     if (action?.payload) {
            //         const updatedBlog = action.payload.data.data;
            //         const index = state.allBlogs.findIndex((blog) => blog.id === updatedBlog.id);
            //         if (index !== -1) {
            //             state.allBlogs[index] = updatedBlog;
            //         }
            //     }
            // })
            .addCase(ondeleteBlog.fulfilled, (state, action) => {

                if (action?.payload) {

                    const deletedBlogId = action.payload.data.data._id;
                    state.allBlogs = state.allBlogs.filter((blog) => blog.id !== deletedBlogId);
                }
            });
    }
})

export default blogSlice.reducer;