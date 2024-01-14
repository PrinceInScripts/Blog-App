import React, { useState } from "react";
import Layout from "../../../Layout/Layout";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import { updateCoverImage } from "../../../redux/slice/authSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function EditCoverImage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState({
    coverImage: "",
    previewImage: "",
  });

  function handleImage(e) {
    e.preventDefault();
    const uploadImage = e.target.files[0];

    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setImage({
          ...image,
          coverImage: uploadImage,
          previewImage: this.result,
        });
      });
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!image.coverImage) {
      toast.error("CoverImage is required");
      return;
    }

    const formData = new FormData();
    formData.append("coverImage", image.coverImage);

    const response = await dispatch(updateCoverImage(formData));

    if (response?.payload?.success) {
      navigate("/profile");
    }

    setImage({
      coverImage: "",
      previewImage: "",
    });
  }

  return (
    <Layout>
      <div className="min-h-[90vh] flex flex-col items-center justify-center">
        <form onSubmit={onSubmit} className=" w-3/4 h-80 flex flex-col gap-10">
          <Link
            onClick={() => navigate(-1)}
            className=" text-2xl link text-accent cursor-pointer"
          >
            <AiOutlineArrowLeft />
          </Link>
          <div>
            <label
              htmlFor="image_uploads"
              className="cursor-pointer text-center"
            >
              {image?.previewImage ? (
                <img
                  src={image?.previewImage}
                  className=" w-full h-60 m-auto  border"
                />
              ) : (
                <div className="w-full h-60 m-auto flex flex-col items-center justify-center border">
                  <FaUpload size={60} />
                  <p className=""></p>
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

          <button type="submit" className="btn w-full btn-info">
            Update CoverImage
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default EditCoverImage;
