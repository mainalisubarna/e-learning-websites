import { NextFunction, Router, Response, Request } from "express";
const router = Router();
import passport from "passport";
import userRouter from "./user.route";
import "dotenv/config";
import { passportInitialize } from "../middlewares/passport.middleware";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import courseRouter from "./course.route";
passportInitialize();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/auth/login/failed", (req: Request, res: Response) => {
  res.status(401).json({
    status: false,
    message: "Unauthorized User",
  });
});

router.get(
  "/auth/google/callback",
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", async (err: any, user: any) => {
      if (err) {
        res.redirect(process.env.FRONT_END_URL + "/auth/login/failed");
        next(err);
      }
      const userDetails: any = await User.findOne({ email: user._json.email });
      const secretKey: string = process.env.JWT_SECRET_KEY ?? "";
      const jwtToken = jwt.sign({ details: userDetails }, secretKey, {
        expiresIn: "7d",
      });
      res.cookie("jwtToken", jwtToken);
      res.cookie("role", userDetails.roles);
      res.redirect(process.env.FRONT_END_URL + "/dashboard");
    })(req, res, next);
  }
);

router.use("/users", userRouter);
router.use("/courses", courseRouter);

export default router;
