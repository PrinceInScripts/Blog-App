import mongoose,{Schema} from "mongoose";

const blogsLikesSchema=new Schema({
    blog:{
        type:Schema.Types.ObjectId,
        ref:"Blog"
    },
    likedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    
},{timestamps:true})

export const BlogLikes=mongoose.model("BlogLikes",blogsLikesSchema)