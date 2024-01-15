import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowLeft, AiFillCloseCircle } from "react-icons/ai";
import BlogActions from "./BlogAction";
import { nanoid } from "@reduxjs/toolkit";

import {
  getBlogComments,
  addComment,
  deleteComment,
} from "../../redux/slice/commentSlice";
import Comment from "./Comment";
import { getLikedBlogs } from "../../redux/slice/blogLikeSlice";

function formatTime(time) {
  const date = new Date(time);
  const options = {
    day: "numeric",
    month: "short",
  };

  return date.toLocaleDateString("en-US", options);
}

function BlogDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [commentContent, setCommentContent] = useState("");
  const [commentLikes, setCommentLikes] = useState([]);
  const { state } = useLocation();
  const user = useSelector((state) => state.auth.data);
  const comment = useSelector((state) => state.comment.comments);
  const [isRelevantVisible, setRelevantVisibility] = useState(false);
  const id=nanoid()

  const date = state ? formatTime(state.createdAt) : null;

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getBlogComments(state.slug));
    };

    fetchData();
  }, [state?.slug, user]);

  const toggleRelevantVisibility = () => {
    setRelevantVisibility(!isRelevantVisible);
  };

  

  
  return (
    <Layout>
      <Link
        to="#"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
        className="relative left-40 text-2xl link text-accent cursor-pointer"
      >
        <AiOutlineArrowLeft />
      </Link>
      <div className="min-h-[90vh] flex flex-col gap-5 items-center py-10 justify-center w-3/4 m-auto">
        <div className="text-4xl w-full font-bold font-serif">
          <h1>{state.title}</h1>
        </div>

        <div className="bg-bash-100 w-full px-10 flex items-center gap-5 py-5 shadow-[0_0_6px_black]">
          <div className="rounded-full">
            <img
              src={state.author.avatar}
              alt=""
              className="rounded-full w-12 h-12"
            />
          </div>
          <div>
            <p className="text-xl font-semibold">{state.author.username}</p>
          </div>
          <div>
            <p className="text-lg font-serif">{date}</p>
          </div>
          <div>
            <p className="font-mono">{state.readTime} min read</p>
          </div>
        </div>

        <div className="flex flex-col w-full gap-5">
          <img className="h-96 object-cover" src={state.image} alt="" />

          <div className="h-60 content-wrapper overflow-auto text-center">
            <p className="font-serif">
              <span className="font-semibold font-serif">
                {state.author.fullName}
              </span>{" "}
              - {state.content}
            </p>
          </div>

          <BlogActions
            key={id} blog={state}
          />
        </div>

       
      </div>
    </Layout>
  );
}

export default BlogDetails;
