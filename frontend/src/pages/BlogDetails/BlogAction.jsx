

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

function BlogActions({ blog }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data || {});
  const { likedBlogs } = useSelector((state) => state.likeBlogs);
  const { comments } = useSelector((state) => state.comment);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [totalLike, setTotalLike] = useState(0);

  async function addLikeBlog() {
    try {
      const response = await dispatch(likeBlog(blog.slug));
      if (response?.payload.success) {
        loadLikesAndComments();
      }
    } catch (error) {
      console.error("Error adding like:", error);
    }
  }

  async function loadLikesAndComments() {
    try {
      const likedBlogsResponse = await dispatch(getLikedBlogs(blog?.slug));
      setTotalLike(likedBlogsResponse.payload.data.data.length);
      await dispatch(getBlogComments(blog?.slug));
    } catch (error) {
      console.error("Error loading liked blogs:", error);
    }
  }

  useEffect(() => {
    loadLikesAndComments();
  }, [blog.slug]);

  return (
    <>
      <div className="bg-bash-200 gap-5 flex px-20 py-5 shadow-[0_0_5px_black]">
        <div className="flex gap-2 items-center">
          <AiOutlineLike
            onClick={addLikeBlog}
            size={24}
            className="cursor-pointer"
          />
          <p>{totalLike}</p>
        </div>
        <div className="flex gap-2 items-center">
          <FaComment size={24} className="cursor-pointer" />
          <p>{comments?.length}</p>
        </div>
      </div>
      {isLoggedIn && <Comment key={blog?._id} comments={comments} blog={blog} />}
    </>
  );
}

export default BlogActions;