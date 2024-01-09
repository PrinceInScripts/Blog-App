import mongoose,{Schema} from 'mongoose'
import slugify from 'slugify'
import {Comment} from './comments.models.js'
import { Likes } from './likes.models.js'

const blogSchema=new Schema({
      title:{
        type:String,
        required:true
      },
      content:{
        type:String,
        required:true
      },
      image:{
        type:String,
        required:true
      },
      readTime:{
        type:Number,
        default:3
      },
      category:{
          type:Schema.Types.ObjectId,
          ref:"Category"
      },
      likes:[
        {
          type:Schema.Types.ObjectId,
          ref:"Likes"
        }
      ],
      author:{
           type:Schema.Types.ObjectId,
           ref:"User"
      },
      comments:[
        {
          type:Schema.Types.ObjectId,
          ref:"Comment"
        }
      ],
      slug:{
        type:String,
        unique:true
      },
      likesCount:{
        type:Number,
        default:0
      },
      commentCount:{
        type:Number,
        default:0
      }
},{timestamps:true})

blogSchema.pre("save",function (next){
  if(!this.isModified('title')) next()

  this.slug=this.makeSlug()

  next()
})


blogSchema.methods.makeSlug=function (){
  return slugify(this.title,{
    replacement:'-',
    remove:/[*+~.()'"!:@]/g,
    lower:true
  })
}

blogSchema.methods.like=async function (userId){
  if(!this.likes.includes(userId)){
    this.likes.push(userId);
    this.likesCount=this.likes.length;
    await this.save({validateBeforeSave:false});
  }
}

blogSchema.methods.unlike=async function (userId){
  if(this.likes.includes(userId)){
    this.likes=this.likes.filter(like=>like.toString()!==userId.toString())
    this.likesCount=this.likes.length;
    await this.save({validateBeforeSave:false})
  }
}

blogSchema.methods.addComment = async function (commentId) {
  if (!this.comments.includes(commentId)) {
    this.comments.push(commentId);
    this.commentCount = this.comments.length;
    await this.save();
  }
};

blogSchema.methods.removeComment = async function (commentId) {
  if (this.comments.includes(commentId)) {
    this.comments = this.comments.filter((comment) => comment.toString() !== commentId.toString());
    this.commentCount = this.comments.length;
    await this.save();
  }
};

blogSchema.pre("remove", async function (next) {
  await Comment.deleteMany({ _id: { $in: this.comments } });
  next();
});






export const Blog=mongoose.model("Blog",blogSchema)