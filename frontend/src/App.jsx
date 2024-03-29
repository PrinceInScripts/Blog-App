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
import EditBlogImage from './pages/EditBlog/EditBlog/EditBlogImage';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import ForgotPassword from './pages/password/forgetPassword.jsx/ForgotPassword';
import ResetPssword from './pages/password/resetPassword/ResetPssword';
import ChangePassword from './pages/password/changePassword/ChangePassword';
import NotRequireAuth from './components/Auth/NotRequireAuth';
import RequireAuth from './components/Auth/RequireAuth';
import AllBlog from './pages/AllBlog.jsx/AllBlog';
import Denied from './pages/NotFound/Denied'

function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>


      <Route element={<NotRequireAuth/>}>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      </Route>

      <Route element={<RequireAuth allowedRoles={["USER"]}/>}>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/update-coverImage' element={<EditCoverImage/>}/>
      <Route path='/update-avatar' element={<EditAvatar/>}/>
      <Route path='/update-account' element={<EditDetails/>}/>
      <Route path='/edit-blog' element={<EditBlog/>}/>
      <Route path='/update-image' element={<EditBlogImage/>}/>
      <Route path='/add-blog' element={<AddBlog/>}/>
      <Route path='/change-password' element={<ChangePassword/>}/>
      </Route>
     
      <Route path='/blogcard' element={<BlogCard/>}/>
      <Route path='/denied' element={<Denied/>}/>
       <Route path='/blog-details' element={<BlogDetails/>}/>
      <Route path='/all-blog' element={<AllBlog/>}/>
      <Route path='/forgotPassword' element={<ForgotPassword/>}/>
      <Route path='/reset-password/:resetToken' element={<ResetPssword/>}/>
      
     </Routes>
    </>
  );
}

export default App;