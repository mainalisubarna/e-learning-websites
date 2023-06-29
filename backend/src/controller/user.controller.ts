import { Request, Response } from "express";
import User from "../models/user.model";
import "dotenv/config";
import jwt from "jsonwebtoken";

export const addUser = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    const { email } = data;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const newUser = await User.create(data);
      res.status(200).json({
        status: true,
        data: newUser,
        message: "User registered successfully",
      });
    } else {
      res.status(401).json({
        status: false,
        message: "User already registered on this App",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const processLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });
    } else {
      const matchedPassword = await user.matchPassword(password);
      if (matchedPassword) {
        const secretKey = process.env.JWT_SECRET_KEY ?? "";
        const token = jwt.sign({ id: user.email }, secretKey, {
          expiresIn: "7d",
        });
        const updatedUser: any = await User.findOneAndUpdate(
          { _id: user._id },
          {
            $set: { jwt: token },
          },
          {
            new: true,
          }
        );

        return res.status(200).json({
          status: true,
          data: updatedUser.jwt,
          message: "User logged in successfully",
        });
      } else {
        return res.status(401).json({
          status: false,
          message: "Invalid email or password",
        });
      }
    }
  } catch (error: any) {
    res.status(400).json({
      status: false,
      error: error.message,
    });
  }
};
