import { deleteUser, findUserByEmail, findUserByUsername, updateUser } from "../repositories/userRepo.js";


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

export async function updateUserController(req , res) {
    try {
        const existingUsername = req.user.username;
        const { name , email , username , password } = req.body;
        if(!name || !email || !username || !password) return res.status(400).json({message : "All fields are required"});

        const usernameUser = await findUserByUsername(username);
        if(usernameUser && usernameUser.username !== req.user.username) return res.status(400).json({message : "Username already exists"});
        const emailUser = await findUserByEmail(email);
        if(emailUser && emailUser.id !== req.user.id) return res.status(400).json({message : "Email already exists"});

        const updatedUser = await updateUser(existingUsername , {name , email , username , password});
        updatedUser.password = undefined;
        const tokens = await generateAccessAndRefreshTokens(updatedUser);
        res.status(200).json({ 
            message: "User updated successfully", 
            user: 
                { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email },
            tokens 
        });
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

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