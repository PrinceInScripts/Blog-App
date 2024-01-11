import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

function Layout({children}) {
    return (
        <div className='min-h-[90vh]'>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    );
}

export default Layout;