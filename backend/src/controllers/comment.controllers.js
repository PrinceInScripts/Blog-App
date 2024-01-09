import { Blog } from "../models/blog.models";
import { ApiError } from "../utlis/ApiError";
import { ApiResponse } from "../utlis/ApiResponse";
import { asyncHandler } from "../utlis/AsyncHander";


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

    blog.commentCount = (blog.commentCount || 0) + 1;
    await blog.save();

    return res
        .status(201)
        .json(new ApiResponse(201, { comment: newComment }, "Comment added successfully"));
})


const getBlogComments=asyncHandler(async (req,res)=>{
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    const comments = await Comment.find({ blog: blog._id }).populate("owner");

    return res.status(200).json(new ApiResponse(200, { comments: comments }, "Comments fetched successfully"));
})

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

    blog.commentCount = (blog.commentCount || 0) - 1;
    await blog.save();

    await comment.remove();

    return res.status(200).json(new ApiResponse(200, {}, "Comment deleted successfully"));

})

export {
    addComment,
    getBlogComments,
    deleteComment
}