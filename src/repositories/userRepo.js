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

export async function saveUser(name, email, password) {
    try {
        return await prismaClient.user.create({
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
        return await prismaClient.user.deleteMany();
    } catch (error) {
        console.error("Error deleting all users:", error);
        throw error;
    }
}