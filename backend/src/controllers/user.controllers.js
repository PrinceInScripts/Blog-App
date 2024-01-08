import { asyncHandler } from "../utlis/AsyncHander.js";
import {ApiResponse} from '../utlis/ApiResponse.js'
import { User } from "../models/user.models.js";
import { ApiError } from "../utlis/ApiError.js";
import jwt from "jsonwebtoken"

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





export {
    getUser,
    logoutUser,
    changePassword
}