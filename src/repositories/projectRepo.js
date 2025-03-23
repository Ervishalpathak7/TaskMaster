import prismaClient from "../prisma/client.js";


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