import { Router } from "express";
import { addComment, deleteComment, getBlogComments } from "../controllers/comment.controllers";


const router=Router()

router.route("/:slug/add-comment").post(isUserLoggedIn,checkBlogExist,checkUserAndBlogExist,addComment)
router.route("/:slug/").post(isUserLoggedIn,checkBlogExist,checkUserAndBlogExist,getBlogComments)
router.route("/:slug/delete-comment").delete(isUserLoggedIn,checkBlogExist,checkUserAndBlogExist,deleteComment)




export default router;