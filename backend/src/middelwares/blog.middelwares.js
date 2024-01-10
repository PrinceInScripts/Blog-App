import {asyncHandler} from "../utlis/AsyncHander.js"
import {Blog} from '../models/blog.models.js'
import { ApiError } from "../utlis/ApiError.js";


export const checkBlogExist=asyncHandler(async (req,res,next)=>{
    const {slug}=req.params;
    const blog=await Blog.findOne({slug:slug})

    if(!blog){
        throw new ApiError(404,"There is no such blog with that slug")
    }

    next()
})

export const checkUserAndBlogExist=asyncHandler(async (req,res,next)=>{
    const {slug}=req.params
    const user=req.user;
    
    const blog=await Blog.findOne({
        slug:slug,
        author:user._id
    })

    if(!blog){
        throw new ApiError(404,"There is not blog with taht slug associated with User",400)
    }

    next()
})