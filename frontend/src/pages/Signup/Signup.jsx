import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { isEmail, isValidPassword } from "../../helper/RegexMatcher";
import toast from "react-hot-toast";
import { createAccount } from "../../redux/slice/authSlice";
import Layout from "../../Layout/Layout";
import { BsPersonCircle } from "react-icons/bs";
import signup from "../../assets/signup.png";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signupDetails, setSignupDetails] = useState({
    email: "",
    fullName: "",
    password: "",
    username: "",
    avatar: "",
  });

  const [previewImage, setPreviewImage] = useState("");

  function handleUserInput(e) {
    const { name, value } = e.target;

    setSignupDetails({
      ...signupDetails,
      [name]: value,
    });
  }

  function handleImage(e) {
    e.preventDefault();

    const uploadedImage = e.target.files[0];

    if (!uploadedImage) {
      return;
    }

    setSignupDetails({
      ...signupDetails,
      avatar: uploadedImage,
    });

    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      setPreviewImage(this.result);
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if(!signupDetails.fullName){
      toast.error("FullName is required")
      return;
    }
    if( !signupDetails.username ){
      toast.error("username is required")
      return;
    }
    if( !signupDetails.email){
      toast.error("email is required")
      return;
    }
    if( !signupDetails.password){
      toast.error("password is required")
      return;
    }
    if( !signupDetails.avatar){
      toast.error("avatar is required")
      return;
    }

    if (signupDetails.fullName.length < 5 ) {
      toast.error("Name should be atleast of 5 charcter");
      return;
    }
    if (signupDetails.username.length < 5) {
      toast.error("username should be atleast of 5 charcter");
      return;
    }

    if (!isEmail(signupDetails.email)) {
      toast.error("Invalid email provided");
      return;
    }

    if (!isValidPassword(signupDetails.password)) {
      toast.error(
        "Invalid password provided, password should 6-16 character long with atleast a number and a special character"
      );
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signupDetails.fullName);
    formData.append("email", signupDetails.email);
    formData.append("password", signupDetails.password);
    formData.append("username", signupDetails.username);
    formData.append("avatar", signupDetails.avatar);

    const response = await dispatch(createAccount(formData));
    if (response?.payload?.data.success) {
      navigate("/login");
    }

    setSignupDetails({
      email: "",
      fullName: "",
      password: "",
      username: "",
      avatar: "",
    });

    setPreviewImage("");
  }

  return (
       
    <Layout>
    <div className="flex items-center justify-center h-[90vh] ">
      <div className="flex flex-col justify-center p-8 rounded-lg w-[40%]">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
        <p className="text-center mb-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>

        <form onSubmit={onFormSubmit} noValidate className="space-y-4">
          <div className="text-center">
            <label htmlFor="image_uploads" className="cursor-pointer">
              {previewImage ? (
                <img
                  className="w-24 h-24 mx-auto rounded-full ring-2 ring-blue-500"
                  src={previewImage}
                  alt="Avatar Preview"
                />
              ) : (
                <BsPersonCircle className="w-24 h-24 mx-auto text-gray-300" />
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
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              onChange={handleUserInput}
              value={signupDetails.username}
              required
              type="text"
              name="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your username..."
              id="username"
            />
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              onChange={handleUserInput}
              value={signupDetails.fullName}
              required
              type="text"
              name="fullName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your full name..."
              id="fullName"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={handleUserInput}
              value={signupDetails.email}
              required
              type="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email..."
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={handleUserInput}
              value={signupDetails.password}
              required
              type="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password..."
              id="password"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  </Layout>
  );
}

export default Signup;
