import { deleteRefreshTokenByUserId } from "../repositories/refreshTokenRepo.js";
import { deleteAllUsers, deleteUser, findUserByEmail, findUserByUsername, getAllUsers, updateUser } from "../repositories/userRepo.js";
import { generateAccessAndRefreshTokens } from "../services/jwt.js";



// Get Logged in user controller
export async function getLoggedInUserController(req , res){
    try {
        const user = await findUserByUsername(req.user.username);
        res.status(200).json({message : "user fetched successfully" , user});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

// Get user controller
export async function getUserController(req , res){
    try {
        const username  = req.params.username;
        const user = await findUserByUsername(username);
        if(!user) return res.status(404).json({message : "User not found"});
        res.status(200).json({message : "user fetched successfully" , user});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

// Get all users controller
export async function getAllUsersController(req , res){
    try {
        const users = await getAllUsers();
        res.status(200).json({message : "users fetched successfully" , users});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

// Delete all users controller
export async function deleteAllUsersController(req , res){
    try {
        await deleteAllUsers();
        res.status(200).json({message : "All users deleted successfully"});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

// Update user controller
export async function updateUserController(req , res) {
    try {
        const existingUsername = req.user.username;
        const { name , email , username } = req.body;
        if(!name || !email || !username ) return res.status(400).json({message : "All fields are required"});

        const usernameUser = await findUserByUsername(username);
        if(usernameUser && usernameUser.username !== req.user.username) return res.status(400).json({message : "Username already exists"});

        const emailUser = await findUserByEmail(email);
        if(emailUser && emailUser.id !== req.user.id) return res.status(400).json({message : "Email already exists"});

        const updatedUser = await updateUser(existingUsername , {name , email , username });
        updatedUser.password = undefined;

        const tokens = await generateAccessAndRefreshTokens(updateUser.id);

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
        const username = req.user.username;
        await deleteUser(username);
        await deleteRefreshTokenByUserId(req.user.id);
        res.status(200).json({message : "User deleted successfully"});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}