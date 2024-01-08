import { asyncHandler } from "../utlis/AsyncHander.js";
import {ApiResponse} from '../utlis/ApiResponse.js'
import { User } from "../models/user.models.js";
import { ApiError } from "../utlis/ApiError.js";
import jwt from "jsonwebtoken"
import { uploadOnCloudinary } from "../utlis/cloudinary.js";

const options={
    httpOnly:true,
    secure:true
}

const getUser=asyncHandler(async (req,res)=>{
     const user=req.user

     return res 
              .status(200)
              .json(
               new ApiResponse(
                200,
                user,
                "User detials fetched successfully"
               )
              )
})

const logoutUser=asyncHandler(async (req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )

    return res
              .status(200)
              .clearCookie("accessToken",options)
              .clearCookie("refreshToken",options)
              .json(
                new ApiResponse(
                    200,
                    {},
                    "User Logged Out"
                )
              )
})


const changePassword=asyncHandler (async (req,res)=>{
    const {oldPasssword,newPassword}=req.body

    const user=await User.findById(req.user._id)

    const isPasswordCorrect=await user.isPasswordCorrect(oldPasssword)

    if(!isPasswordCorrect){
        throw new ApiError(400,"Invalid old password")
     }

     user.password=newPassword

     await user.save({validateBeforeSave:false})

     return res  
               .status(200)
               .json(
                new ApiResponse(
                    200,
                    {},
                    "Password Chnage Successfully"
                )
               )
})


const updaterUserDetials=asyncHandler(async (req,res)=>{
    const {fullName,email}=req.body

    if(!username || !email){
        throw new ApiError(400,"All field are required")
    }

    const user=await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                fullName:fullName,
                email:email
            },        
        },
        {
            new:true
        }
    ).select("-passwprd")

    return res 
              .status(200)
              .json(
                new ApiResponse(200,user,"User detials successfully")
              )
})

const updateUserAvatar=asyncHandler(async (req,res)=>{
     const avatarLocalPath=req.file?.path

     if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is missing")
     }

     const avatar=await uploadOnCloudinary(avatarLocalPath)

     if(!avatar){
        throw new ApiError(400,"Error while uploading on avatar")
     }

    const user=await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                avatar:avatar.url
            }
        },
        {new:true}
    ).select("-password")

    return res
              .status(200)
              .json(
                new ApiResponse(200,user,"User avatar successfully")
              )
})

const updateUserCoverImage=asyncHandler(async (req,res)=>{
     const coverImageLocalPath=req.file?.path

     if(!coverImageLocalPath){
        throw new ApiError(400,"Cover Image file is missing")
     }

     const coverImage=await uploadOnCloudinary(coverImageLocalPath)

     if(!coverImage){
        throw new ApiError(400,"Error while uploading on coverImage")
     }

    const user=await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                coverImage:coverImage.url
            }
        },
        {new:true}
    ).select("-password")

    return res
              .status(200)
              .json(
                new ApiResponse(200,user,"User avatar successfully")
              )
})


export {
    getUser,
    logoutUser,
    changePassword,
    updaterUserDetials,
    updateUserAvatar,
    updateUserCoverImage
}