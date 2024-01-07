import mongoose,{Schema} from 'mongoose'

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

      },
      likes:{
          type:Schema.Types.ObjectId,
          ref:"User"
      },
      author:{
           type:Schema.Types.ObjectId,
           ref:"User"
      },
      comments:{

      },
      createdAt:Date
},{timestamps:true})

export const Blog=mongoose.model("Blog",blogSchema)