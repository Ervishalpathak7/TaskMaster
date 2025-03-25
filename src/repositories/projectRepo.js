import prismaClient from "../prisma/client.js";
import { saveProjectInfo } from "./userRepo.js";


// Fetch all projects
export async function getAllProjects(){
    try {
        return await prismaClient.project.findMany();
    } catch (error) {
        console.error("error fetching projects" , error)
        throw error;
    }
}

// Create project
export async function saveProject(projectName , projectDes, ownerId){
    try {
        const project = await prismaClient.project.create({
            data : {
                name : projectName,
                description : projectDes,
                ownerId : ownerId,
            }
        });

        await saveProjectInfo( ownerId , project.id);
        return project;
    } catch (error) {
        console.error("Error creating project" , error)
        throw error;
    }
}


// Delete project
export async function removeProject(projectId, ownerId) {
    try {
        const project = await prismaClient.projects.findFirst({
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


// Get project by id
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

// Update project
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

// Get all projects of logged in user
export async function getLoggedInUserProjects(userId){
    try {
        // Get all projects of logged in user
        const user = await prismaClient.user.findUnique({
            where : {
                id : userId
            },
            include : {
                projects : true
            }
        });
        const projects = user.projects;
        return projects;

    } catch (error) {
        console.error("error getting logged in user projects" , error)
        throw error
    }
}

// delete all projects
export async function deleteAllProjects(){
    try {
        await prismaClient.project.deleteMany();
    } catch (error) {
        console.error("error deleting projects" , error)
        throw error;
    }
}