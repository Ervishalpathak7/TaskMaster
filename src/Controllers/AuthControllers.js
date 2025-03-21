import { GenerateJwtToken } from "../services/jwt.js";

export async function loginController(req , res) {
    try {
        let user = req.user;
        if(!user) throw new Error("authentication failed");
        const token = await GenerateJwtToken(user);
        res.json(token);
    } catch (error) {
        res.status(401).json({message : error.message});
    }
}

export function registerController(req , res) {
    res.send('register route')
}