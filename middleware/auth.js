const jwt = require("jsonwebtoken");
const jwtSecret = require("config").get("jwtSecret");

module.exports = function(request, response, next) {
  const token = request.header("x-auth-token");
  if (!token) {
    return response.status(401).json({ msg: "No token, Authorization denied!" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    request.userid = decoded.userid;
    next();
  } catch (err) {
    //console.log(err);
    return response.status(401).json({ msg: "Token is not valid!" });
  }
};


