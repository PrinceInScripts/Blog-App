import { Router } from "express"
import { getUser, logoutUser } from "../controllers/user.controllers.js"
import {isUserLoggedIn} from '../middelwares/auth.middelwares.js'

const router=Router()

router.route("/me").get(isUserLoggedIn,getUser)
router.route("/logout").get(isUserLoggedIn,logoutUser)


export default router;
