import React from 'react';
import Layout from '../../Layout/Layout';
import { Link } from 'react-router-dom';
import HomePage from '../../assets/HomePage.png'

function Home() {
    return (
        <Layout>
            <div className="pt-1 flex flex-col lg:flex-row items-center bg-bash-400 justify-center gap-10 mx-16 h-[90vh]">
              <div className="lg:w-1/2 space-y-4">
                <div> 
                <p className="lg:text-4xl text-3xl font-bold">A Place To  </p>
                <p className='lg:text-4xl text-3xl font-bold'>Read , Write</p>
                <p className='lg:text-4xl text-3xl font-bold'>and Connect</p>
                </div>
                <p className="lg:text-xl text-sm font-semibold py-6">
                   It is easy and free to post your thinking on any<br/> topics and connect with millions of readers.
                </p>
                <div className="space-x-6 flex"> 
                    <Link to="/signup">
                    <button className="btn btn-success">
                            Get Started
                        </button>
                    </Link>
                    <Link to="/contact">
                    <button className="btn btn-warning">
                            Contact Us
                        </button>
                    </Link>
                </div>
              </div>

              <div className="w-1/2 lg:flex items-center justify-center hidden ">
                    <img src={HomePage} alt="Home Page" />
              </div>
            </div>

{/* <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
    <div>
    <p className="lg:text-4xl text-3xl font-bold">A Place To  </p>
                <p className='lg:text-4xl text-3xl font-bold'>Read , Write</p>
                <p className='lg:text-4xl text-3xl font-bold'>and Connect</p>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div> */}
        </Layout>
    );
}

export default Home;