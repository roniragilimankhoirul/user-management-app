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

export default {
  register,
};
