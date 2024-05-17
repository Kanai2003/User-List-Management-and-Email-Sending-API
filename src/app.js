import express from "express";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "*",
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// import routes
import listRouter from "./routes/list.router.js";
import userRouter from "./routes/user.router.js";

// routes declaration
app.use('/list', listRouter);
app.use('/user', userRouter);

export { app };
