import { Router } from "express";
import { deleteUserController,  getLoggedInUserController, getUserController, updateUserController } from "../Controllers/userControllers.js";

const userRouter = Router();


// Update user 
userRouter.put("/", updateUserController)

// Delete user 
userRouter.delete("/", deleteUserController)

// Get logged in user
userRouter.get("/me", getLoggedInUserController)

// Get user by Username
userRouter.get("/:id", getUserController)


export default userRouter;
