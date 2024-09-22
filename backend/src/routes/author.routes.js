// author.routes.js
import { Router } from "express";
import { addAuthor, getAllAuthors, updateAuthor, deleteAuthor } from "../controllers/author.controller.js";

const router = Router();

router.route("/")
    .post(addAuthor)
    .get(getAllAuthors);

router.route("/:id")
    .put(updateAuthor)
    .delete(deleteAuthor);

export default router;