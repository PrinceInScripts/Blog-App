import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/authSlice";
import { isEmail } from "../../helper/RegexMatcher";
import logintool from "../../assets/logintool.png";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;

    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!loginDetails.password || !loginDetails.email) {
      toast.error("Please fill all the detials");
      return;
    }

    if (!isEmail(loginDetails.email)) {
      toast.error("Invalid email provided");
      return;
    }

    const response = await dispatch(login(loginDetails));

    if (response?.payload?.data.success) {
      navigate("/");
    }

    setLoginDetails({
      email: "",
      password: "",
    });
  }

  return (
    // <Layout>
    //   <div className="flex overflow-x-auto gap-20 items-center justify-center h-[90vh]">
    //     <form
    //       onSubmit={onFormSubmit}
    //       noValidate
    //       className="flex flex-col gap-3 rounded-lg p-4 bg-bash-600 w-96 h-[30rem]  shadow-[0_0_10px_black]"
    //     >
    //       <p className="">
    //         Don't have an account ?{" "}
    //         <Link to="/signup" className="cusror-pointer text-accent">
    //           Signup
    //         </Link>
    //       </p>
    //       <h1 className="text-2xl text-center mt-12 font-bold">
    //         Login To Your Account
    //       </h1>
    //       <p className=" font-semibold">
    //         Please Login To Your Account , Thank You.
    //       </p>
    //       <div className="flex flex-col gap-1">
    //         <label htmlFor="email" className="font-semibold">
    //           Email
    //         </label>
    //         <input
    //           onChange={handleUserInput}
    //           value={loginDetails.email}
    //           required
    //           type="email"
    //           name="email"
    //           className="input input-bordered w-full max-w-xs"
    //           placeholder="enter your Email..."
    //           id="email"
    //         />
    //       </div>
    //       <div className="flex flex-col gap-1">
    //         <label htmlFor="password" className="font-semibold ">
    //           Password
    //         </label>
    //         <input
    //           onChange={handleUserInput}
    //           value={loginDetails.password}
    //           required
    //           type="password"
    //           name="password"
    //           className="input input-bordered w-full max-w-xs"
    //           placeholder="enter your Password..."
    //           id="password"
    //         />
    //       </div>
    //       <div className="relative left-52 w-32 border-none hover:border-none">
    //         <Link to={"/forgotPassword"}>
    //           <button className="text-accent">Forgot Password?</button>
    //         </Link>
    //       </div>

    //       <button
    //         type="submit"
    //         className="btn btn-success text-lg font-semibold"
    //       >
    //         Log In
    //       </button>
    //     </form>

    //     <div className="w-96 h-[30rem] p-6 rounded-lg hidden lg:flex items-center bg-bash-600 shadow-[0_0_10px_black]">
    //       <img src={logintool} alt="" />
    //     </div>
    //   </div>
    // </Layout>
    <Layout>
    <div className="flex items-center justify-center h-[90vh]">
      <div className="flex flex-col justify-center p-8 rounded-lg w-[40%]">
        <p className="text-center mb-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
        <p className="text-center font-semibold mb-6">
          Please login to your account. Thank you.
        </p>

        <form onSubmit={onFormSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={handleUserInput}
              value={loginDetails.email}
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
              value={loginDetails.password}
              required
              type="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password..."
              id="password"
            />
          </div>

          <div className="text-right">
            <Link to="/forgotPassword" className="text-blue-500">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Log In
          </button>
        </form>
      </div>

     
    </div>
  </Layout>
  );
}

export default Login;
