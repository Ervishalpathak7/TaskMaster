import prismaClient from "../prisma/client.js";

// Find user by email
export async function findUserByEmail(email) {
    try {
        return await prismaClient.user.findUnique({
            where: {
                email: email
            },
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
            },
            select: {
                email: true,
                id: true,
                name: true,
                username: true
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

export async function updateUser(username, data) {
    try {
        return await prismaClient.user.update({
            where: {
                username: username
            },
            data : {
                name: data.name,
                email: data.email,
                username: data.username
            } , 
            select: {
                email: true,
                id: true,
                name: true,
                username: true
            }
        });
    } catch (error) {
        console.error("Error updating user", error);
        throw error;
    }
}

export async function deleteUser(username) {
    try {
        const user = await prismaClient.user.findUnique({
            where: {
                username: username
            }
        });

        if (!user) throw new Error("User not found");
        return await prismaClient.user.delete({
            where: {
                username: username
            }
        });
        
    } catch (error) {
        console.error("Error deleting user", error);
        throw error;
    }
}

// Get all users
export async function getAllUsers() {
    try {
        return await prismaClient.user.findMany({
            select: {
                email: true,
                id: true,
                name: true,
                username: true
            }
        });
    } catch (error) {
        console.error("Error getting all users", error);
        throw error;
    }
}

// delete all users
export async function deleteAllUsers() {
    try {
        return await prismaClient.user.deleteMany();
    } catch (error) {
        console.error("Error deleting all users", error);
        throw error;
    }
}

// save projectInfo in user table
export async function saveProjectInfo(userId, projectId) {
    try {
        await prismaClient.user.update({
            where: {
                id: userId
            },
            data: {
                projects: {
                    connect: {
                        id: projectId
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error saving project info", error);
        throw error;
    }
}