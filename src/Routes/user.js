import { Router } from "express";
import { deleteUserController, getUserController, updateUserController } from "../Controllers/userControllers.js";

const userRouter = Router();

// Get user by Id
userRouter.get("/:username", getUserController)

// Update user by Id
userRouter.put("/", updateUserController)

// Delete user by Id
userRouter.delete("/", deleteUserController)

export default userRouter;
