import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  comments: [],
};

export const addComment = createAsyncThunk("comments/addComment",async ({ slug, content }, { dispatch, getState }) => {
    try {
      const response = await axiosInstance.post(`/comments/${slug}/add-comment`, {content,});
      toast.promise(response, {
        loading: "Wait! Adding a comment...",
        success: (data) => {
          dispatch(getBlogComments(slug)); 
          return data?.data?.message;
        },
        error: "Failed to add a comment",
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteComment = createAsyncThunk("comments/deleteComment", async (commentId, { dispatch, getState }) => {
    try {
      const response = await axiosInstance.delete(`/comments/${commentId}/remove-comment`);
      toast.promise(response, {
        loading: "Wait! Deleting a comment...",
        success: (data) => {
          dispatch(getBlogComments()); 
          return data?.data?.message;
        },
        error: "Failed to delete a comment",
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const getBlogComments = createAsyncThunk(
  "comments/getBlogComments",
  async (slug) => {
    try {
      const response = await axiosInstance.get(`/comments/${slug}`);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogComments.fulfilled, (state, action) => {
        if (action?.payload) {
          state.comments = action.payload.data.data;
        }
      })
      
     
  },
});

export default commentSlice.reducer;