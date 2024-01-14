import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillCloseCircle,
  AiFillLike,
  AiOutlineArrowLeft,
  AiOutlineLike,
} from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import {
  getBlogComments,
  addComment,
  deleteComment,
} from "../../redux/slice/commentSlice";
import {
  getLikedBlogs,
  likeBlog,
  unLikeBlog,
  updateLikesCount,
} from "../../redux/slice/blogLikeSlice";
import {
  getCommentLikes,
  likeComment,
  unLikeComment,
} from "../../redux/slice/commentLikeSlice";

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
  const [isBlogLiked, setIsBlogLiked] = useState(false);
  const [commentLikes, setCommentLikes] = useState([]);

  const { state } = useLocation();
  const user = useSelector((state) => state.auth.data);
  const comment = useSelector((state) => state.comment.comments);
  const [isRelevantVisible, setRelevantVisibility] = useState(false);

  async function addCommentContent(e) {
    e.preventDefault();
    if (!commentContent) {
      toast.error("comment is required");
      return;
    }

    const response = await dispatch(
      addComment({ slug: state.slug, content: commentContent })
    );
    console.log(response);
    if (response?.payload.success) {
      await dispatch(getBlogComments(state.slug));
      setCommentContent("");
    }
  }

  async function deletecomment(commentId) {
    const response = await dispatch(deleteComment(commentId));
    if (response?.payload.success) {
      await dispatch(getBlogComments(state.slug));
    }
  }

  async function getComments() {
    const response = await dispatch(getBlogComments(state.slug));
  }

  async function getCommentLikesForComment(commentId) {
    const response = await dispatch(getCommentLikes(commentId));
    if (response?.payload.success) {
      setCommentLikes(response.payload.data.data);
    }
  }

  async function addLikeCommentForComment(commentId) {
    try {
      const response = await dispatch(likeComment(commentId));

      if (response?.payload.success) {
        setCommentLikes([...commentLikes, response.payload.data]); 
      }
    } catch (error) {
      console.error("Error adding like to comment:", error);
    }
  }

  async function removeLikeCommentForComment(commentId) {
    const response = await dispatch(unLikeComment(commentId));
    if (response?.payload.success) {
      const updatedCommentLikes = commentLikes.filter(
        (commentLike) => commentLike._id !== response.payload.data._id
      );
      setCommentLikes(updatedCommentLikes);
    }
  }

  async function getBlogLikes() {
    const response = await dispatch(getLikedBlogs(state.slug));

    if (response?.payload.success) {
      const likedBlogs = response.payload.data.data;
      const userLiked = likedBlogs.some((blog) => {
        return blog.likedBy._id === user._id;
      });
      setIsBlogLiked(userLiked);
    }
  }

  async function addLikeBlog() {
    try {
      const response = await dispatch(likeBlog(state.slug));

      if (response?.payload.success) {
        const likedBlog = response.payload.data;

        await dispatch(
          updateLikesCount({
            blogId: likedBlog._id,
            likesCount: likedBlog.likesCount,
          })
        );

        setIsBlogLiked(true);
      }
    } catch (error) {
      console.error("Error adding like:", error);
    }
  }

  async function removeLikeBlog() {
    const response = await dispatch(unLikeBlog(state.slug));
    if (response?.payload.success) {
      const unlikedBlog = response.payload.data;

      await dispatch(
        updateLikesCount({
          blogId: unlikedBlog._id,
          likesCount: unlikedBlog.likesCount,
        })
      );

      setIsBlogLiked(false);
    }
  }

  const date = state ? formatTime(state.createdAt) : null;

  useEffect(() => {
    getComments();
    // getBlogLikes();

    console.log(state.slug);
    console.log(user);
    console.log(comment);
  }, [state.slug, user]);

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
        <div className="bg-gray-400 w-full px-10 flex items-center gap-5 py-5">
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
          <img className=" h-96 object-cover" src={state.image} alt="" />
          <div className="h-60 content-wrapper overflow-auto text-center">
            <p className="font-serif">
              <span className="font-semibold font-serif">
                {state.author.fullName}
              </span>{" "}
              - {state.content}
            </p>
          </div>
          <div className="bg-gray-200 gap-5 flex px-20 py-5">
            <div className="flex gap-2 items-center">
              {isBlogLiked ? (
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
              <p>{isBlogLiked ? state.likesCount + 1 : state.likesCount}</p>
            </div>
            <div className="flex gap-2 items-center">
              <FaComment
                onClick={toggleRelevantVisibility}
                size={24}
                className="cursor-pointer"
              />
              <p>{comment.length}</p>
            </div>
          </div>
        </div>

        {isRelevantVisible && (
          <div className="flex flex-col gap-10">
            {/* //1div */}
            <div className="flex justify-between items-center gap-[60rem]">
              <div className="text-2xl font-serif">
                Response ({comment.length})
              </div>
              <button onClick={toggleRelevantVisibility}>
                <AiFillCloseCircle size={24} />
              </button>
            </div>

            {/* //2div- */}
            <div className="flex flex-col flex-start gap-5">
              <div className="flex gap-2">
                <img
                  src={user.avatar}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <p className="text-xl font-serif font-semibold">
                  {user.fullName}
                </p>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="What are your thoughts ? "
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setCommentContent(e.target.value)}
                  value={commentContent}
                />
              </div>

              <div className="flex gap-5">
                <button
                  onClick={() => setCommentContent("")}
                  className="btn btn-primary"
                >
                  Cancel
                </button>
                <button
                  onClick={addCommentContent}
                  className="btn btn-secondary"
                >
                  Response
                </button>
              </div>
            </div>

            <div key={state._id} className="flex flex-col gap-10 ">
              {comment.length > 0 && (
                <h1 className="text-4xl font-serif font-semibold">
                  Most Relevent
                </h1>
              )}

              {comment.length > 0 &&
                comment.map((comment) => (
                  <div
                    key={comment.id}
                    className="px-10 py-5 flex flex-col gap-5 bg-bash-200 shadow-[0_0_2px_black]"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={comment.owner.avatar}
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="text-xl font-serif">
                          {comment.owner.fullName}
                        </p>
                        <p className="">{formatTime(comment.createdAt)}</p>
                      </div>
                      {comment.owner._id === user._id && (
                        <div>
                          <button
                            onClick={() => deletecomment(comment._id)}
                            className="btn btn-outline btn-error ml-40"
                          >
                            <MdDelete size={24} />
                          </button>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xl font-mono">{comment.content}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {commentLikes.some(
                        (like) => like.commentId === comment._id
                      ) ? (
                        <AiFillLike
                          onClick={() =>
                            removeLikeCommentForComment(comment._id)
                          }
                          size={24}
                          className="cursor-pointer text-blue-500"
                        />
                      ) : (
                        <AiOutlineLike
                          onClick={() => addLikeCommentForComment(comment._id)}
                          size={24}
                          className="cursor-pointer"
                        />
                      )}
                      <p>
                        {
                          commentLikes.filter(
                            (like) => like.commentId === comment._id
                          ).length
                        }
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default BlogDetails;
