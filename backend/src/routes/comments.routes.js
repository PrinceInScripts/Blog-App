import { Router } from "express";
import { addComment, deleteComment, getBlogComments } from "../controllers/comment.controllers.js";
import { isUserLoggedIn } from "../middelwares/auth.middelwares.js";
import { checkBlogExist } from "../middelwares/blog.middelwares.js";


const router=Router()

router.route("/:slug/add-comment").post(isUserLoggedIn,checkBlogExist,addComment)
router.route("/:commentId/remove-comment").delete(isUserLoggedIn,deleteComment)
router.route("/:slug/").get(isUserLoggedIn,checkBlogExist,getBlogComments)




export default router;