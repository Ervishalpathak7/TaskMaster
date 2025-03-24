import prismaClient from "../prisma/client.js";


export async function findUserByEmail(email) {
    try {
        return await prismaClient.users.findUnique({
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
        return await prismaClient.users.findUnique({
            where : {
                id : userId
            }
        })
    } catch (error) {
        console.error("error while finding user by id " , error)
        throw error;
    }
}

export async function saveUser(name, email, password) {
    try {
        return await prismaClient.users.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        });
    } catch (error) {
        console.error("error saving user " , error)
        throw error;
        
    }
}

export async function deleteAll() {
    try {
        return await prismaClient.users.deleteMany();
    } catch (error) {
        console.error("Error deleting all users:", error);
        throw error;
    }
}

export async function getAllUsers(){

    try {
        return await prismaClient.users.findMany();
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
    }    
}