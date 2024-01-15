import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addBlog } from "../../redux/slice/blogSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FaUpload } from "react-icons/fa";

function AddBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
    preViewImage: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  function handleImage(e) {
    e.preventDefault();
    const uploadImage = e.target.files[0];

    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          image: uploadImage,
          preViewImage: this.result,
        });
      });
    }
  }

  async function onFormSubmit(e) {
    e.preventDefault();
  

    if( !userInput.title){
      toast.error("title is required");
      return;
    }
    if( !userInput.content){
      toast.error("content is required");
      return;
    }
    if(!userInput.category ){
      toast.error("category is required");
      return;
    }
    if(  !userInput.image){
      toast.error("image is required");
      return;
    }

    const parser = new DOMParser();
    const plainTextContent = parser.parseFromString(
      userInput.content,
      "text/html"
    ).body.textContent;

    const formData = new FormData();
    formData.append("title", userInput.title);
    formData.append("content", plainTextContent);
    formData.append("category", userInput.category);
    formData.append("image", userInput.image);

    const response = await dispatch(addBlog(formData));

    if (response?.payload?.success) {
      navigate("/");
    }

    setUserInput({
      title: "",
      content: "",
      category: "",
      image: "",
      preViewImage: "",
    });
  }

  return (
    <Layout>
      <div className="min-h-[100vh] flex items-center justify-center">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col px-20 gap-5 w-full py-10 justify-center lg:w-1/2"
        >
          <Link
            onClick={() => navigate(-1)}
            className="absolute top-20 text-2xl link text-accent cursor-pointer"
          >
            <AiOutlineArrowLeft />
          </Link>
          <div className="w-full">
            <input
              placeholder="Title"
              className="input input-bordered w-full max-w-5xl"
              type="text"
              name="title"
              id="title"
              onChange={handleUserInput}
              value={userInput.title}
            />
          </div>
          <div className="w-full">
            <input
              placeholder="Category"
              className="input input-bordered w-full max-w-5xl"
              type="text"
              name="category"
              id="category"
              onChange={handleUserInput}
              value={userInput.category}
            />
          </div>
          <div>
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                const data = editor.getData();
                setUserInput({
                  ...userInput,
                  content: data,
                });
              }}
              config={{
                placeholder: "Start typing blog here...",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="image_uploads"
              className="cursor-pointer text-center"
            >
              {userInput?.preViewImage ? (
                <img
                  src={userInput?.preViewImage}
                  className=" w-full h-60 m-auto  border"
                />
              ) : (
                <div className="w-full h-60 m-auto flex flex-col items-center justify-center border">
                  <FaUpload />
                  <p className="">
                    Include a high-qulaity image in your blog to
                    <br /> make it more inviting to readers
                  </p>
                </div>
              )}
            </label>
            <input
              className="hidden"
              type="file"
              id="image_uploads"
              accept=".jpg, .png, .jpeg, .svg"
              onChange={handleImage}
              name="image_uploads"
            />
          </div>

          <div className="w-full">
            <button type="submit" className="btn w-full btn-info">
              Publish
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AddBlog;
