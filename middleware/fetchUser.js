// access for reqest a object/respose to it/and next fn
var jwt = require("jsonwebtoken");
const jwt_Secret = "manikyoSaringan";

const fetchUser = (req, res, next) => {
  // get user from jwt tokken and add id to the requested obj
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Enter using correct TOKEN... " });
  }
  try {
    const data = jwt.verify(token, jwt_Secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Enter using correct TOKEN... " });
  }
};

module.exports = fetchUser;
