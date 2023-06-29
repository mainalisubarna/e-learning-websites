import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import { NextFunction, Request, Response } from "express";
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "FIrst Name is a required field."],
    },
    lastName: {
      type: String,
      required: [true, "First Name is a required field."],
    },
    email: {
      type: String,
      required: [true, "Email is a required field."],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email must be valid"],
      unique: [true, "Email Must be unique"],
    },
    phoneNumber: {
      type: String,
      match: [/^(\+?977-?)?\d{10}$/, "Phone Number must be valid"],
      unique: [true, "Phone Number Must be unique"],
    },
    role: {
      type: String,
      default: "student",
      enum: ["student", "tutor"],
    },
    password: {
      type: String,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
      ],
    },
    enrolledCourses: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
      ],
    },
    picture: {
      type: String,
    },
    jwt: String,
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
    passwordExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// UserSchema.pre("save", (req: Request, res: Response, next: NextFunction) => {});

const User = mongoose.model("User", UserSchema);
export default User;
