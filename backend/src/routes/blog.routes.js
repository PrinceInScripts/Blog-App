import { Router } from "express";
import { createBlog } from "../controllers/blog.controllers.js";
import { isUserLoggedIn } from "../middelwares/auth.middelwares.js";
import { upload } from "../middelwares/multer.middelwares.js";

const router=Router()

router.route("/addBlog").post(isUserLoggedIn,upload.single('image'),createBlog)

export default router;