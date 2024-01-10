import { Router } from "express";
import { isUserLoggedIn } from "../middelwares/auth.middelwares.js";
import { checkBlogExist, checkUserAndBlogExist } from "../middelwares/blog.middelwares.js";
import { getBlogLikes, likeBlog, unLikeBlog } from "../controllers/likes.controller.js";


const router=Router()

router.route("/:slug/like-blog").post(isUserLoggedIn,checkBlogExist,likeBlog)
router.route("/:slug/unlike-blog").post(isUserLoggedIn,checkBlogExist,unLikeBlog)
router.route("/:slug").get(isUserLoggedIn,checkBlogExist,getBlogLikes)

export default router;