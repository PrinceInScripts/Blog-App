import React, { useEffect } from 'react';
import Layout from '../../Layout/Layout';
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";

function modifyContent(content,maxLength){
    if(content.length > maxLength){
        return content.substring(0,maxLength)+ '....'
    }
    return content;
}




function BlogCard({blog}) {

    const content=modifyContent(blog.content,150)

    useEffect(()=>{blog},[])
    return (
            
              <div className="card w-96 bg-base-100 shadow-xl">
                    <img src={blog.image} alt="Shoes" />
                    <div className="card-body ">
                        <h2 className="card-title">
                        {blog.title}
                        </h2>
                        <p>{content}
                            <button>Read more</button>
                        </p>
                        <div className="flex justify-between ">
                          <div className="badge badge-outline">{blog.category}</div> 
                            <div className="text-xl font-semibold">{blog.username}</div>
                        </div>
                        <div className='flex gap-5 items-center'>
                            <div className='flex gap-1'>
                            <AiOutlineLike size={24}/>
                            {blog.likeCount}
                            </div>
                            <div className='flex gap-1'>
                            <FaRegComment size={24}/>
                            {blog.commentCount}
                            </div>
                            <div className='flex gap-1'>
                            <FaShareAlt size={24}/>
                             {1}
                            </div>
                        </div>
                    </div>
                    </div>
           
        
    );
}

export default BlogCard;