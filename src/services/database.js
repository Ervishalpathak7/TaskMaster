import prismaClient from "../prisma/client.js";


export async function findUsers() {
    return await prismaClient.user.findMany();
}

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

export async function saveProject(projectName , projectDes, ownerId){
    try {
        return await prismaClient.project.create({
            data : {
                name : projectName,
                description : projectDes,
                ownerId : ownerId,
            }
        })
    } catch (error) {
        console.error("Error creating project" , error)
        throw error;
    }
}

export async function removeProject(projectId, ownerId) {
    try {
        const project = await prismaClient.project.findFirst({
            where: {
                id: projectId,
                ownerId: ownerId
            }
        });
        if (!project) {
            throw new Error("Project not found or you do not have permission to delete it.");
        }

        return await prismaClient.project.delete({
            where: {
                id: projectId
            }
        });
    } catch (error) {
        console.error("error deleting project ", error);
        throw error;
    }
}

export async function getprojectInfo(projectId, ownerId){ 
    try {
        return await prismaClient.project.findFirst({
            where : {
                id : projectId,
                ownerId : ownerId
            }
        })
    } catch (error) {
        console.error("error getting project info" , error)
    } 
}

export async function updateProject(projectId ,name , description , ownerId){
    try {

        const project = await prismaClient.project.findFirst({
            where : {
                id : projectId,
                ownerId : ownerId
            }
        })

        if(!project) throw new Error("No project Found");

        return await prismaClient.project.update({
            where: {
                id: projectId,
                ownerId: ownerId
            },
            data: {
                name: name,
                description: description
            }
        });
    } catch (error){
        console.error("error updating project" , error) 
        throw error;
    }
}