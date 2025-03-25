import prismaClient from "../prisma/client.js";

export async function findUserByEmail(email) {
    try {
        return await prismaClient.user.findUnique({
            where: {
                email: email
            }
        });
    } catch (error){
        console.error("error finding user", error);
        throw error;
        
    }
}

export async function findUserByID(userId){
    try {
        return await prismaClient.user.findUnique({
            where : {
                id : userId
            }
        })
    } catch (error) {
        console.error("error while finding user by id " , error)
        throw error;
    }
}

export async function findUserByUsername(username){
    try {
        return await prismaClient.user.findUnique({
            where : {
                username : username
            }
        });
    } catch (error) {
        console.error("Error finding user by username:", error);
        throw error;
    }
}

export async function saveUser(name, email, username, password) {
    try {
        return await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                username : username,
                password: password,
            }
        });
    } catch (error) {
        console.error("error saving user " , error)
        throw error;
    }
}

export async function deleteAll() {
    try {
        return await prismaClient.user.deleteMany();
    } catch (error) {
        console.error("Error deleting all user:", error);
        throw error;
    }
}

export async function getAllUsers(){

    try {
        return await prismaClient.user.findMany();
    } catch (error) {
        console.error("Error fetching all user:", error);
        throw error;
    }    
}