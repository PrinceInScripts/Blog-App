import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import blogReducer from './slice/blogSlice'

const store=configureStore({
    reducer:{
      auth:authReducer,
      blog:blogReducer
    },
    devTools:true
})

export default store;