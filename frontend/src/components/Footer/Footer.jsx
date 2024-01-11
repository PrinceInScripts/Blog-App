import React from 'react';
import {BsFacebook} from 'react-icons/bs'
import {BsInstagram} from 'react-icons/bs'
import {BsLinkedin} from 'react-icons/bs'
import {BsTwitter} from 'react-icons/bs'
import { Link } from 'react-router-dom';

function Footer() {
    const newDate=new Date()
    const year=newDate.getFullYear()
    return (
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
          <Link to={"/about"} className="link link-hover">About us</Link>
          <Link to={"/contact"} className="link link-hover">Contact</Link>
          <Link to={"blogs"} className="link link-hover">Blogs</Link>
          <Link className="link link-hover">Press kit</Link>
        </nav> 
        <nav>
          <div className="grid grid-flow-col gap-4">
                     <Link to="#" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                            <BsFacebook size={24}/>
                       </Link>
                       <Link to="#" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                            <BsInstagram size={24}/>
                       </Link>
                       <Link to="#" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                            <BsLinkedin size={24}/>
                       </Link>
                       <Link to="#" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                            <BsTwitter size={24}/>
                       </Link> 
          </div>
        </nav> 
        <aside>
          <p>Copyright © {year} - All right reserved by ACME Industries Ltd</p>
        </aside>
      </footer>
    );
}

export default Footer;