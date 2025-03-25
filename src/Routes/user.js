import { Router } from "express";
import { deleteAllUsersController, deleteUserController, getAllUsersController, getLoggedInUserController, getUserController, updateUserController } from "../Controllers/userControllers.js";

const userRouter = Router();


// Get all users
userRouter.get("/", getAllUsersController)

// Update user 
userRouter.put("/", updateUserController)

// Delete user 
userRouter.delete("/", deleteUserController)

// Get logged in user
userRouter.get("/me", getLoggedInUserController)

// Delete all users
userRouter.delete("/all", deleteAllUsersController)

// Get user by Username
userRouter.get("/:username", getUserController)


export default userRouter;
