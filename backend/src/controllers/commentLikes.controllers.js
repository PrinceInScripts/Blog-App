import { CommentLikes } from "../models/commentLikes.models.";
import { Comment } from "../models/comments.models";
import { ApiError } from "../utlis/ApiError";
import { ApiResponse } from "../utlis/ApiResponse";
import { asyncHandler } from "../utlis/AsyncHander";


// ++++++++++++++++++++++++++ likeComment ++++++++++++++++++++++++++

const likeComment=asyncHandler (async (req,res)=>{
    const {commentId}=req.params;
    const userId=req.user_id;

    const comment=await Comment.findById(commentId)

    if(!comment){
        throw new ApiError(404,"Comment is not here")
    }

    const existingLike=await CommentLikes.findOne({comment:comment._id,likedBy:userId})

    if(existingLike){
        return res
                  .status(200)
                  .json(
                    new ApiResponse(
                        200,
                        {},
                        "User liekd already"
                    )
                  )
    }

    const newLike=await CommentLikes.create({
        comment:comment._id,
        likedBy:userId
    })

    await comment.likes(newLike._id)

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


// ++++++++++++++++++++++++++ unLikeComment ++++++++++++++++++++++++++

const unLikeComment=asyncHandler(async (req,res)=>{
    const {slug}=req.params;
    const userId=req.user._id

    const comment=await Comment.findOne({slug})

    if(!comment){
        throw new ApiError(404,"comment is not here")
    }

    const existingLike=await CommentLikes.findOne({comment:comment._id,likedBy:userId})

    if(!existingLike){
       return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        {},
                        "User have not liked these comment"
                    )
                )
        
    }

    await CommentLikes.findByIdAndDelete(existingLike._id)

    await comment.unlike(existingLike._id)

    return res
              .status(200)
              .json(
                new ApiResponse(
                    200,
                    {},
                    "Comment unliked successfully"
                )
              )
})


// ++++++++++++++++++++++++++ getBlogLikes ++++++++++++++++++++++++++

const getCommentLikes = asyncHandler(async (req, res) => {
    const {slug}=req.params;

    const comment=await Comment.findOne({slug})

    if(!comment){
        throw new ApiError(404,"Blog not found")
    }


    const likes = await CommentLikes.find({ blog: blog._id }).populate('likedBy');

    return res.status(200).json(new ApiResponse(200, { likes: likes }, 'Blog likes fetched successfully'));
});


export {
    likeComment,
    unLikeComment,
    getCommentLikes
}
