import React, { useState } from "react";
import Layout from "../../../Layout/Layout";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import { updateAvatar } from "../../../redux/slice/authSlice";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";

function EditAvatar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState({
    avatar: "",
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
          avatar: uploadImage,
          previewImage: this.result,
        });
      });
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!image.avatar) {
      toast.error("avatar is required");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", image.avatar);

    const response = await dispatch(updateAvatar(formData));
   

    if (response?.payload?.success) {
      navigate("/profile");
    }

    setImage({
      avatar: "",
      previewImage: "",
    });
  }

  return (
    <Layout>
      <div className="min-h-[90vh] flex flex-col items-center justify-center">
        <form onSubmit={onSubmit} className=" h-80 flex flex-col gap-10">
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
                  className=" w-56 h-56 rounded-full m-auto  border"
                />
              ) : (
                <div className="w-56 h-56 rounded-full m-auto flex flex-col items-center justify-center border">
                  <BsPersonCircle className="w-56 h-56 rounded-full m-auto" />
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
            Update avatar
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default EditAvatar;
