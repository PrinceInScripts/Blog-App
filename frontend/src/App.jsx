import React from 'react';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import BlogCard from './components/BlogCard/BlogCard';

function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>

      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/blogcard' element={<BlogCard/>}/>
     </Routes>
    </>
  );
}

export default App;