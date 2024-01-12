import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import { getUserBlogs } from '../../redux/slice/blogSlice';
import BlogCard from '../../components/BlogCard/BlogCard';
import { MdModeEditOutline } from "react-icons/md";
import { updateCoverImage } from '../../redux/slice/authSlice';
import { FaCamera, FaUpload } from 'react-icons/fa';




function Profile() {
     const dispatch=useDispatch()
     const navigate=useNavigate()


     const [coverImage,setCoverImage]=useState('')

    async function handleImage(e) {
        e.preventDefault();
        const uploadImage = e.target.files[0];
    
        if (uploadImage) {
          const fileReader = new FileReader();

          const response=await dispatch(updateCoverImage(uploadImage))
          console.log(response);
          fileReader.readAsDataURL(uploadImage);
          fileReader.addEventListener("load", function () {
            setCoverImage(this.result);
          });
        }
      }
     const user=useSelector((state)=>state.auth.data)
     const blogs=useSelector((state)=>state.blog.userBlogs)

     async function load(){
        await dispatch(getUserBlogs())
     }



    useEffect(()=>{
        load()
     console.log("user",user.coverImage);
     console.log("blog",blogs);

    },[])
    return (
        <Layout>
            <div className='min-h-[100vh] flex flex-col items-center m-auto'>
                
                    {user.coverImage ? 
                    <div className='border-2 w-3/4 h-80'>
                       <img src={user.coverImage} alt="" className='w-full w-/34 h-80'/>
                        <div className='absolute w-10 h-10 rounded-full flex items-center justify-center bg-white right-52 cursor-pointer top-20 text-black'>
                            <Link to={"/update-coverImage"}>
                        <MdModeEditOutline size={25}/>
                        </Link>
                       </div>
                     </div>
                    :
                   
                        <div className='border-2 cursor-pointer w-3/4 h-80 flex items-center justify-center bg-bash-200 text-gray-500'>
                             <Link to={"/update-coverImage"}>
                     <FaCamera className='' size={80}/>

                     </Link>
                    </div>
                   
                    
                    }
                    
               
                <div className='flex justify-between gap-20  items-center'>
                    <div className=' relative right-[21rem] bottom-16'>
                    <img src={user.avatar} alt="" className='w-56 h-56 rounded-full'/>
                    <div className='absolute w-10 h-10 rounded-full flex items-center justify-center bg-white left-24 cursor-pointer top-48 text-black'>
                            <Link to={"/update-avatar"}>
                        <FaCamera size={25}/>
                        </Link>
                       </div>
                    </div>
                    <div className='flex flex-col gap-4 relative right-80 bottom-16'>
                        <div className='flex gap-10'>
                        <p>{user.username}</p>
                        <button>Edit Profile</button>
                        </div>
                        <div>
                        <p>{user.fullName}</p>
                        <p>{user.email}</p>
                        </div>
                        
                    </div>

                   

                </div>

                <div className='flex flex-col justify-start items-start w-3/4 gap-10 m-auto'>
                        <h1 className='text-center text-4xl font-bold'>POSTS</h1>

                        <div className="grid grid-cols-1 ml-5 md:ml-10 md:grid-cols-2 lg:grid-cols-3 gap-x-40 gap-y-20">
                            {blogs?.map((element)=>(
                                <BlogCard key={element._id} blog={element}/>
                            ))}
                        </div>
                    </div>
            </div>
        </Layout>
    );
}

export default Profile;