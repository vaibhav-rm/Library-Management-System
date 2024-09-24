// book.routes.js
import { Router } from "express";
import { addBook, getAllBooks, updateBook, deleteBook } from "../controllers/book.controller.js";

const router = Router();

router.route("/")
    .post(addBook)
    .get(getAllBooks);

router.route("/:id")
    .put(updateBook)
    .delete(deleteBook);

export default router;