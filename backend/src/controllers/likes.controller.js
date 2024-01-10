import { Blog } from "../models/blog.models";
import { Likes } from "../models/likes.models";
import { ApiError } from "../utlis/ApiError";
import { ApiResponse } from "../utlis/ApiResponse";
import { asyncHandler } from "../utlis/AsyncHander";


const likeBlog=asyncHandler(async (req,res)=>{
    const {slug}=req.params;
    const userId=req.user._id

    const blog=await Blog.findOne({slug})

    if(!blog){
        throw new ApiError(404,"Blog not found")
    }

    const existingLike=await Likes.findOne({blog:blog._id,likedBy:userId})

    if(!existingLike){
        throw new ApiError(400,"User has already likes this blog")
    }

    const newLike=await Likes.create({
        blog:blog._id,
        likedBy:userId
    })

    await blog.like(userId)

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

const unLikeBlog=asyncHandler(async (req,res)=>{
    const {slug}=req.params;
    const userId=req.user._id

    const blog=await Blog.findOne({slug})

    if(!blog){
        throw new ApiError(404,"Blog not found")
    }

    const existingLike=await Likes.findOne({blog:blog._id,likedBy:userId})

    if(!existingLike){
        throw new ApiError(400,"User has not liked this blog")
    }

    await existingLike.remove()

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


// const likeBlog = asyncHandler(async (req, res) => {
//     const { slug } = req.params;
//     const activeUser = req.user;
  
//     try {
//       const blog = await Blog.findOne({ slug }).populate("author likes");
  
//       if (!blog) {
//         throw new ApiError(404, "Blog not found");
//       }
  
//       const currentBlog=await Blog.findById(blog._id)
//       const blogLikes=currentBlog.likes;
//      const hasUserLiked=  blogLikes.some((like) => like.toString() === activeUser._id.toString());
//       if (hasUserLiked) {
//         currentBlog.unlike(activeUser._id)

//          return res.status(200).json(
//           new ApiResponse(
//             200,
//             { blog: blog },
//             "User unliked the blog successfully"
//           )
//         );
//       } else {
//         currentBlog.like(activeUser._id);
  
//         return res.status(200).json(
//           new ApiResponse(
//             200,
//             { blog: blog },
//             "User liked the blog successfully"
//           )
//         );
//       }
//     } catch (error) {
//       console.error(error);
//       throw new ApiError(500, "Internal Server Error");
//     }
//   });

const getBlogLikes = asyncHandler(async (req, res) => {
    const {slug}=req.params;

    const blog=await Blog.findOne({slug})

    if(!blog){
        throw new ApiError(404,"Blog not found")
    }


    const likes = await Likes.find({ blog: blog._id }).populate('likedBy');

    return res.status(200).json(new ApiResponse(200, { likes: likes }, 'Blog likes fetched successfully'));
});


export {
    likeBlog,
    unLikeBlog,
    getBlogLikes
}

