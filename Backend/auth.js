import JWT from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeaderToken = req.headers.authtoken;

  if (!authHeaderToken || !authHeaderToken.startsWith("Bearer ")) {
    return res.status(401).json({
      msg: "Access denied. No token provided.",
    });
  }

  const token = authHeaderToken.split(" ")[1];

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid or expired token.",
    });
  }
};