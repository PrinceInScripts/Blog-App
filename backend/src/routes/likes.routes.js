import { Router } from "express";
import { isUserLoggedIn } from "../middelwares/auth.middelwares";
import { checkBlogExist, checkUserAndBlogExist } from "../middelwares/blog.middelwares";
import { getBlogLikes, likeBlog, unLikeBlog } from "../controllers/likes.controller";


const router=Router()

router.route("/:slug/like").post(isUserLoggedIn,checkBlogExist,checkUserAndBlogExist,likeBlog)
router.route("/:slug/unlike").post(isUserLoggedIn,checkBlogExist,checkUserAndBlogExist,unLikeBlog)
router.route("/:slug").get(isUserLoggedIn,checkBlogExist,checkUserAndBlogExist,getBlogLikes)

export default router;