import { asyncHandler } from "../utlis/AsyncHander.js";
import {ApiResponse} from '../utlis/ApiResponse.js'
import { User } from "../models/user.models.js";

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


export {
    getUser,
    logoutUser
}