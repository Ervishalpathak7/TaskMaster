import { Router } from "express";

const userRouter = Router();

// Get user by Id
userRouter.get("/:id", (req, res) => {
    res.send("User get Route");
})

// Update user by Id
userRouter.put("/:id", (req, res) => { 
    res.send("User update Route");
})

// Delete user by Id
userRouter.delete("/:id", (req, res) => {
    res.send("User delete Route");
})

export default userRouter;
