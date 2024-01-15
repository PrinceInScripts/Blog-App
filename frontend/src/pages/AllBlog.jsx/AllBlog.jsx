import React from 'react';
import Layout from '../../Layout/Layout';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import AllBlogCard from './AllBlogCard';
function AllBlog() {
       const {allBlogs}=useSelector((state)=>state.blog)
    return (
        <Layout>
            <div className='min-h-[90vh] flex flex-col items-center justify-center py-20'>
                <h1 className='text-4xl font-bold font-serif mb-20'>ReadList</h1>
                <div className="flex flex-col gap-52 items-center justify-center" >
          {allBlogs?.map((element) => (
            <AllBlogCard key={element._id} blog={element} />
          ))}
        </div>
            </div>
        </Layout>
    );
}

export default AllBlog;