import React from 'react';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import BlogCard from './components/BlogCard/BlogCard';
import AddBlog from './pages/AddBlog/AddBlog';
import Profile from './pages/Profile/Profile';
import EditCoverImage from './pages/EditProfile/EditCoverImage/EditCoverImage';
import EditAvatar from './pages/EditProfile/EditAvatar/EditAvatar';
import EditDetails from './pages/EditProfile/EditDetails/EditDetails';
import EditBlog from './pages/EditBlog/EditBlog/EditBlog';
import DeleteBlog from './pages/EditBlog/DeleteBlog/DeleteBlog';
import EditBlogImage from './pages/EditBlog/EditBlog/EditBlogImage';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import ForgotPassword from './pages/password/forgetPassword.jsx/ForgotPassword';
import ResetPssword from './pages/password/resetPassword/ResetPssword';


function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>

      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/blogcard' element={<BlogCard/>}/>
      <Route path='/add-blog' element={<AddBlog/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/update-coverImage' element={<EditCoverImage/>}/>
      <Route path='/update-avatar' element={<EditAvatar/>}/>
      <Route path='/update-account' element={<EditDetails/>}/>
      <Route path='/edit-blog' element={<EditBlog/>}/>
      <Route path='/update-image' element={<EditBlogImage/>}/>
      <Route path='/delete-blog' element={<DeleteBlog/>}/>
      <Route path='/blog-details' element={<BlogDetails/>}/>
      <Route path='/forgotPassword' element={<ForgotPassword/>}/>
      <Route path='/reset-password/:resetToken' element={<ResetPssword/>}/>
     </Routes>
    </>
  );
}

export default App;