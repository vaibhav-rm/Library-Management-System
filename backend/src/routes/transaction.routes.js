import { Router } from "express";
import { 
    addTransaction, 
    getPendingRequests, 
    updateTransactionStatus, 
    getActiveBorrowings, 
    returnBook,
    issueBook
} from "../controllers/transaction.controller.js";
import { verifyJWT, authorizeAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/borrow").post(verifyJWT, addTransaction);
router.route("/pending").get(verifyJWT, authorizeAdmin, getPendingRequests);
router.route("/active").get(verifyJWT, authorizeAdmin, getActiveBorrowings);
router.route("/:transactionId").patch(verifyJWT, authorizeAdmin, updateTransactionStatus);
router.route("/:transactionId/return").patch(verifyJWT, authorizeAdmin, returnBook);
router.route("/:transactionId/issue").patch(verifyJWT, authorizeAdmin, issueBook);

export default router;