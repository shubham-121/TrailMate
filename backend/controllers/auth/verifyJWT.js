const jwt = require("jsonwebtoken");

async function verifyJWT(req, res, next) {
  const body = req.headers;

  const { authorization } = body;

  console.log("authorization: ", authorization);

  const jwt_token = authorization && authorization.split(" ")[1];

  console.log("verifyjwt route: ", body, jwt_token);

  if (!jwt_token) {
    return res.status(401).json({
      message: "Token Not Valid,Please Login again",
      statusMsg: "Missing Token",
    });
  }

  const isUserValid = jwt.verify(
    jwt_token,
    process.env.JWT_SECRET_KEY,
    (err, user) => {
      if (err)
        return res
          .status(403)
          .json({ message: "Invalid token", statusMsg: "Invalid Token" });

      console.log("jwt verifyied user:", user);
      req.user = user;

      next();
    }
  );
}

module.exports = verifyJWT;
