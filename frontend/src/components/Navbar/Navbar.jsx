import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { MdOutlineDarkMode } from "react-icons/md";

function Navbar() {

    const isLoggedIn=useSelector((state)=>state?.auth?.isLoggedIn)
    const data=useSelector((state)=>state?.auth?.data)

    useEffect(()=>{
        console.log(isLoggedIn);
    },[])
    return (
        <div className="navbar px-20 bg-base-200">
         <div className="flex-1">
           <Link to='/' className="btn btn-ghost text-4xl font-bold">WriteWave</Link>
         </div>
         <div className='mr-5'>
         <label className="swap swap-rotate ">
        <input type="checkbox" className="theme-controller" value="dark" />
        <GoSun className="swap-on fill-current w-10 h-10"/>
        <MdOutlineDarkMode className="swap-off fill-current w-10 h-10"/>
        </label>
         </div>
        
        {isLoggedIn?
            <div className="flex-none gap-2">
            <div className=" flex gap-2">
            <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
            <button className="btn btn-outline btn-primary">
            <FaSearch />
            </button>
            </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="profile image" src="" />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li><Link to={"/logout"}>Username</Link></li>
            <hr />
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to={"/logout"}>Logout</Link></li>
            </ul>
          </div>
        </div>
       : 
       <div className='flex gap-2'>
           <Link >
           <button className="btn btn-primary">Login</button>
           </Link>
           <Link >
           <button className="btn btn-secondary">Signup</button>
           </Link>
        </div>}

         

       
      </div>

    
    );
}

export default Navbar;


