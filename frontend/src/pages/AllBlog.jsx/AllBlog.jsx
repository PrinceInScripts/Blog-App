import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import AllBlogCard from './AllBlogCard';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import { getAllBlogs } from '../../redux/slice/blogSlice';
import { Link, useNavigate } from 'react-router-dom';
function AllBlog() {
    const {allBlogs}=useSelector((state)=>state.blog)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [searchQuery,setSearchQuery]=useState("");
    const [filteredBlogs,setFilteredBlogs]=useState(allBlogs)

    useEffect(()=>{
        setFilteredBlogs(
            allBlogs.filter((blog)=>
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.category?.toLowerCase().includes(searchQuery.toLocaleLowerCase())

            )
        )
    },[searchQuery,allBlogs])

    async function load() {
        const response = await dispatch(getAllBlogs());
       
      }
      useEffect(() => {
        load();
      }, []);

      
    return (
        <Layout>
            
            
            <div className="min-h-[90vh] flex flex-col items-center justify-center py-20">
            <Link
            onClick={() => navigate(-1)}
            className="absolute top-20 text-2xl left-80 link text-primary cursor-pointer"
          >
          <div className="flex justify-center items-center gap-2  text-xl font-bold font-serif py-10"><FaArrowLeft className="text-xl font-bold"/> Go Back</div>
          </Link>
        <h1 className="text-4xl font-bold font-serif mb-10">ReadList</h1>
        <div className="lg:flex flex-col gap-2 w-full items-center mb-10">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by title or category..."
              className="input input-bordered input-primary w-96"
              onChange={(e)=>setSearchQuery(e.target.value)}
              value={searchQuery}
             
            />
          </div>
        </div>
        <div className="flex flex-col gap-52 items-center mx-80 justify-center">
          {filteredBlogs?.length ? (
           filteredBlogs.map((element)=>(
             <AllBlogCard key={element._id} blog={element}/>
           ))
          )
          :
          (<p className="text-lg">No blogs found matching your search.</p>)
          }
        </div>
      </div>
        </Layout>
    );
}
          
            


export default AllBlog;