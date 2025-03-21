import { Router } from "express";
import passport from "passport";
import "../services/auth.js";
import { loginController } from "../Controllers/AuthControllers.js";

// Express router for Authentication
const authRouter = Router();

// Login Route
authRouter.post(
  "/auth/login",
  passport.authenticate("local", {
    session: false,
  }),
  loginController
);

export default authRouter;
