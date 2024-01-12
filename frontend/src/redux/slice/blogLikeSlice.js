import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  likedBlogs: [],
};

export const likeBlog = createAsyncThunk("likeBlogs/likeBlog",async (slug, { dispatch, getState }) => {
    try {
      const response = await axiosInstance.post(`/blog-likes/${slug}/like`);
      toast.promise(response, {
        loading: "Wait! Liking the blog...",
        success: (data) => {
          dispatch(getLikedBlogs()); 
          return data?.data?.message;
        },
        error: "Failed to like the blog",
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const unLikeBlog = createAsyncThunk("likeBlogs/unLikeBlog", async (slug, { dispatch, getState }) => {
    try {
      const response = await axiosInstance.post(`/blog-likes/${slug}/unlike`);
      toast.promise(response, {
        loading: "Wait! Unliking the blog...",
        success: (data) => {
          dispatch(getLikedBlogs()); 
          return data?.data?.message;
        },
        error: "Failed to unlike the blog",
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const getLikedBlogs = createAsyncThunk("likeBlogs/getLikedBlogs",async () => {
    try {
      const response = await axiosInstance.get("/blog-likes"); 
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const likeBlogsSlice = createSlice({
  name: "likeBlogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLikedBlogs.fulfilled, (state, action) => {
        if (action?.payload) {
          state.likedBlogs = action.payload.data.data;
        }
      })
      
      
  },
});

export default likeBlogsSlice.reducer;