import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import "dotenv/config";
import User from "../models/user.model";

const clientID = process.env.GOOGLE_CLIENT_ID ?? "";
const clientSecret = process.env.GOOGLE_CLIENT_SECRET ?? "";

export const passportInitialize = () => {
  passport.use(
    new Strategy(
      {
        clientID,
        clientSecret,
        callbackURL: "/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        const email = profile._json.email;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
          const data = {
            firstName: profile._json.given_name,
            lastName: profile._json.family_name,
            email: profile._json.email,
            picture: profile._json.picture,
          };
          const user = await User.create(data);
          done(null, profile);
        } else {
          done(null, profile);
        }
      }
    )
  );
  passport.serializeUser((user: object, done: any) => {
    done(null, user);
  });

  passport.deserializeUser((user: object, done: any) => {
    done(null, user);
  });
};
