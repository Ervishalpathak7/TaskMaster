import { deleteAll, findUserByEmail, getAllUsers, saveUser } from "../repositories/userRepo.js";
import { generateAccessAndRefreshTokens } from "../services/jwt.js";
import passport from "passport";
import { validateEmail } from "../utils/validateEmail.js";
import bcrypt from "bcryptjs";
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
        const accessToken = generateAcessToken(user);
        const refreshToekn = generateRefereshToken(user);

        return res.json({ 
            message: "User logged in successfully", 
            "access-token ": accessToken ,
            "refresh-token" : refreshToekn 
        });
    }
    )(req, res, next);
}

// register controller
export async function registerController(req , res){
    try {

        const { name , email , password} = req.body;
        if(!name || !email || !password) throw new Error("Invalid user data");

        if(!validateEmail(email)) return res.status(400).json({message : "Invalid Email"});

        const existingUser = await findUserByEmail(email);
        if(existingUser) return res.status(400).json({message : "Email Already Exist"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await saveUser(name , email , hashedPassword);
        const tokens = await generateAccessAndRefreshTokens(user.id);

        res.json({ 
            message: "User registered successfully", 
            user: 
                { id: user.id, name: user.name, email: user.email },
            tokens 
        });

    } catch (error) {
        res.status(401).json({message: error.message});
    }
}