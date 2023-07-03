import { Router } from "express";
import { createCourses } from "../controller/course.controller";
import { AuthenticateUser } from "../middlewares/Authorization.middleware";
import { authorize } from "../middlewares/CheckRole.middleware";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.post(
  "/create",
  AuthenticateUser,
  authorize("admin", "instructor"),
  upload.single("photo"),
  createCourses
);

export default router;
