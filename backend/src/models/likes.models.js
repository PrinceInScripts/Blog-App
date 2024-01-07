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
    createdAt:Date,
    updatedAt:Date,
    comment:{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    }
},{timestamps:true})