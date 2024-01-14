import React, { useEffect, useState } from "react";
import Layout from "../../../Layout/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MdModeEditOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { editBlogDetails } from "../../../redux/slice/blogSlice";

function EditBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [content, setContent] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
   
    if (!content) {
      toast.error("Content is required");
      return;
    }
   
    const parser = new DOMParser();
    const plainTextContent = parser.parseFromString(content, "text/html").body
      .textContent;

    const response = await dispatch(
      editBlogDetails({ slug: state.slug, content: plainTextContent })
    );
    

    if (response.payload.success) {
      navigate("/profile");
    }

    setContent("");
  }

 
  return (
    <Layout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="w-full h-60 m-auto">
            <img src={state?.image} alt="" className="w-full h-60 rounded-md" />
            <div className="absolute w-10 h-10 rounded-full flex items-center justify-center bg-white right-52 cursor-pointer bottom-[31rem] text-black">
              <Link to={"/update-image"} state={{ ...state }}>
                <MdModeEditOutline size={25} />
              </Link>
            </div>
          </div>
          <div>
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
              config={{
                placeholder: "Start typing your blog here...",
              }}
            />
          </div>

          <button type="submit" className="btn btn-info">
            Edit Content
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default EditBlog;
