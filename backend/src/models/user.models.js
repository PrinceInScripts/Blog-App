import mongoose,{Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'


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
          type:Schema.Types.ObjectId,
          ref:"Blog"
    },
    readListLength: {
        type: Number,
        default: 0
    },
    likes:{
          type:Schema.Types.ObjectId,
          ref:"Likes"
    },
    comments:{
          type:Schema.Types.ObjectId,
          ref:"Comment"
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
        enum:["USER","ADMIN"]
    },
    forgetPasswordToken:{
        type:String
    },
    forgetPasswordExpiry:{
        type:Date
    }
},{timestamps:true})


userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()

    this.password=await bcrypt.hash(this.password,10)

    next()
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function (){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    
    )
}

userSchema.methods.generateRefreshToken=function (){
    return jwt.sign(
        {
            _id:this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generatePasswordToken=function(){
    let resetToken=crypto.randomBytes(20).toString('hex');

            this.forgetPasswordToken=crypto
                                     .createHash('sha256')
                                     .update(resetToken)
                                     .digest('hex')

            this.forgetPasswordExpiry=Date.now() + 15 * 60 * 1000

            return resetToken;
}


export const User=mongoose.model("User",userSchema)