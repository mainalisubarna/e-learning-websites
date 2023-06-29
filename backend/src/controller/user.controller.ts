import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

export const addUser = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    const { email, phoneNumber } = data;
    const existingUser = await User.findOne({
      $or: [{ phoneNumber }, { email }],
    });
    if (!existingUser) {
      const { password } = data;
      const saltRound: any = process.env.BCRYPT_SALT_ROUND;
      const salt = await bcrypt.genSalt(saltRound);
      data.password = await bcrypt.hash(password, salt);
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
    const { email } = req.body;
    const pass = req.body.password;
    const user = await User.findOne({ email });
    if (user) {
      const { password }: any = user;
      const isVerifiedUser = await bcrypt.compare(pass, password);
      if (isVerifiedUser) {
        const JWT_SECRET_KEY: any = process.env.JWT_SECRET_KEY;
        const jwtToken = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
          expiresIn: "7d",
        });
        const updatedUser: any = await User.findOneAndUpdate(
          { _id: user._id },
          {
            $set: { jwt: jwtToken },
          },
          {
            new: true,
          }
        );
        res.status(200).json({
          status: true,
          data: updatedUser.jwt,
          message: "User logged in successfully",
        });
      }
    } else {
      res.status(401).json({
        status: false,
        message: "Incorrect email or password",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
