import { generateAccessAndRefreshTokens, validateRefreshToken } from "../services/jwt.js";
import passport from "passport";
import "../Auth/localStratergy.js"
import { deleteRefreshToken } from "../repositories/refreshTokenRepo.js";
import userRepo from "../repo/userRepo.js";


// login controller
export async function loginController(req, res, next) {
   try {
     passport.authenticate('local', async (err, user, info) => {
         if (err) {
             return res.status(500).json({ message: err.message });
         }
         if (!user) {
             return res.status(401).json({ message: info ? info.message : "Authentication failed" });
         }
         const tokens = await generateAccessAndRefreshTokens(user.id);
         return res.json({ 
             message: "User logged in successfully", 
             user,
             tokens
         });
     }
     )(req, res, next);
   } catch (error) {
    res.status(500).json({message : error.message})
   }
}

// register controller
export async function registerController(req , res){
    try {
        // Check the user details
        const { name , email , password} = req.body;
        if(!name || !email || !password ) throw new Error("Invalid user data");

        // Create new user
        const newUser = await userRepo.createUser( name, email, password );

        const tokens = await generateAccessAndRefreshTokens(newUser.id);
        res.json({ 
            message: "User registered successfully", 
            user: newUser,
            tokens 
        });

    } catch (error) {
        res.status(401).json({message: error.message});
    }
}

// refresh token controller 
export async function refreshTokenController( req , res ){
    try {
        const { refreshToken } = req.body;
        const user = await validateRefreshToken(refreshToken);
        if(!user) return res.status(401).json({message : "unauthorized"});
        const tokens = await generateAccessAndRefreshTokens(user.id);
        res.status(200).json({message : "access-tokens generated successfully" ,tokens});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// logout Controller 
export async function logoutController(req , res){ 
    try {
        const token = req.headers.authorization.split(" ")[1];
        await deleteRefreshToken(token);
        res.status(200).json({message : "User logged out successfully"});

    } catch (error) {
        res.status(500).json({message : error.message})
    }
} 