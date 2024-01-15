import React, { useEffect, useState } from "react";
import { AiFillCloseCircle, AiFillLike, AiOutlineLike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addComment, deleteComment, getBlogComments } from "../../redux/slice/commentSlice";
import { nanoid } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

function formatTime(time) {
    const date = new Date(time);
    const options = {
      day: "numeric",
      month: "short",
    };
  
    return date.toLocaleDateString("en-US", options);
  }
function Comment({comments,blog}) {
    const dispatch=useDispatch()
    const user = useSelector((state) => state.auth.data);
    const [commentContent, setCommentContent] = useState("");

    async function addCommentContent (e) {
        e.preventDefault();
        if (!commentContent) {
          // Assuming toast is available in your project
          toast.error("Comment is required");
          return;
        }
    
        const response = await dispatch(
          addComment({ slug: blog.slug, content: commentContent })
        );
    
        if (response?.payload.success) {
          await dispatch(getBlogComments(blog.slug));
          setCommentContent("");
        }
      };

      async function deleteCommentt (commentId){
        const response = await dispatch(deleteComment(commentId));
        if (response?.payload.success) {
          await dispatch(getBlogComments(blog.slug));
        }
      };

  return (

    <>
   
  
        
     


    <div className="flex flex-col gap-10">
            {/* //1div */}
            <div className="flex justify-between items-center">
              <div className="text-2xl font-serif">
                Response ({comments.length})
              </div>
              <button >
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

            <div key={nanoid()} className="flex flex-col gap-10 ">
              {comments.length > 0 && (
                <h1 className="text-4xl font-serif font-semibold">
                  Most Relevent
                </h1>
              )}

              {comments.length > 0 &&
                comments.map((comment) => (
                    <div className="px-10 py-5 flex flex-col gap-5 bg-bash-200 shadow-[0_0_2px_black]">
                    <div className="flex items-center gap-2">
                      <img
                        src={comment.owner.avatar}
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="text-xl font-serif">{comment.owner.fullName}</p>
                        <p className="">{formatTime(comment.createdAt)}</p>
                      </div>
                      {comment.owner._id === user._id && (
                        <div>
                          <button
                            onClick={() => deleteCommentt(comment._id)}
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
                   
              
                    
                  </div>
              
                ))}
            </div>
          </div>

    </>
  );
}

export default Comment;