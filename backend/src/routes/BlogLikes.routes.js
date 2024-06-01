import { Router } from "express";
import { isUserLoggedIn } from "../middelwares/auth.middelwares.js";
import { checkBlogExist, checkUserAndBlogExist } from "../middelwares/blog.middelwares.js";
import { getBlogLikes, likeBlog } from "../controllers/blogLlikes.controller.js";


const router=Router()

router.route("/:slug/like").post(isUserLoggedIn,checkBlogExist,likeBlog)
// router.route("/:slug/unlike").post(isUserLoggedIn,checkBlogExist,unLikeBlog)
router.route("/:slug").get(getBlogLikes)

export default router;