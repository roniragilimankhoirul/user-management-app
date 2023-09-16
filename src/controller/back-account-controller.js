import backAccountService from "../service/back-account-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.decodeToken;
    await backAccountService.create(user, req.body);
    res.status(200).json({
      message: "User back account created successfully",
    });
  } catch (e) {
    next(e);
  }
};
export default { create };
