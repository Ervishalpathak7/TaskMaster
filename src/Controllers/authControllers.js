import { findUserByEmail, saveUser } from "../repositories/userRepo.js";
import { GenerateJwtToken } from "../services/jwt.js";
import {hashPassword} from "../services/bcrypt.js"
import passport from "passport";
import "../Auth/localStratergy.js"


// login controller
export async function loginController(req, res, next) {
    passport.authenticate('local', async (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        if (!user) {
            return res.status(401).json({ message: info ? info.message : "Authentication failed" });
        }

        // Generate JWT Token
        const token = GenerateJwtToken(user);

        return res.json({ message: "User logged in successfully", token });
    }
    )(req, res, next);
}

// register controller
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