import { Router } from "express";
import { addAuthor, getAllAuthors, updateAuthor, deleteAuthor, getAuthorById } from "../controllers/author.controller.js";

const router = Router();

router.route("/")
    .post(addAuthor)
    .get(getAllAuthors);

router.route("/:id")
    .get(getAuthorById) // Add this line
    .put(updateAuthor)
    .delete(deleteAuthor);  

export default router;
