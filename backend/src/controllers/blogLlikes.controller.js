import { Blog } from "../models/blog.models.js";
import { BlogLikes } from "../models/blogLikes.models.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/AsyncHander.js";


// ++++++++++++++++++++++++++ likeBlog ++++++++++++++++++++++++++

const likeBlog=asyncHandler(async (req,res)=>{
    const {slug}=req.params;
    const userId=req.user._id
    
    const blog=await Blog.findOne({slug})

    console.log(blog);

    if(!blog){
        throw new ApiError(404,"Blog not found")
    }

    const existingLike=await BlogLikes.findOne({blog:blog._id,likedBy:userId})

    if(existingLike){
        return res
                 .status(200)
                 .json(
                    new ApiResponse(
                        200,
                        {},
                        "User already Liked it"
                        )
                 )
    }

    const newLike=await BlogLikes.create({
        blog:blog._id,
        likedBy:userId
    })

    await blog.like(newLike._id)

    return res
              .status(200)
              .json(
                new ApiResponse(
                    200,
                    {like:newLike},
                    "Blog liked successfully"
                )
              )
})


// ++++++++++++++++++++++++++ unLikeBlog ++++++++++++++++++++++++++

const unLikeBlog=asyncHandler(async (req,res)=>{
    const {slug}=req.params;
    const userId=req.user._id

    const blog=await Blog.findOne({slug})

    if(!blog){
        throw new ApiError(404,"Blog not found")
    }

    const existingLike=await BlogLikes.findOne({blog:blog._id,likedBy:userId})
    console.log(existingLike);

    if(!existingLike){
       return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        {},
                        "User have not liked these post"
                    )
                )
        
    }

    await BlogLikes.findByIdAndDelete(existingLike._id)

    await blog.unlike(existingLike._id)

    return res
              .status(200)
              .json(
                new ApiResponse(
                    200,
                    {},
                    "Blog unliked successfully"
                )
              )
})


// ++++++++++++++++++++++++++ getBlogLikes ++++++++++++++++++++++++++

const getBlogLikes = asyncHandler(async (req, res) => {
    const {slug}=req.params;

    const blog=await Blog.findOne({slug})

    if(!blog){
        throw new ApiError(404,"Blog not found")
    }


    const likes = await BlogLikes.find({ blog: blog._id }).populate('likedBy');

    return res.status(200).json(new ApiResponse(200, { likes: likes }, 'Blog likes fetched successfully'));
});


export {
    likeBlog,
    unLikeBlog,
    getBlogLikes
}

