import mongoose,{Schema} from 'mongoose'
import bcrypt from 'bcrypt'


const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    readList:{

    },
    likes:{

    },
    comments:{

    },
    avatar:{
        type:String,   //cloundinary url
        required:true
    },
    coverImage:{
        type:String,
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    refreshToken:{
         type:String,
    },
    role:{
        type:String,
        enum:["USER,ADMIN"]
    },
    forgetPasswordToken:{
        type:String
    },
    forgetPasswordExpiry:{
        type:Date
    }
},{timestamps:true})

export const User=mongoose.model("User",userSchema)

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()

    this.password=await bcrypt(this.password,10)

    next()
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}