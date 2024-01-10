import { Comment } from "../models/comments.models.js";
import { asyncHandler } from "../utlis/AsyncHander.js";


export const checkCommentExist=asyncHandler(async (req,_,next)=>{
    const {commentId}=req.params;
    const comment=await Comment.findById(commentId)

    if(!comment){
        throw new ApiError(404,"There is no such comment")
    }

    next()
})
