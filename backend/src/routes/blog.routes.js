import { Router } from "express";
import { createBlog, deleteBlog, editBlogDetials, editBlogImage, editBlogPage, getAllBlogs, getBlogDetials, getBlogsOfUser, } from "../controllers/blog.controllers.js";
import { isUserLoggedIn } from "../middelwares/auth.middelwares.js";
import { upload } from "../middelwares/multer.middelwares.js";
import { checkBlogExist, checkUserAndBlogExist } from "../middelwares/blog.middelwares.js";

const router=Router()

router.route("/addBlog").post(isUserLoggedIn,upload.single('image'),createBlog)
router.route("/").get(getAllBlogs)
router.route("/user/blogs").get(isUserLoggedIn,getBlogsOfUser)
router.route("/:slug").get(getBlogDetials)
router.route("/edit-blog/:slug").get(isUserLoggedIn,checkBlogExist,checkUserAndBlogExist,editBlogPage)
router.route("/:slug/edit-blog-detials").patch(isUserLoggedIn,checkBlogExist,checkUserAndBlogExist,editBlogDetials)
router.route("/:slug/edit-blog-image").patch(isUserLoggedIn,checkBlogExist,checkUserAndBlogExist,upload.single('image'),editBlogImage)
router.route("/:slug/delete-blog").delete(isUserLoggedIn,checkBlogExist,checkUserAndBlogExist,deleteBlog)

export default router;