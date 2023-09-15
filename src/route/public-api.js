import express from "express";
// import swaggerUi from "swagger-ui-express";
// import swagger from "../../docs/api.json" assert { type: "json" };
// const swagger = require("../../docs/api.json");
import userController from "../controller/user-controller.js";
const publicRouter = new express.Router();

publicRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello DOT",
  });
});
// publicRouter.use("/api/docs", swaggerUi.serve);
// publicRouter.get("/api/docs", swaggerUi.setup(swagger));

publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);

export { publicRouter };
