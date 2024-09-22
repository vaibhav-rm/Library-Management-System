import { Router } from "express";
import { addBook, getAllBooks } from "../controllers/book.controller.js";

const router = Router();

router.route("/").post(addBook).get(getAllBooks);

export default router;