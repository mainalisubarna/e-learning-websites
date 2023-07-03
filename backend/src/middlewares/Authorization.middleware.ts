import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import "dotenv/config";
export const AuthenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers && req.headers.authorization?.startsWith("Bearer ")) {
      const jwtToken = req.headers.authorization.split(" ")[1];
      const user: any = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY ?? "");
      const { email } = user.details;
      const isUserValid = await User.findOne({ email });
      if (isUserValid) {
        req.user = isUserValid;
        next();
      } else {
        res.status(401).json({
          status: false,
          message: "Unauthorized User",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        message: "Authorization Failed",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
