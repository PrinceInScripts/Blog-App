import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

import {
    getLikedBlogs,
  likeBlog,
  unLikeBlog,
} from "../../redux/slice/blogLikeSlice";
import { getBlogComments } from "../../redux/slice/commentSlice";
import Comment from "./Comment";
import { FaComment } from "react-icons/fa";

function BlogActions({blog}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data || {});
  const {likedBlogs}=useSelector((state)=>state.likeBlogs)
  const {comments}=useSelector((state)=>state.comment)
  const [isUserLiked,setUserLiked]=useState(false)
  const {isLoggedIn} = useSelector((state)=>state.auth)
  

  

  async function addLikeBlog  () {
    try {
        const response = await dispatch(likeBlog(blog.slug));
        if (response?.payload.success) {
          load();
        }
      } catch (error) {
        console.error("Error adding like:", error);
      }
   
     
  };

  async function removeLikeBlog() {
    try {
        const response = await dispatch(unLikeBlog(blog?.slug));
        if (response?.payload.success) {
          load();
        }
      } catch (error) {
        console.error("Error removing like:", error);
      }
   
        
  };

  function userLike(){
    const isUserLike = likedBlogs.some((element) => user._id === element.likedBy._id);
    setUserLiked(isUserLike);
   }


  async function load(){
    try {
         await dispatch(getLikedBlogs(blog?.slug));
        await dispatch(getBlogComments(blog?.slug))
        userLike();
      } catch (error) {
        console.error("Error loading liked blogs:", error);
      }
  }

  useEffect(()=>{
    load()
    },[blog, user, likedBlogs])

  

  return (
    <>
    <div className="bg-bash-200 gap-5 flex px-20 py-5 shadow-[0_0_5px_black]">

      
      <div className="flex gap-2 items-center">
        { isUserLiked? (
          <AiFillLike
            onClick={removeLikeBlog}
            size={24}
            className="cursor-pointer text-blue-500"
          />
        ) : (
          <AiOutlineLike
            onClick={addLikeBlog}
            size={24}
            className="cursor-pointer"
          />
        )}
        <p>{likedBlogs?.length}</p>
      </div>
      <div className="flex gap-2 items-center">

      <FaComment
        
          size={24}
          className="cursor-pointer"
        />
        <p>{comments?.length}</p>
        
      </div>

     
    </div>
    {isLoggedIn &&  <Comment key={blog?._id} comments={comments} blog={blog} />}
   
    </>

    
  );
}

export default BlogActions;