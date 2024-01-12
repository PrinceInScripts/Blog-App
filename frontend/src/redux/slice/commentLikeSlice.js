import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  commentLikes: [],
};

export const likeComment = createAsyncThunk("commentLikes/likeComment",async (commentId, { dispatch, getState }) => {
    try {
      const response = await axiosInstance.post(`/comment-likes/${commentId}/like`);
      toast.promise(response, {
        loading: "Wait! Liking a comment...",
        success: (data) => {
          dispatch(getCommentLikes(commentId)); 
          return data?.data?.message;
        },
        error: "Failed to like a comment",
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const unLikeComment = createAsyncThunk("commentLikes/unLikeComment",async (commentId, { dispatch, getState }) => {
    try {
      const response = await axiosInstance.post(`/comment-likes/${commentId}/unlike`);
      toast.promise(response, {
        loading: "Wait! Unliking a comment...",
        success: (data) => {
          dispatch(getCommentLikes(commentId)); 
          return data?.data?.message;
        },
        error: "Failed to unlike a comment",
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const getCommentLikes = createAsyncThunk("commentLikes/getCommentLikes",async (commentId) => {
    try {
      const response = await axiosInstance.post(`/comment-likes/${commentId}`);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const commentLikesSlice = createSlice({
  name: "commentLikes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentLikes.fulfilled, (state, action) => {
        if (action?.payload) {
          state.commentLikes = action.payload.data.data;
        }
      })
      
  },
});

export default commentLikesSlice.reducer;