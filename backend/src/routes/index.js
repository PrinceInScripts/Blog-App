import { Router } from "express";
import authRouter from './auth.routes.js'
import userRouter from './user.routes.js'
import blogRouter from './blog.routes.js'
import likeRouter from './likes.routes.js'
import commentRouter from './comments.routes.js'
const router=Router()

router.use("/auth",authRouter)
router.use("/users",userRouter)
router.use("/blog",blogRouter)
router.use("/like",likeRouter)
router.use("/comment",commentRouter)

export default router

