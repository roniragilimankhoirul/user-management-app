import userService from "../service/user-service.js";

const register = async (req, res, next) => {
  try {
    await userService.register(req.body);
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({
      token: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const user = req.decodeToken.email;
    const result = await userService.get(user);
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
    await userService.update(request);
    res.status(200).json({
      message: "user updated succesfully",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
  get,
  update,
};
