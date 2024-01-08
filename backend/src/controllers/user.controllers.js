import { asyncHandler } from "../utlis/AsyncHander.js";
import {ApiResponse} from '../utlis/ApiResponse.js'
import { User } from "../models/user.models.js";
import { ApiError } from "../utlis/ApiError.js";
import { uploadOnCloudinary } from "../utlis/cloudinary.js";
import { Blog } from "../models/blog.models.js";

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
    const {oldPassword,newPassword}=req.body

    if(!oldPassword || !newPassword){
        throw new ApiError(404,"All fileds are required")
    }

    const user=await User.findById(req.user._id)


    const isPasswordCorrect=await user.isPasswordCorrect(oldPassword)

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

    if(!fullName || !email){
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

const addBlogToReadList=asyncHandler(async (req,res)=>{
    const {slug}=req.params

    try {
        const blog=await Blog.findOne({slug})
        const user=await User.findById(req.user._id)

        if(!user.readList.includes(blog._id)){
            user.readList.push(blog._id)
        }else{
            const index=user.readList.indexOf(blog._id)
            user.readList.splice(index,1)
        }

        user.readListLength=user.readList.readListLength
        await user.save({validateBeforeSave:false})

        const status=user.readList.includes(blog._id)

        return res
                  .status(200)
                  .json(
                    new ApiResponse(
                        200,
                        {
                            blog,user,status
                        },
                        'Blog added/removed from read list successfully'
                    )
                  )
    } catch (error) {
        throw new ApiError(500, 'Internal Server Error');
    }
})

const readListPage=asyncHandler(async (req,res)=>{
    try {
        const user=await User.findById(req.user._id)

        const readList=[]

        for(const blogId of user.readList){
            const blog=await Blog.findById(blogId).populate('author')
            readList.push(blog)
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    readList
                },
                'Read list fetched successfully'
            )
        );

    } catch (error) {
        throw new ApiError(500, 'Internal Server Error');
    }
})


export {
    getUser,
    logoutUser,
    changePassword,
    updaterUserDetials,
    updateUserAvatar,
    updateUserCoverImage,
    addBlogToReadList,
    readListPage
}