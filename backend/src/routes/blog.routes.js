import { Router } from "express";
import { createBlog, getAllBlogs, getBlogDetials, getBlogsOfUser, likeBlog } from "../controllers/blog.controllers.js";
import { isUserLoggedIn } from "../middelwares/auth.middelwares.js";
import { upload } from "../middelwares/multer.middelwares.js";
import { checkBlogExist } from "../middelwares/blog.middelwares.js";

const router=Router()

router.route("/addBlog").post(isUserLoggedIn,upload.single('image'),createBlog)
router.route("/").get(getAllBlogs)
router.route("/user/blogs").get(isUserLoggedIn,getBlogsOfUser)
router.route("/:slug").get(isUserLoggedIn,getBlogDetials)
router.route("/:slug/like").post(isUserLoggedIn,checkBlogExist,likeBlog)

export default router;