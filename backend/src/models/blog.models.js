import mongoose,{Schema} from 'mongoose'
import slugify from 'slugify'
import {Comment} from './comments.models.js'

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
      likes:{
          type:Schema.Types.ObjectId,
          ref:"Likes"
      },
      author:{
           type:Schema.Types.ObjectId,
           ref:"User"
      },
      comments:{
          type:Schema.Types.ObjectId,
          ref:"Comment"
      },
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

blogSchema.post("save",async function (doc){
  await doc.populate("comments").execPopulate();
  doc.commentCount=doc.comments.length;
  await doc.save()
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
    await this.save();
  }
}

blogSchema.methods.unlike=async function (userId){
  if(this.likes.includes(userId)){
    this.likes=this.likes.filter(like=>like.toString()!==userId.toString())
    this.likesCount=this.likes.length;
    await this.save()
  }
}

blogSchema.pre('remove',async function(next){
  await Comment.deleteMany({blog:this._id})
  next()
})

export const Blog=mongoose.model("Blog",blogSchema)