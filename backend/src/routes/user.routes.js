import { Router } from "express"
import { addBlogToReadList, changePassword, getUser, logoutUser, readListPage, updateUserAvatar, updateUserCoverImage, updaterUserDetials } from "../controllers/user.controllers.js"
import {isUserLoggedIn} from '../middelwares/auth.middelwares.js'
import { upload } from "../middelwares/multer.middelwares.js"

const router=Router()

router.route("/me").get(isUserLoggedIn,getUser)
router.route("/logout").get(isUserLoggedIn,logoutUser)
router.route("/change-password").post(isUserLoggedIn,changePassword)
router.route("/update-account").patch(isUserLoggedIn,updaterUserDetials)
router.route("/avatar").patch(isUserLoggedIn,upload.single("avatar"),updateUserAvatar)
router.route("/coverImage").patch(isUserLoggedIn,upload.single("coverImage"),updateUserCoverImage)
router.route("/read-list/:slug").post(isUserLoggedIn,addBlogToReadList)
router.route("/read-list").get(isUserLoggedIn,readListPage)


export default router;
