import { Router } from "express";
import { addBlog } from "../controllers/blog.controllers.js";

const router=Router()

router.route("/addBlog").post(addBlog)

export default router;