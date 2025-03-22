import { Router } from "express";
import passport from "passport";
import "../Auth/localStratergy.js";
import {
  loginController,
  registerController,
} from "../Controllers/authControllers.js";

// Express router for Authentication
const authRouter = Router();

// Login Route
authRouter.post("/login",loginController);

// Register Route
authRouter.post("/register", registerController);

export default authRouter;
