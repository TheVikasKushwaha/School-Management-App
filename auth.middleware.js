const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: "N",
        error: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: "N",
          error: "Invalid or expired token",
        });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("JWT ERROR:", error);
    return res.status(500).json({
      status: "N",
      error: "Auth middleware failed",
    });
  }
};

module.exports = { authenticateJWT };
