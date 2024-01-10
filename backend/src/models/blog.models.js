import mongoose,{Schema} from 'mongoose'
import slugify from 'slugify'

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
          type:String,
          required:true,
      },
      likes:[
        {
          type:Schema.Types.ObjectId,
          ref:"BlogLikes"
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

blogSchema.methods.like=async function (likeId){
  if(!this.likes.includes(likeId)){
    this.likes.push(likeId);
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
    await this.save({validateBeforeSave:false});
  }
};

blogSchema.methods.removeComment = async function (commentId) {
  if (this.comments.includes(commentId)) {
    this.comments = this.comments.filter((comment) => comment.toString() !== commentId.toString());
    this.commentCount = this.comments.length;
    await this.save({validateBeforeSave:false});
  }
};








export const Blog=mongoose.model("Blog",blogSchema)