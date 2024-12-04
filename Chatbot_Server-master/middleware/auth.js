import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const protect = (req, res, next) => {
  // console.log(req.headers);
  if (
    req.headers.authorization
  ) {
    try {
      console.log("protect");

      const token = req.headers.authorization.split(" ")[1]; // Bearer <token>

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Assuming the decoded token contains user information

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).send("No Authorization");
  }
};

export const authorize = (role) => {
  return (req, res, next) => {
    // console.log(req.user.role);
    if (req.user.role !== role) {
      return res.status(403).send("Forbidden");
    }
    next();
  };
};
