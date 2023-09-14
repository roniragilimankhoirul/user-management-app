import express from "express";
import swaggerUi from "swagger-ui-express";
import swagger from "../../docs/api.json" assert { type: "json" };
const publicRouter = new express.Router();

publicRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello DOT",
  });
});
publicRouter.use("/api/docs", swaggerUi.serve);
publicRouter.get("/api/docs", swaggerUi.setup(swagger));
export { publicRouter };
