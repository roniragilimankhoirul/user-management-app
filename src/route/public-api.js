import express from "express";
const publicRouter = new express.Router();

publicRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello DOTS",
  });
});
export { publicRouter };
