import mongoose, { Document } from "mongoose";

interface UserInterface extends Document {
  fullName: string;
  email: string;
  password: string;
  roles: string;
  resetPasswordToken: string;
  jwt: string;
  fcm: string;
  resetPasswordExpire: Date;
  enrolledCourse: mongoose.Schema.Types.ObjectId[];
  matchPassword(password: string): Promise<boolean>; // Define matchPassword method
}

export default UserInterface;
