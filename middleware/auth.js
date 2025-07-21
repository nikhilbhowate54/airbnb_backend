const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let authHeader = req.headers.authorization;
  console.log(authHeader)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "no token provided" });
  }
  const token =authHeader.split(' ')[1]
  try {
    const decoded =jwt.verify(token,process.env.secretkey)
    req.user =decoded
    next()
  } catch (error) {
    return res.status(400).json({message:'invaild token'})
  }
  
};
