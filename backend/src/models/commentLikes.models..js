import mongoose,{Schema} from "mongoose";

const commentLikesSchema=new Schema({
    comment:{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    },
    likedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})



export const CommentLikes=mongoose.model("CommentLikes",commentLikesSchema)