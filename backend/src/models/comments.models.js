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
    likes:[
        {
          type:Schema.Types.ObjectId,
          ref:"CommentLikes"
        }
      ],
      likesCount:{
        type:Number,
        default:0
      }
},{timestamps:true})


commentSchema.methods.like=async function (likeId){
    if(!this.likes.includes(likeId)){
      this.likes.push(likeId);
      this.likesCount=this.likes.length;
      await this.save({validateBeforeSave:false});
    }
  }
  
  commentSchema.methods.unlike=async function (userId){
    if(this.likes.includes(userId)){
      this.likes=this.likes.filter(like=>like.toString()!==userId.toString())
      this.likesCount=this.likes.length;
      await this.save({validateBeforeSave:false})
    }
  }
  

export const Comment=mongoose.model("Comment",commentSchema)