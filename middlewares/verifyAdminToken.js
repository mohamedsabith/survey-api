import jwt from "jsonwebtoken";

const verifyAdminToken = async (req, res, next) => {
  const token = req.header("admintoken");

  if (!token) {
    return res.status(401).json({
      status: false,
      msg: "There is no token attached to the request object",
    });
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_ADMIN_SECRET_KEY);
    req.admin = verify;
    next();
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "Not Authorized or Token Expired, please login again",
    });
  }
};

export default verifyAdminToken;
