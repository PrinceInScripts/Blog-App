import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import AllBlogCard from './AllBlogCard';
import { FaSearch } from 'react-icons/fa';
import { getAllBlogs } from '../../redux/slice/blogSlice';
function AllBlog() {
    const {allBlogs}=useSelector((state)=>state.blog)
    const dispatch=useDispatch()
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
// function AllBlog() {
//        const {allBlogs}=useSelector((state)=>state.blog)
//        const [searchQuery,setSearchQuery]=useState("");
//        const [filteredBlogs,setFilteredBlogs]=useState(allBlogs)

//        useEffect(() => {
//         setFilteredBlogs(
//           allBlogs.filter(
//             (blog) =>
//               blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//               blog.category?.toLowerCase().includes(searchQuery.toLowerCase())
//           )
//         );
//       }, [searchQuery, allBlogs]);
      
//        useEffect(()=>{
//         console.log(allBlogs);
//        },[])
//     return (
//         <Layout>
            
            
//             <div className="min-h-[90vh] flex flex-col items-center justify-center py-20">
//         <h1 className="text-4xl font-bold font-serif mb-20">ReadList</h1>
//         <div className="lg:flex flex-col gap-2 w-full items-center mb-10">
//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               placeholder="Search by title or category..."
//               className="input input-bordered input-primary w-full max-w-xs"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button className="btn btn-outline btn-primary">
//               <FaSearch />
//             </button>
//           </div>
//         </div>
//         <div className="flex flex-col gap-52 items-center justify-center">
//           {filteredBlogs.length ? (
//             filteredBlogs.map((element) => (
//               <AllBlogCard key={element._id} blog={element} />
//             ))
//           ) : (
//             <p className="text-lg">No blogs found matching your search.</p>
//           )}
//         </div>
//       </div>
//         </Layout>
//     );
// }

export default AllBlog;