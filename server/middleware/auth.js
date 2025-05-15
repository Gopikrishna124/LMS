const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

const authenticate = async (req, res, next) => {
  try {
    // const authHeader = req.headers.authorization;
      
    // if (!authHeader) {
    //   throw new Error("pls login");
    // }
    // const token = authHeader.split("")[1];
    const Token=req.cookies?.portalToken
     if (!Token){
      throw new Error("please Login")
    }
    const verifiedToken = await jwt.verify(Token,process.env.JSON_SECRET)
    if (!verifiedToken) {
      throw new Error("token expired");
    }
    req.user = verifiedToken.id
    next();
  } catch (err) {
    res.json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }

};

exports.module=authenticate
