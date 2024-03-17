import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./router";

const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
}));

app.use("/", router);


export default app;