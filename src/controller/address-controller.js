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

const update = async (req, res, next) => {
  try {
    const email = req.decodeToken.email;
    const id = req.params.id;
    const request = req.body;
    request.email = email;
    request.id = id;
    await addressService.update(request);
    res.status(200).json({
      message: "User Address updated Successfully",
    });
  } catch (e) {
    next(e);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const email = req.decodeToken.email;
    const id = req.params.id;
    const request = {};
    request.email = email;
    request.id = id;
    await addressService.deleteAddress(request);
    res.status(200).json({
      message: "Address deleted succesfully",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
  update,
  deleteAddress,
};
