import express from "express";
import { publicRouter } from "../route/public-api.js";

const app = express();
app.use(express.json());
app.use(publicRouter);

export { app };
