import { deleteRefreshTokenByUserId } from "../repositories/refreshTokenRepo.js";
import { deleteAllUsers, deleteUser, findUserByEmail, findUserByUsername, getAllUsers, updateUser } from "../repositories/userRepo.js";
import userRepo from "../repo/userRepo.js";
import { generateAccessAndRefreshTokens } from "../services/jwt.js";


// Get Logged in user controller
export async function getLoggedInUserController(req , res){
    try {
        const user = await userRepo.getUserById(req.user.id);
        res.status(200).json({message : "user fetched successfully" , user});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

// Get user controller
export async function getUserController(req , res){
    try {
        const id  = req.params.id;
        const user = await userRepo.getUserById(id);
        if(!user) return res.status(404).json({message : "User not found"});
        res.status(200).json({message : "user fetched successfully" , user});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}


// Update user controller
export async function updateUserController(req , res) {
    try {
        const userId = req.user.id;
        const { name , email } = req.body;
        if(!name || !email ) return res.status(400).json({message : "All fields are required"});

        const updatedUser = await userRepo.updateUser(userId , { name , email });
        const tokens = await generateAccessAndRefreshTokens(updatedUser.id);

        res.status(200).json({ 
            message: "User updated successfully", 
            user : updatedUser ,
            tokens 
        });
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

// Delete user controller
export async function deleteUserController(req , res) { 
    try {
        const userId = req.user.id;
        await userRepo.deleteUser(userId);
        await deleteRefreshTokenByUserId(userId);
        res.status(200).json({message : "User deleted successfully"});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}