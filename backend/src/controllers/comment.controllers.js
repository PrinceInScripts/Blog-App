import { Blog } from "../models/blog.models.js";
import { Comment } from "../models/comments.models.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/AsyncHander.js";


// ++++++++++++++++++++++++++ addComment ++++++++++++++++++++++++++

const addComment=asyncHandler(async (req,res)=>{
    const { slug } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    const newComment = await Comment.create({
        content,
        blog: blog._id,
        owner: userId,
    });

    await blog.addComment(newComment._id)

    return res
        .status(201)
        .json(
            new ApiResponse(
                201, 
                { comment: newComment }, 
                "Comment added successfully")
            );
})


// ++++++++++++++++++++++++++ deleteComment ++++++++++++++++++++++++++

const deleteComment=asyncHandler(async (req,res)=>{
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    const blog = await Blog.findById(comment.blog);

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    
   await Comment.findByIdAndDelete(commentId)

   await blog.removeComment(commentId)
   

    return res.status(200).json(new ApiResponse(200, {}, "Comment deleted successfully"));

})


// ++++++++++++++++++++++++++ getBlogComments ++++++++++++++++++++++++++

const getBlogComments=asyncHandler(async (req,res)=>{
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    const comments = await Comment.find({ blog: blog._id }).populate("owner");

    return res.status(200).json(new ApiResponse(200, { comments: comments }, "Comments fetched successfully"));
})

export {
    addComment,
    getBlogComments,
    deleteComment
}