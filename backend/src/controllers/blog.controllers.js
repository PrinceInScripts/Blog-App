import {Blog}  from "../models/blog.models.js";
import { Category } from "../models/category.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/AsyncHander.js";
import { uploadOnCloudinary } from "../utlis/cloudinary.js";
import {paginateUtils, searchUtils} from '../utlis/query.js'

const createBlog=asyncHandler(async (req,res)=>{
     const {title,content,category}=req.body
     const user=await User.findById(req.user._id)

     if(!title || !content){
        throw new ApiError(400,"All fields are required")
     }

     const wordCount=content.trim().split(/\s+/).length;
     let readTime=Math.floor(wordCount/200)
 

     const imageLocalPath=req.file?.path;

     if(!imageLocalPath){
        throw new ApiError(400,"Image is required")
     }

     const image=await uploadOnCloudinary(imageLocalPath)

     if(!image){
        throw new ApiError(400,"the image is not uploaded on cloudinary")
     }

     let blogCategory = await Category.findOne({ name: category });
  if (!blogCategory) {
    blogCategory = await Category.create({ name: category });
  }

        const newBlog=await Blog.create({
           title,
           content,
           image:image?.url,
           author:user._id,
           readTime,
           category: blogCategory._id,
        })
   
        if(!newBlog){
           throw new ApiError(400,"something went wring, while creating the blog")
        }
   
        return res
                 .status(200)
                 .json(
                   new ApiResponse(
                       200,
                       newBlog,
                       "Blog Created Successfully"
                   )
                 )
    
})

const getAllBlogs=asyncHandler(async (req,res)=>{
    let query=await Blog.find();
    

    query=await searchUtils("title",query,req)
    const paginationResult=await paginateUtils(Blog,query,req)
    const blogs = await paginationResult.query;

  if (Array.isArray(blogs) && blogs.length > 0 && typeof blogs[0] === 'object') {
    blogs.sort((a, b) => b.createdAt - a.createdAt);
  }

    return res 
             .status(200)
             .json(
                new ApiResponse(
                    200,
                    {
                        count:(await blogs).length,
                        data:blogs,
                        page:paginationResult.page,
                        pages:paginationResult.pages
                    },
                    "Blogs fetched Successfully"
                )
             )
})

const getBlogsOfUser=asyncHandler(async (req,res)=>{
    const userId=req.user._id

    const blogs=await Blog.find({
        author:userId
    })

    if (Array.isArray(blogs) && blogs.length > 0 && typeof blogs[0] === 'object') {
        blogs.sort((a, b) => b.createdAt - a.createdAt);
      }

    return res 
    .status(200)
    .json(
       new ApiResponse(
           200,
           {
            count: blogs.length,
            blogs: blogs,
           },
           "Blogs fetched successfully for the authenticated user"
       )
    )
    

})

export {
    createBlog,
    getAllBlogs,
    getBlogsOfUser
}