import { Router } from "express";
import { addUser, processLogin } from "../controller/user.controller";

const router = Router();

router.post("/register", addUser);
router.post("/login", processLogin);

export default router;
