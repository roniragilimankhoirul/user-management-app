import jwt from "jsonwebtoken";
import "dotenv/config";

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
  const invalidMsg = "Invalid Token";
  const secret = process.env.JWT_SECRET;
  if (!token) return res.status(498).json({ message: invalidMsg });

  jwt.verify(token, secret, (err, decodeToken) => {
    if (err) return res.status(498).json({ message: invalidMsg });
    req.decodeToken = decodeToken;
    next();
  });
};

export { requireAuth };
