import { CommentLikes } from "../models/commentLikes.models..js";
import { Comment } from "../models/comments.models.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/AsyncHander.js";


// ++++++++++++++++++++++++++ likeComment ++++++++++++++++++++++++++

const likeComment=asyncHandler (async (req,res)=>{
    const {commentId}=req.params;
    const userId=req.user._id;

    const comment=await Comment.findById(commentId)

    if(!comment){
        throw new ApiError(404,"Comment is not here")
    }

   
    const newLike=await CommentLikes.create({
        comment:comment._id,
        likedBy:userId
    })


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


// ++++++++++++++++++++++++++ unLikeComment ++++++++++++++++++++++++++

// ++++++++++++++++++++++++++ getBlogLikes ++++++++++++++++++++++++++

const getCommentLikes = asyncHandler(async (req, res) => {
    const {commentId}=req.params;
 
    const comment=await Comment.findById(commentId)
   
    if(!comment){
        throw new ApiError(404,"comment not found")
    }

    const likes = await CommentLikes.findOne({comment:commentId}).populate('likedBy');

    return res.status(200).json(new ApiResponse(200, { likes: likes }, 'Blog likes fetched successfully'));
});


export {
    likeComment,

    getCommentLikes
}
