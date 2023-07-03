import mongoose from "mongoose";
import UserInterface from "../interface/user.interface";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema<UserInterface>(
  {
    firstName: {
      type: String,
      minLength: [5, "Minimum length for full name should be 5"],
      required: [true, "User Must enter First Name"],
    },
    lastName: {
      type: String,
      minLength: [5, "Minimum length for full name should be 5"],
      required: [true, "User Must enter Last Name"],
    },
    email: {
      type: String,
      required: [true, "Email is a required field"],
      unique: true,
    },
    password: {
      type: String,
    },
    roles: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    enrolledCourse: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
      ],
    },
    jwt: {
      type: String,
    },
    fcm: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (this.password) {
    const saltRound: any = Number(process.env.BCRYPT_SALT_ROUND);
    const salt = await bcrypt.genSalt(saltRound);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods.matchPassword = async function (pass: any) {
  return await bcrypt.compare(pass, this.password);
};

const User = mongoose.model<UserInterface>("User", userSchema);

export default User;
