import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  commentLikes: [],
};

export const likeComment = createAsyncThunk("commentLikes/likeComment", async (commentId, { dispatch, getState }) => {
  try {
    const response = axiosInstance.post(`/comment-like/${commentId}/like`);
    toast.promise(response, {
      loading: "Wait! Liking a comment...",
      success: (data) => {

        return data?.data?.message;
      },
      error: "Failed to like a comment",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const unLikeComment = createAsyncThunk("commentLikes/unLikeComment", async (commentId, { dispatch, getState }) => {
  try {
    const response = axiosInstance.post(`/comment-like/${commentId}/unlike`);
    toast.promise(response, {
      loading: "Wait! Unliking a comment...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to unlike a comment",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const getCommentLikes = createAsyncThunk("commentLikes/getCommentLikes", async (commentId) => {
  try {
    const response = await axiosInstance.get(`/comment-like/${commentId}`);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const persistConfig = {
  key: "commentLikes",
  storage,
};

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
      .addCase(likeComment.fulfilled, (state, action) => {
        // If liking is successful, update the liked status
        if (action?.payload.success) {
          state.commentLikes.push(action.payload.data); // Assuming payload.data contains the liked comment information
        }
      })
      .addCase(unLikeComment.fulfilled, (state, action) => {
        // If unliking is successful, update the liked status
        if (action?.payload.success) {
          const index = state.commentLikes.findIndex(comment => comment._id === action.payload.data._id);
          if (index !== -1) {
            state.commentLikes.splice(index, 1);
          }
        }
      });
  },
});

const persistedCommentLikesReducer = persistReducer(persistConfig, commentLikesSlice.reducer);

export default persistedCommentLikesReducer;