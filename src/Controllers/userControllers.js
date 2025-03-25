import { findUserByUsername } from "../repositories/userRepo.js";

export async function getUserController(req , res){
    try {
        const username  = req.params.username;
        const user = await findUserByUsername(username);
        if(!user) return res.status(404).json({message : "User not found"});
        user.password = undefined;
        res.status(200).json({message : "user fetched successfullu" , user});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}
