import React from 'react';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import BlogCard from './components/BlogCard/BlogCard';
import AddBlog from './pages/AddBlog/AddBlog';

function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>

      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/blogcard' element={<BlogCard/>}/>
      <Route path='/add-blog' element={<AddBlog/>}/>
     </Routes>
    </>
  );
}

export default App;