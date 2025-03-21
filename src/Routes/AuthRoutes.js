import { Router } from "express";
import passport from "passport";
import "../Auth/localStratergy.js";
import {
  loginController,
  registerController,
} from "../Controllers/AuthControllers.js";

// Express router for Authentication
const authRouter = Router();

// Login Route
authRouter.post(
  "/auth/login",
  passport.authenticate("local", { session: false }),
  loginController
);

authRouter.post("/auth/register", registerController);

export default authRouter;
