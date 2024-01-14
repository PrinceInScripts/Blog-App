import React, { useEffect } from "react";
import Layout from "../../Layout/Layout";
import { Link } from "react-router-dom";
import HomePage from "../../assets/HomePage.png";
import { getAllBlogs, getUserBlogs } from "../../redux/slice/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../../components/BlogCard/BlogCard";
import about from "../../assets/about.png";

function Home() {
  const dispatch = useDispatch();
  async function load() {
    const response = await dispatch(getAllBlogs());
   
  }
  useEffect(() => {
    load();
  }, []);

  const blog = useSelector((state) => state.blog.allBlogs);
  const auth=useSelector((state)=>state?.auth.isLoggedIn)

  const featuredBlog = blog.slice(0, 6);

  return (
    <Layout>
      <div className="pt-1 flex flex-col lg:flex-row ml-48 items-center bg-bash-400 justify-center gap-10 mx-16 h-[80vh]">
        <div className="lg:w-1/2 space-y-4">
          <div>
            <p className="lg:text-4xl text-3xl font-bold">A Place To Read </p>
            <p className="lg:text-4xl text-3xl font-bold">Write and Connect</p>
          </div>
          <p className="lg:text-xl text-sm font-semibold py-6">
            It is easy and free to post your thinking on any
            <br /> topics and connect with millions of readers.
          </p>
          <div className="space-x-6 flex">
            <Link to="/signup">
              <button className="btn btn-success">Get Started</button>
            </Link>
            <Link to="/contact">
              <button className="btn btn-warning">Contact Us</button>
            </Link>
          </div>
        </div>

        <div className="w-1/2 lg:flex items-center justify-center hidden ">
          <img src={HomePage} alt="Home Page" />
        </div>
      </div>
      <div className=" flex flex-col bg-bash-400 gap-10 mx-16 min-h-[90vh]">
        <h1 className="text-4xl font-bold">Featured Blog</h1>
        <div className="grid grid-cols-1 ml-5 md:ml-10 md:grid-cols-2 lg:grid-cols-3 gap-y-20 " title={auth ? '' : 'Login to see the whole post'}>
          {featuredBlog?.map((element) => (
            <BlogCard key={element._id} blog={element} />
          ))}
        </div>
      </div>
      <div className="flex mt-20 bg-bash-400 items-center ml-60 gap-10 mx-16 min-h-[80vh]">
        <div className="w-1/2">
          <img src={about} alt="" />
        </div>
        <div className="w-1/2 space-y-4">
          <div>
            <p className="lg:text-4xl text-3xl font-bold">
              Publish, Grow, Gain{" "}
            </p>
            <p className="lg:text-4xl text-3xl font-bold">
              Knownlege in one Place
            </p>
          </div>
          <p className="lg:text-xl text-sm font-semibold py-6">
            If you have Knownlege to share,or a prospective
            <br /> to offer - Welcome home.
          </p>
          <div className="space-x-6 flex">
            <Link to="/signup">
              <button className="btn btn-success">Let's Start</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
