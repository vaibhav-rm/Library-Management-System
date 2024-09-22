import { Router } from "express"
import { addTransaction } from "../controllers/transaction.controller.js"

const router = Router()

router.route("/").post(addTransaction)

export default router