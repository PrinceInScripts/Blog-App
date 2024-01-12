import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import { getUserBlogs } from '../../redux/slice/blogSlice';
import BlogCard from '../../components/BlogCard/BlogCard';

function Profile() {
     const dispatch=useDispatch()
     const navigate=useNavigate()

     const user=useSelector((state)=>state.auth.data)
     const blogs=useSelector((state)=>state.blog.userBlogs)

     async function load(){
        await dispatch(getUserBlogs())
     }

    useEffect(()=>{
        load()
     console.log("user",user);
     console.log("blog",blogs);

    },[])
    return (
        <Layout>
            <div className='min-h-[100vh] flex flex-col items-center m-auto'>
                <div className='border-2 w-3/4 h-80'>
                    <img src={user.avatar} alt="" className='w-full w-/34 h-80'/>
                </div>
                <div className='flex justify-between gap-20  items-center'>
                    <div className=' relative right-80 bottom-16'>
                    <img src={user.avatar} alt="" className='w-56 h-56 rounded-full'/>
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