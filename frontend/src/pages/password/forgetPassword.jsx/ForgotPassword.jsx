import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgetPassword } from "../../../redux/slice/authSlice";
import Layout from "../../../Layout/Layout";
import { isEmail } from "../../../helper/RegexMatcher";

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!email) {
      toast.error("All filds are mandatory");
      return;
    }

    if (!isEmail(email)) {
      toast.error("Invalid email id");
      return;
    }

   await dispatch(forgetPassword(email));

    setEmail("");

    navigate("/");
  }
  return (
    <Layout>
      <div className="flex items-center justify-center h-[90vh]">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-6 rounded-lg bg-bash-200 p-10 w-80 h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Forget Password</h1>

          <p>
            Enter your registered email, we will send you a verification link on
            your registered email from which you can reset your password.
          </p>

          <div className="flex flex-col gap-1">
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your registered email"
              className="bg-transparent px-2 py-1 border"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <button className="btn btn-info" type="submit">
            Get Verification Link
          </button>

          <p className="text-center">
            Already have an account ?{" "}
            <Link to={"/login"} className="link text-accent cursor-pointer">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default ForgotPassword;
