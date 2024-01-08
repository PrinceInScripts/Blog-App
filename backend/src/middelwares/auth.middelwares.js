import { User } from "../models/user.models.js";
import { ApiError } from "../utlis/ApiError.js";
import { asyncHandler } from "../utlis/AsyncHander.js";
import jwt from 'jsonwebtoken'



export const isUserLoggedIn=asyncHandler (async (req,res,next)=>{
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

        if(!token){
            throw new ApiError(401,"Unathorized request")
        }

        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user=await User.findById(decodedToken._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(401,"Invalid Access token")
        }

        req.user=user
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid acxess token")
    }
})