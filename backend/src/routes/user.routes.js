import { Router } from "express"
import { getUser } from "../controllers/user.controllers"

const router=Router()

router.route("/me",getUser)


export default router;
