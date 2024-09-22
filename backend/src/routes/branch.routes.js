import { Router } from "express";
import { addBranch, getAllBranches } from "../controllers/branch.controller.js";

const router = Router();

router.route("/").post(addBranch).get(getAllBranches);

export default router;