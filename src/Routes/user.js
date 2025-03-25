import { Router } from "express";
import { getUserController } from "../Controllers/userControllers.js";

const userRouter = Router();

// Get user by Id
userRouter.get("/:username", getUserController)

// Update user by Id
userRouter.put("/:id", (req, res) => { 
    res.send("User update Route");
})

// Delete user by Id
userRouter.delete("/:id", (req, res) => {
    res.send("User delete Route");
})

export default userRouter;
