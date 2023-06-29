import { NextFunction, Router, Response, Request } from "express";
const router = Router();
import passport from "passport";
import userRouter from "./user.route";
import "dotenv/config";
import { passportInitialize } from "../middlewares/passport.middleware";
import jwt from "jsonwebtoken";

passportInitialize();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/login/failed", (req: Request, res: Response) => {
  res.status(401).json({
    status: false,
    message: "Unauthorized User",
  });
});

router.get(
  "/auth/google/callback",
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", (err: any, user: any) => {
      if (err) {
        res.redirect("/login/failed");
        next(err);
      }
      const secretKey: string = process.env.JWT_SECRET_KEY ?? "";
      const jwtToken = jwt.sign({ email: user["_json"].email }, secretKey, {
        expiresIn: "7d",
      });
      res.cookie("jwtToken", jwtToken);
      res.redirect(process.env.FRONT_END_URL + "/dashboard");
    })(req, res, next);
  }
);

router.use("/users", userRouter);

export default router;
