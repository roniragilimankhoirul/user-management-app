import express from "express";
import { requireAuth } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
import addressController from "../controller/address-controller.js";
import backAccountController from "../controller/back-account-controller.js";

const userRouter = new express.Router();

userRouter.use(requireAuth);
// User API
userRouter.get("/api/users", userController.get);
userRouter.put("/api/users/:id", userController.update);
userRouter.delete("/api/users/:id", userController.deleteUser);

// Address API
userRouter.post("/api/address", addressController.create);
userRouter.get("/api/address", addressController.get);
userRouter.put("/api/address/:id", addressController.update);
userRouter.delete("/api/address/:id", addressController.deleteAddress);

// Back Account API
userRouter.post("/api/bank-accounts", backAccountController.create);
export { userRouter };
