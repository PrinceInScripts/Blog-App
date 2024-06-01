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

    

    if(!blog){
        throw new ApiError(404,"Blog not found")
    }

    

    const newLike=await BlogLikes.create({
        blog:blog._id,
        likedBy:userId
    })

    await blog.like(newLike._id);

    return res
              .status(200)
              .json(
                new ApiResponse(
                    200,
                    {},
                    ""
                )
              )
})


// ++++++++++++++++++++++++++ unLikeBlog ++++++++++++++++++++++++++



// ++++++++++++++++++++++++++ getBlogLikes ++++++++++++++++++++++++++

const getBlogLikes = asyncHandler(async (req, res) => {
    const {slug}=req.params;

    const blog=await Blog.findOne({slug})

    if(!blog){
        throw new ApiError(404,"Blog not found")
    }


    const likes = await BlogLikes.find({ blog: blog._id }).populate('likedBy blog');

    return res.status(200).json(new ApiResponse(200, { data: likes }, ''));
});


export {
    likeBlog,
    getBlogLikes
}

