import bankAccountService from "../service/bank-account-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.decodeToken;
    await bankAccountService.create(user, req.body);
    res.status(200).json({
      message: "User back account created successfully",
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const user = req.decodeToken.email;
    const result = await bankAccountService.get(user);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export default { create, get };
