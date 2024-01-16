import React, { useEffect } from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment, FaTimes } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {  ondeleteBlog } from '../../redux/slice/blogSlice';

function modifyContent(content,maxLength){
    if(content.length > maxLength){
        return content.substring(0,maxLength)+ '  ....  '
    }
    return content + '  ....  ';
}

function formatTime(time){
    const date =new Date(time)
    const options={
        year:'numeric',
        month:'long',
        day:'numeric',
    }

    return date.toLocaleDateString('en-US',options)
}






function UserBlogCard({blog}) {
    const dispatch=useDispatch()

    async function OnDeleteBlog(slug){
        const response=await dispatch(ondeleteBlog(slug))
        if(response?.payload.success){
            navigate("/")
        }
    }

    const navigate=useNavigate()

    const auth=useSelector((state)=>state?.auth.isLoggedIn)
    const blogs=useSelector((state)=>state.blog.userBlogs)

    const content=modifyContent(blog.content,150)
    const extractedDate = formatTime(blog.author.createdAt);

    return (
        <Link to={"/blog-details"} state={{...blog}}>
        <div className="card group  w-96 bg-base-100 shadow-xl  rounded-lg cursor-pointer overflow-hidden  transition-transform transform hover:scale-105 relative" >
                    <img src={blog.image} alt="Shoes" />
                    <div className="card-body ">
                        <h2 className="card-title">
                        {blog.title}
                        </h2>
                        <p>{content}
                        <Link to={"/blog-details"} state={{...blog}}><button>Read more</button></Link>
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="badge badge-outline">{blog.category}</div> 
                            <div className="text-xl font-semibold">{blog.author.username}</div>
                        </div>
                        <div className='flex gap-5 justify-between items-center'>
                            <div className='flex gap-1'>
                            {!auth ? <Link to={"/login"}><AiOutlineLike className="cursor-pointer" size={24}/></Link> : <Link to={"/blog-details"} state={{...blog}}><AiOutlineLike className="cursor-pointer" size={24}/></Link>}
                            {blog.likesCount}
                            </div>
                            <div className='flex gap-1'>
                            {!auth ? <Link to={"/login"}><FaRegComment className="cursor-pointer" size={24}/></Link> : <Link to={"/blog-details"} state={{...blog}}><FaRegComment className="cursor-pointer" size={24}/></Link>}
                            {blog.commentCount}
                            </div>
                            <div className='flex gap-1'>
                            <FaShareAlt className="cursor-pointer" size={24}/>
                             {1}
                            </div>
                            <div>
                          { extractedDate }
                            </div>
                        </div>
                       
                       {auth && blogs.length>0 && 
                         <div className='mt-4 flex gap-5 justify-end'>
                            <Link to={'/edit-blog'} state={{ ...blog }}>
                            <button  className='btn btn-info'>Edit</button>
                            </Link>
                            <Link >
                            <button onClick={()=>OnDeleteBlog(blog.slug)} className='btn btn-error'>Delete</button>
                            </Link>
                          
                           
                         </div>
                       }
                       
                    </div>
                    </div>
                    </Link>
        
    );
}

export default UserBlogCard;