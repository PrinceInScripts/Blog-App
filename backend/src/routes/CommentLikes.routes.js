import { Router } from "express";
import { isUserLoggedIn } from "../middelwares/auth.middelwares.js";
import { getCommentLikes, likeComment } from "../controllers/commentLikes.controllers.js";
import { checkCommentExist } from "../middelwares/comment.middelwares.js";

const router =Router()

router.route("/:commentId/like").post(isUserLoggedIn,checkCommentExist,likeComment)
// router.route("/:commentId/unlike").post(isUserLoggedIn,checkCommentExist,unLikeComment)
router.route("/:commentId/").post(isUserLoggedIn,getCommentLikes)

export default router