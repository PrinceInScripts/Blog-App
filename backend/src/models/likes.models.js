import mongoose,{Schema} from "mongoose";

const likesSchema=new Schema({
    blog:{
        type:Schema.Types.ObjectId,
        ref:"Blog"
    },
    likedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    comment:{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    }
},{timestamps:true})

export const Likes=mongoose.model("Likes",likesSchema)