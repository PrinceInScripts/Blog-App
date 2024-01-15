import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import BlogActions from "./BlogAction";
import { nanoid } from "@reduxjs/toolkit";

function formatTime(time) {
  const date = new Date(time);
  const options = {
    day: "numeric",
    month: "short",
  };
  return date.toLocaleDateString("en-US", options);
}

function BlogDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const id = nanoid();
  const date = state ? formatTime(state.createdAt) : null;

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

        <div className="bg-bash-100 w-full lg:px-10 flex items-center gap-3 lg:gap-5 py-5 shadow-[0_0_6px_black]">
          <div className="rounded-full">
            <img
              src={state.author.avatar}
              alt=""
              className="rounded-full w-12 h-12"
            />
          </div>
          <div>
            <p className="lg:text-xl text-xs font-semibold">{state.author.username}</p>
          </div>
          <div>
            <p className="lg:text-lg text-xs font-serif">{date}</p>
          </div>
          <div>
            <p className=" lg:text-lg text-xs font-mono">{state.readTime} min read</p>
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

          <BlogActions key={id} blog={state} />
        </div>
      </div>
    </Layout>
  );
}

export default BlogDetails;
