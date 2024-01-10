import { Router } from "express";
import authRouter from './auth.routes.js'
import userRouter from './user.routes.js'
import blogRouter from './blog.routes.js'
import blogLikeRouter from './BlogLikes.routes.js'
import commentRouter from './comments.routes.js'
import commentLikeRouter from './CommentLikes.routes.js'
const router=Router()

router.use("/auth",authRouter)
router.use("/users",userRouter)
router.use("/blog",blogRouter)
router.use("/blog-like",blogLikeRouter)
router.use("/comment",commentRouter)
router.use("/comment-like",commentLikeRouter)

export default router

