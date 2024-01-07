import mongoose,{Schema} from "mongoose";

const commentSchema=new Schema({
    content:{
        type:String,
        required:true
    },
    blog:{
        type:Schema.Types.ObjectId,
        ref:"Blog"
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date
    },
    updatedAt:{
        type:String
    }
},{timestamps:true})

export const Comment=mongoose.model("Comment",commentSchema)