import express from "express";
import { requireAuth } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";

const userRouter = new express.Router();

userRouter.use(requireAuth);
userRouter.get("/api/users", userController.get);
userRouter.put("/api/users/:id", userController.update);
userRouter.delete("/api/users/:id", userController.deleteUser);

export { userRouter };
