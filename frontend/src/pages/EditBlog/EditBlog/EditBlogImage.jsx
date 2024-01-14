import React, { useEffect, useState } from "react";
import Layout from "../../../Layout/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { editBlogImage } from "../../../redux/slice/blogSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { FaUpload } from "react-icons/fa";

function EditBlogImage() {
  const { state } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState({
    image: "",
    preViewImage: "",
  });

  function handleImage(e) {
    e.preventDefault();
    const uploadImage = e.target.files[0];

    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setImage({
          image: uploadImage,
          preViewImage: this.result,
        });
      });
    }
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!image.image) {
      toast.error("Image is required");
      return;
    }

    const formData = new FormData();
    formData.append("image", image.image);
    const response = await dispatch(
      editBlogImage({ slug: state.slug, formData })
    );

    if (response?.payload?.success) {
      navigate("/");
    }

    setImage({
      image: "",
      preViewImage: "",
    });
  }

 
  return (
    <Layout>
      <div className="min-h-[100vh] flex items-center justify-center">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col px-20 gap-5 py-10 justify-center w-1/2"
        >
          <Link
            onClick={() => navigate(-1)}
            className="absolute top-20 text-2xl link text-accent cursor-pointer"
          >
            <AiOutlineArrowLeft />
          </Link>

          <div>
            <label
              htmlFor="image_uploads"
              className="cursor-pointer text-center"
            >
              {image?.preViewImage ? (
                <img
                  src={image?.preViewImage}
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

export default EditBlogImage;
