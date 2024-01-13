import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import blogReducer from './slice/blogSlice'
import commentReducer from './slice/commentSlice'

const store=configureStore({
    reducer:{
      auth:authReducer,
      blog:blogReducer,
      comment:commentReducer
    },
    devTools:true
})

export default store;