import { findUserByEmail, saveUser } from "../services/database.js";
import { GenerateJwtToken } from "../services/jwt.js";
import {hashPassword} from "../services/bcrypt.js"

export async function loginController(req , res) {
    try {
        let user = req.user;
        if(!user) throw new Error("authentication failed");
        const token = GenerateJwtToken(user);
        res.json({message : "User logged in Successfully", token});
    } catch (error) {
        res.status(401).json({message : error.message});
    }
}

export async function registerController(req , res){
    try {
        const { name , email , password} = req.body;
        if(!name || !email || !password) throw new Error("Invalid user data");

        const existingUser = await findUserByEmail(email);
        if(existingUser) throw new Error("email already exist");

        const hashedPassword = await hashPassword(password)
        const user = await saveUser(name , email , hashedPassword);
        user.password = undefined;
        
        res.json({message : "User register Successfully", user});
    } catch (error) {
        res.status(401).json({message: error.message});
    }
}