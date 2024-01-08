import { Router } from "express";
import { loginuser, registerUser } from "../controllers/auth.controllers.js";
import { upload } from "../middelwares/multer.middelwares.js";

const router=Router();

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser)

router.route("/login").post(loginuser)

export default router