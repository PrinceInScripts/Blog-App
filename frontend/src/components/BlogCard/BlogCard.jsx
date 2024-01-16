import React, { useEffect } from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment, FaTimes } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

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




function BlogCard({blog}) {

    const navigate=useNavigate()
    const auth=useSelector((state)=>state?.auth.isLoggedIn)
    const blogs=useSelector((state)=>state.blog.userBlogs)

    const content=modifyContent(blog.content,150)
    const extractedDate = formatTime(blog.createdAt);

   
    return (
        <Link to={"/blog-details"} state={{...blog}}>
              <div className="card group h-full w-96 bg-base-100 shadow-xl  rounded-lg cursor-pointer overflow-hidden  transition-transform transform hover:scale-105 relative" >
                    <img src={blog.image} alt="Shoes" className='w-full h-52'/>
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
                            <div>
                          { extractedDate }
                            </div>
                        </div>
                       
                      
                    </div>
                    </div>
           </Link>
        
    );
}

export default BlogCard;