import { asyncHandler } from "../utlis/AsyncHander.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utlis/cloudinary.js";
import sendEmail from "../utlis/sendEmail.js";
import crypto from 'crypto'

const generateAccessAndRefreshToken=async (userId)=>{
    try {
         const user=await User.findById(userId)

         const accessToken=user.generateAccessToken();
         const refreshToken=user.generateRefreshToken();

         user.refreshToken=refreshToken
         await user.save({validateBeforeSave:false})

         return {accessToken,refreshToken}
    } catch (error) {
        console.log(error);
        throw new ApiError(500,"something went wrong while generating refresh token access token")
    }
}

const options={
    httpOnly:true,
    secure:true
}

const registerUser=asyncHandler (async (req,res)=>{
    //get user detials from frontend
    //validation - not empty
    //check is user already exist :username,email
    //check fro image,check for avatar
    //upload them to cloundinary,avatar 
    //create user objecr =create entry in db
    //remove password and refresh token filed from response
    //check for user creatin
    //return response

    const {username,fullName,email,password}=req.body;

    if(!fullName || !email || !username || !password){
        throw new ApiError(400,"All field are required")
    }

    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path;
    // const coverImageLocalPath=req.files?.coverImage[0]?.path 

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath=req.files.coverImage[0].path
    }

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar files are required")
    }

    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage=await uploadOnCloudinary(coverImageLocalPath)


    if(!avatar){
        throw new ApiError(400,"Avatar files are required")
    }

    const user=await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || " ",
        email,
        password,
        username:username.toLowerCase()
    })

   const createUser= await User.findById(user._id).select("-password -refreshToken")

   if(!createUser){
    throw new ApiError(400,"something went wrong, while registering the user")
   }

   return res.status(201).json(
    new ApiResponse(200,createUser,"User Register Successfully")
   )
})

const loginuser=asyncHandler (async (req,res)=>{
    //gert user detials from frontend | req.body -> data 
    //validation -user detials are empty?| username or email 
    //check user re exist or not
    //check password is corct or not
    //gernate acces token and refrestoken
    //send tokenin for of cookies
    //send response

    const {username,email,password}=req.body

    if(!username && !email){
       throw new ApiError(400,"username or email is required")
    }

    const user=await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(404,"user does not exist")
    }

    const isPasswordValid=await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(404,"Invalid user credentials")
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)

    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

    return res
             .status(200)
             .cookie("accessToken",accessToken,options)
             .cookie("refreshToken",refreshToken,options)
             .json(
                new ApiResponse(
                    200,
                    {
                        user:loggedInUser,accessToken,refreshToken
                    },
                    "User logged in Successfully"
                )
             )

})

const forgotPassword=asyncHandler (async (req,res)=>{
    const {email,username}=req.body;

    if(!email && !username){
        throw new ApiError(400,"Email or username is required")
    }

    const user=await user.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(400,'Email or username is not registered')
    }

    const resetToken=await user.generatePasswordToken()

    await user.save()

    const resetPasswordUrl=`{process.env.FRONTEND_URL}/reset-password/${resetToken}`
    const subject="Reset Password"
    const message=`You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset Your Password</a>\nIf the above link does not work for some reason then copy paste this link in a tab ${resetPasswordUrl}.\nif you have not requested this, kindly ignore ` 

    console.log(resetPasswordUrl);
    try {
        await sendEmail(email,subject,message)

       return res.status(200).json(
            new ApiResponse(
                200,
                {},
                `Reset password token has been sent to ${email} successfully`
            )
        )
    } catch (error) {
        user.forgetPasswordToken=undefined
        user.forgetPasswordExpiry=undefined

        await user.save()

        throw new ApiError(500,e.message)
    }


})

const resetPassword=asyncHandler (async (req,res)=>{
     const {resetToken}=req.params;
     const password=req.body;

     const forgetPasswordToken=crypto
                                    .createHash('sha256')
                                    .update(resetToken)
                                    .digest('hex')
    
     const user=await User.findOne({
        forgetPasswordToken,
        forgetPasswordExpiry:{$gt: Date.now()}
     })

     if(!user){
        throw new ApiError("Token is inavlid o expired")
     }

     user.password=password
     user.forgetPasswordToken=undefined
     user.forgetPasswordExpiry=undefined

     await user.save()

     return res
              .status(200)
              .json(
                new ApiResponse(
                    200,
                    {},
                    "password changed sucessfully"
                )
              )
})



export {
    registerUser,
    loginuser,
    forgotPassword,
    resetPassword
}