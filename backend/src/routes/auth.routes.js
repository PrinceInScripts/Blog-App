import { Router } from "express";
import { forgotPassword, loginUser, refreshAccessToken, registerUser, resetPassword } from "../controllers/auth.controllers.js";
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

router.route("/login").post(loginUser)
router.route("/forget-password").post(forgotPassword)
router.route("/reset-password").put(resetPassword)
router.route("/refresh-token").post(refreshAccessToken)

export default router