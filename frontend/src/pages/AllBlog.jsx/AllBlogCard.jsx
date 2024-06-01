// import React, { useEffect } from 'react';
// import { AiOutlineLike } from "react-icons/ai";
// import { FaRegComment, FaTimes } from "react-icons/fa";
// import { FaShareAlt } from "react-icons/fa";
// import { useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';

// function modifyContent(content,maxLength){
//     if(content.length > maxLength){
//         return content.substring(0,maxLength)+ '  ....  '
//     }
//     return content + '  ....  ';
// }

// function formatTime(time){
//     const date =new Date(time)
//     const options={
//         year:'numeric',
//         month:'long',
//         day:'numeric',
//     }

//     return date.toLocaleDateString('en-US',options)
// }




// function BlogCard({blog}) {

//     const navigate=useNavigate()
//     const auth=useSelector((state)=>state?.auth.isLoggedIn)
//     const blogs=useSelector((state)=>state.blog.userBlogs)

//     const content=modifyContent(blog.content,150)
//     const extractedDate = formatTime(blog.author.createdAt);

   
//     return (
            
//               <div className=" w-3/4 bg-base-100 rounded-md flex flex-col lg:flex-row-reverse shadow-[0_0_10px_black]" >
//                     <img src={blog.image} alt="Shoes" className='w-96'/>
//                     <div className="card-body ">
//                     <div className="text-xl font-semibold">{blog.author.fullName}</div>
//                         <h2 className="card-title">
//                         {blog.title}
//                         </h2>
//                         <p>{content}
//                         <Link to={"/blog-details"} state={{...blog}}><button>Read more</button></Link>
                       
                            
//                         </p>
//                         <div className="flex justify-between items-center">
//                           <div className="badge badge-outline">{blog.category}</div> 
                           
//                         </div>
//                         <div className='flex gap-5 justify-between items-center'>
//                             <div className='flex gap-1'>
//                            {!auth ? <Link to={"/login"}><AiOutlineLike className="cursor-pointer" size={24}/></Link> : <Link to={"/blog-details"} state={{...blog}}><AiOutlineLike className="cursor-pointer" size={24}/></Link>}
//                             {blog.likesCount}
//                             </div>
//                             <div className='flex gap-1'>
//                             {!auth ? <Link to={"/login"}><FaRegComment className="cursor-pointer" size={24}/></Link> : <Link to={"/blog-details"} state={{...blog}}><FaRegComment className="cursor-pointer" size={24}/></Link>}

//                             {blog.commentCount}
//                             </div>
//                             <div>
//                           { extractedDate }
//                             </div>
//                         </div>
                       
                      
//                     </div>
//                     </div>
           
        
//     );
// }

// export default BlogCard;

import React from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function modifyContent(content, maxLength) {
    return content.length > maxLength ? `${content.substring(0, maxLength)}...` : `${content}...`;
}

function formatTime(time) {
    const date = new Date(time);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function BlogCard({ blog }) {
    const navigate = useNavigate();
    const auth = useSelector((state) => state?.auth.isLoggedIn);

    const content = modifyContent(blog.content, 200);
    const extractedDate = formatTime(blog.author.createdAt);
    console.log(blog);

    return (
        
        <div className="w-full bg-base-100 p-6 rounded-lg shadow-lg flex items-start space-x-4">
            <img src={blog.author.avatar} alt="Author" className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">{blog.author.fullName}</h2>
                        <p className="text-gray-600">{blog.author.website}</p>
                        <p className="text-gray-500">{extractedDate}</p>
                    </div>
                    <div className="badge bg-blue-100 text-blue-600">Featured</div>
                </div>
                <h1 className="text-2xl font-bold">{blog.title}</h1>
                <p className="mt-2 text-gray-700">{content}
                    <Link to="/blog-details" state={{ ...blog }} className="text-blue-500 ml-1">Read more</Link>
                </p>
                <div className="flex gap-10 items-center mt-4">
                    <div className="flex items-center space-x-2">
                        <AiOutlineLike className="cursor-pointer" size={24} />
                        <span>{blog.likesCount}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaRegComment className="cursor-pointer" size={24} />
                        <span>{blog.commentCount}</span>
                    </div>
                    
                </div>
            </div>
            <img src={blog.image} alt="Blog" className="w-48 h-32 object-cover rounded-lg" />
        </div>
        
    );
}

export default BlogCard;