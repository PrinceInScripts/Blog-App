import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Denied() {
    const navigate=useNavigate()

    useEffect(()=>{
        toast.error("Access Denied")
    },[])
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-basg-200">
        <h1 className="text-9xl font-extrabol tracking-widest">
          403
        </h1>
        <button className="mt-5 btn btn-error">
          <a className="relative inline-block text-sm font-medium ">  
            <span
              onClick={() => navigate(-1)}
              className=""
            >
              Go Back
            </span>
          </a>
        </button>
      </main>
    );
}

export default Denied;