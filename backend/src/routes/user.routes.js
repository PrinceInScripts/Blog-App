import { Router } from "express"
import { changePassword, getUser, logoutUser } from "../controllers/user.controllers.js"
import {isUserLoggedIn} from '../middelwares/auth.middelwares.js'

const router=Router()

router.route("/me").get(isUserLoggedIn,getUser)
router.route("/logout").get(isUserLoggedIn,logoutUser)
router.route("/change-password").get(isUserLoggedIn,changePassword)


export default router;
