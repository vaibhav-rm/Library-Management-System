import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import userRouter from "./routes/user.routes.js";
import bookRouter from "./routes/book.routes.js";
import authorRouter from "./routes/author.routes.js";
import branchRouter from "./routes/branch.routes.js";
import transactionRouter from "./routes/transaction.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/authors", authorRouter);
app.use("/api/v1/branches", branchRouter);
app.use("/api/v1/transactions", transactionRouter);

export { app } 