import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function BlogDetails() {
    const {state}=useLocation()


    useEffect(()=>{
        console.log(state);
    },[])
    return (
        <div>
            
        </div>
    );
}

export default BlogDetails;