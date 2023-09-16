import addressService from "../service/address-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.decodeToken;
    await addressService.create(user, req.body);
    res.status(200).json({
      message: "User address created successfully",
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const request = req.decodeToken.email;
    const result = await addressService.get(request);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
};
