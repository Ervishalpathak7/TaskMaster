import { Router } from "express";
import "../Auth/localStratergy.js";
import {
  loginController,
  refreshTokenController,
  registerController,
} from "../Controllers/authControllers.js";

// Express router for Authentication
const authRouter = Router();

// Login Route
authRouter.post("/login",loginController);

// Register Route
authRouter.post("/register", registerController);

// Refresh Token Route
authRouter.post("/refresh", refreshTokenController)

export default authRouter;
