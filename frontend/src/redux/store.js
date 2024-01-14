import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import blogReducer from './slice/blogSlice'
import commentReducer from './slice/commentSlice'
import persistedLikeBlogsReducer from './slice/blogLikeSlice'
import persistedCommentLikesReducer from './slice/commentLikeSlice'

const store=configureStore({
    reducer:{
      auth:authReducer,
      blog:blogReducer,
      comment:commentReducer,
      likeBlogs: persistedLikeBlogsReducer,
      commentLikes:persistedCommentLikesReducer
    },
    devTools:true
})

export default store;