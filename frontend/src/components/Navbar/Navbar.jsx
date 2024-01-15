import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { MdOutlineDarkMode } from "react-icons/md";
import { logout } from '../../redux/slice/authSlice';

function Navbar() {

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const isLoggedIn=useSelector((state)=>state?.auth?.isLoggedIn)
    const data=useSelector((state)=>state?.auth?.data)


    async function onLogout(e){
       e.preventDefault()
       const response=await dispatch(logout())
       if(response?.payload?.data.success){
        navigate('/')
       }
    }
    return (
        <div className="navbar p-4 bg-base-200 flex items-center justify-between">
         <div className="flex-1">
           <Link to='/' className="btn btn-ghost lg:text-4xl text-2xl font-bold">WriteWave</Link>
         </div>
         <div className='mr-5'>
         <label className="swap swap-rotate ">
        <input type="checkbox" className="theme-controller" value="dark" />
        <GoSun className="swap-on fill-current  w-8 h-8 lg:w-10 lg:h-10"/>
        <MdOutlineDarkMode className="swap-off fill-current w-8 h-8 lg:w-10 lg:h-10"/>
        </label>
         </div>
        
        {isLoggedIn?
            <div className="flex items-center gap-2">
            <div>
              <Link to={"/add-blog"}><button className="btn btn-active btn-secondary">Add Blog</button></Link>
            </div>
            <div className=" lg:flex hidden gap-2">
            <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
            <button className="btn btn-outline btn-primary">
            <FaSearch />
            </button>
            </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 h-10 rounded-full">
                <img alt="profile image" src={data?.avatar} />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li><Link>{data?.username}</Link></li>
            <hr />
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li onClick={onLogout}><Link>Logout</Link></li>
            </ul>
          </div>
        </div>
       : 
       <div className='flex gap-2'>
           <Link to={"/login"}>
           <button className="btn btn-primary">Login</button>
           </Link>
           <Link to={"/signup"}>
           <button className="btn btn-secondary">Signup</button>
           </Link>
        </div>}

         

       
      </div>

    
    );
}

export default Navbar;


