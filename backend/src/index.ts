import express, { urlencoded, Request, Response, NextFunction } from "express";
import { dbConnection } from "./config/db.config";
import passport from "passport";
import IndexRouter from "./routes/index";
import ExpressMongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import helmet from "helmet";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT;

app.use(
  require("express-session")({
    secret: "Secret@321",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.listen(PORT, () => {
  console.log("App is running on Port " + PORT);
});
dbConnection();
app.use(morgan("tiny"));
app.use(hpp());
app.use(ExpressMongoSanitize());
app.use(helmet());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(IndexRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error: Error & { status?: number } & { message: String } = new Error();
  error.status = 404;
  error.message = "Page Not Found";
  next(error);
});

//Error handler middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json({
    status: false,
    error: error.message,
  });
});
