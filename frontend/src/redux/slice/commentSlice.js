import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  comments: [],
};

export const addComment = createAsyncThunk("comments/addComment", async ({ slug, content }, { dispatch, getState }) => {
  try {
    const response = axiosInstance.post(`/comment/${slug}/add-comment`, { content, });
    toast.promise(response, {
      loading: "Wait! Adding a comment...",
      success: (data) => {

        return data?.data?.message;
      },
      error: "Failed to add a comment",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}
);

export const deleteComment = createAsyncThunk("comments/deleteComment", async (commentId, { dispatch, getState }) => {
  try {
    const response = axiosInstance.delete(`/comment/${commentId}/remove-comment`);
    toast.promise(response, {
      loading: "Wait! Deleting a comment...",
      success: (data) => {
        dispatch(getBlogComments());
        return data?.data?.message;
      },
      error: "Failed to delete a comment",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}
);

export const getBlogComments = createAsyncThunk("comments/getBlogComments", async (slug) => {
  try {

    const response = await axiosInstance.get(`/comment/${slug}`);
    console.log(response.data);
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
        console.log(action);
        if (action?.payload) {
          state.comments = action.payload.data.data;
        }
      })


  },
});

export default commentSlice.reducer;