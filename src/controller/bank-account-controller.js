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

const getById = async (req, res, next) => {
  try {
    const email = req.decodeToken.email;
    const id = req.params.id;
    const request = {};
    request.email = email;
    request.id = id;
    const result = await bankAccountService.getById(request);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const email = req.decodeToken.email;
    const id = req.params.id;
    const request = req.body;
    request.email = email;
    request.id = id;
    await bankAccountService.update(request);
    res.status(200).json({
      message: "User bank account updated successfully",
    });
  } catch (e) {
    next(e);
  }
};

const deleteBankAccount = async (req, res, next) => {
  try {
    const email = req.decodeToken.email;
    const id = req.params.id;
    const request = {};
    request.email = email;
    request.id = id;
    await bankAccountService.deleteBankAccount(request);
    res.status(200).json({
      message: "User bank account deleted successfully",
    });
  } catch (e) {
    next(e);
  }
};

export default { create, get, getById, update, deleteBankAccount };
