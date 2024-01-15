import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const initialState = {
  likedBlogs: [],
};

export const likeBlog = createAsyncThunk("likeBlogs/likeBlog", async (slug) => {
  try {
    const response = axiosInstance.post(`/blog-like/${slug}/like`);
    toast.promise(response, {
      loading: "Wait! Liking the blog...",
      success: (data) => {

        return data?.data?.message;
      },
      error: "Failed to like the blog",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const unLikeBlog = createAsyncThunk("likeBlogs/unLikeBlog", async (slug, { dispatch, getState }) => {
  try {
    const response = axiosInstance.post(`/blog-like/${slug}/unlike`);
    toast.promise(response, {
      loading: "Wait! Unliking the blog...",
      success: (data) => {

        return data?.data?.message;
      },
      error: "Failed to unlike the blog",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const getLikedBlogs = createAsyncThunk("likeBlogs/getLikedBlogs", async (slug) => {
  try {
    const response = await axiosInstance.get(`/blog-like/${slug}`);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
const persistConfig = {
  key: "likeBlogs",
  storage,
};

const likeBlogsSlice = createSlice({
  name: "likeBlogs",
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(getLikedBlogs.fulfilled, (state, action) => {
        if (action?.payload) {
          state.likedBlogs = action.payload.data.data;
        }
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        // If liking is successful, update the liked status
        if (action?.payload.success) {
          state.likedBlogs.push(action.payload.data); // Assuming payload.data contains the liked blog information
        }
      })
      .addCase(unLikeBlog.fulfilled, (state, action) => {
        // If unliking is successful, update the liked status
        if (action?.payload.success) {
          const index = state.likedBlogs.findIndex(blog => blog._id === action.payload.data._id);
          if (index !== -1) {
            state.likedBlogs.splice(index, 1);
          }
        }
      });
  },
});

export const { updateLikesCount } = likeBlogsSlice.actions;

const persistedLikeBlogsReducer = persistReducer(persistConfig, likeBlogsSlice.reducer);

export default persistedLikeBlogsReducer;