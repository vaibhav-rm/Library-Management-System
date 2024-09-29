// book.routes.js
import { Router } from "express";
import { addBook, getAllBooks, updateBook, deleteBook, getBookById } from "../controllers/book.controller.js";

const router = Router();

router.route("/")
    .post(addBook)
    .get(getAllBooks);

router.route("/:id")
    .put(updateBook)
    .delete(deleteBook)
    .get(getBookById);

export default router;