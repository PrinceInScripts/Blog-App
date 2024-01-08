import { asyncHandler } from "../utlis/AsyncHander.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { User } from "../models/user.models.js";

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

    const existedUser=User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path 

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
        coverImage:coverImage.url,
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



export {
    registerUser,
}