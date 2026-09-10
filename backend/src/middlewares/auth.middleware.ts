import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET || "default_fallback_secret";

interface JwtPayload {
  id: number;
  username: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Malformed token" });
  }

  try {
    console.log("Secret key: ", secretKey);
    console.log("token: ", token);
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    console.log(authHeader);
    console.log("decoded: ", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("error: ", error);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default authenticateToken;
