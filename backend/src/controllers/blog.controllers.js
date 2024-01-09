import { asyncHandler } from "../utlis/AsyncHander.js";

const addBlog=asyncHandler(async (req,res)=>{
    res.status(200).json({
        messgae:"okk"
    })
})

export {
    addBlog,
    
}