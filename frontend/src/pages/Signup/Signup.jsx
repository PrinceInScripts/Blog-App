import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { isEmail, isValidPassword } from '../../helper/RegexMatcher';
import toast from 'react-hot-toast';
import { createAccount } from '../../redux/slice/authSlice';
import Layout from '../../Layout/Layout';
import { BsPersonCircle } from 'react-icons/bs';
import signup from '../../assets/signup.png'

function Signup() {
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [signupDetails,setSignupDetails]=useState({
        email:"",
        fullName:"",
        password:"",
        username:"",
        avatar:""
    })

    const [previewImage,setPreviewImage]=useState('')

    function handleUserInput(e){
        const {name,value}=e.target;

        setSignupDetails({
            ...signupDetails,
            [name]:value
        })
    }

    function handleImage(e){
        e.preventDefault()

        const uploadedImage=e.target.files[0]

        if(!uploadedImage){
               return;
        }

        setSignupDetails({
            ...signupDetails,
            avatar:uploadedImage
        })

        const fileReader=new FileReader()
        fileReader.readAsDataURL(uploadedImage)
        fileReader.addEventListener("load",function(){
            setPreviewImage(this.result)
        })
    }



    async function onFormSubmit(e){
        e.preventDefault()
        console.log(signupDetails);
        if(!signupDetails.fullName || !signupDetails.password || !signupDetails.username || !signupDetails.email ||!signupDetails.avatar){
            toast.error("Please fill all the detials")
            return;
        }

        if(signupDetails.fullName.length <5 || signupDetails.username.length<5){
            toast.error('Name should be atleast of 5 charcter');
            return;
        }

        if(!isEmail(signupDetails.email)){
            toast.error("Invalid email provided")
            return;
        }

        if(!isValidPassword(signupDetails.password)){
            toast.error("Invalid password provided, password should 6-16 character long with atleast a number and a special character")
            return;
        }

        const formData=new FormData()
        formData.append("fullName",signupDetails.fullName)
        formData.append("email",signupDetails.email)
        formData.append("password",signupDetails.password)
        formData.append("username",signupDetails.username)
        formData.append("avatar",signupDetails.avatar)

        const response=await dispatch(createAccount(formData))
        console.log("response",response);
        if(response?.payload?.data.success){
            navigate("/")
        }

        setSignupDetails({
            email:'',
            fullName:'',
            password:'',
            username:'',
            avatar:''
    })

    setPreviewImage("")

    }

    return (
        <Layout>
             <div className="flex overflow-x-auto items-center justify-center gap-20 h-[90vh]">
             <div className='w-96 h-[36rem] p-6 rounded-lg flex flex-col justify-evenly bg-bash-600 shadow-[0_0_10px_black]'>
                 <p className='text-sm'>It is easy and free to your post your thinking on any topic and connect with thousand of readers</p>
                 <img src={signup} alt="" />
             </div>
             <form onSubmit={onFormSubmit} noValidate className="flex flex-col justify-center gap-3 bg-bash-600 rounded-lg p-6 w-96 h-[36rem]  shadow-[0_0_10px_black]">
             <p className="">
                            have an account ? <Link to="/signin" className="cusror-pointer text-accent">Login</Link>
                </p>
                
                  

                <h1 className="text-2xl font-bold">Welcome to the WriteWave </h1>
                <label htmlFor="image_uploads" className="cursor-pointer">
                    {previewImage ? (
                       <img className="w-24 h-24 m-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2" src={previewImage} alt="" />
                    ) :(
                           <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                    )}
                </label>
                <input
                onChange={handleImage}
                type="file"
                className="hidden"
                name="image_uploads"
                id="image_uploads"
                accept=".jpg, .jpeg, .png, .svg"
                />

                   <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="font-semibold">Username</label>
                    <input
                     onChange={handleUserInput}
                     value={signupDetails.username}
                    required
                    type="text"
                    name="username"
                    className="bg-transparent px-2 py-1 border"
                    placeholder="enter your username..."
                    id="username"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="fullName" className="font-semibold">Name</label>
                    <input
                    onChange={handleUserInput}
                    value={signupDetails.fullName}
                    required
                    type="text"
                    name="fullName"
                    className="bg-transparent px-2 py-1 border"
                    placeholder="enter your username..."
                    id="fullName"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input
                     onChange={handleUserInput}
                     value={signupDetails.email}
                    required
                    type="email"
                    name="email"
                    className="bg-transparent px-2 py-1 border"
                    placeholder="enter your Email..."
                    id="email"
                    />
                </div>
               
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="font-semibold">Password</label>
                    <input
                     onChange={handleUserInput}
                     value={signupDetails.password}
                    required
                    type="password"
                    name="password"
                    className="bg-transparent px-2 py-1 border"
                    placeholder="enter your Password..."
                    id="password"
                    />
                </div>
                <button type="submit" className="mt-2 btn btn-success">
                   Create Account
                </button>
                
             </form>
            
        </div>
        </Layout>
    );
}

export default Signup;