/* eslint-disable import/extensions */
import jwt from "jsonwebtoken";
import { Decrypt } from "../utils/crypto.js";

const verifyUserToken = async (req, res, next) => {
  const token = req.header("authtoken");

  if (!token) {
    return res.status(401).json({
      status: false,
      msg: "There is no token attached to the request object",
    });
  }

  try {
    const decryptToken = await Decrypt(token);
    console.log(decryptToken);
    const verify = jwt.verify(decryptToken, process.env.ACCESS_JWT_TOKEN);
    req.user = verify;
    next();
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "Not Authorized or Token Expired, please login again",
    });
  }
};

export default verifyUserToken;
