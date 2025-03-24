import prismaClient from "../prisma/client.js";

async function validateProjectOwnership(userId, projectId) {
    const project = await prismaClient.project.findFirst({
        where: {
            id: projectId,
            ownerId: userId
        }
    });
    if (!project) throw new Error("Project not found or access denied");
    return project;
}

export async function createTask(projectId, userId, name, description, deadline, assignees) {
    try {
        await validateProjectOwnership(userId, projectId);

        return await prismaClient.tasks.create({
            data: {
                name,
                description,
                deadline,
                assignees,
                projectId
            }
        });
    } catch (error) {
        console.error("Error while creating task", error);
        throw error;
    }
}

export async function deleteTask(userId, projectId, taskId) {
    try {
        await validateProjectOwnership(userId, projectId);

        await prismaClient.tasks.findFirstOrThrow({
            where: {
                id: taskId,
                projectId
            }
        });

        return await prismaClient.tasks.delete({
            where: {
                id: taskId
            }
        });
    } catch (error) {
        console.error("Error deleting task", error);
        throw error;
    }
}

export async function getTask(userId, projectId, taskId) {
    try {
        await validateProjectOwnership(userId, projectId);

        const task = await prismaClient.tasks.findFirst({
            where: {
                id: taskId,
                projectId
            }
        });

        if (!task) throw new Error("Task not found");

        return task;
    } catch (error) {
        console.error("Error fetching task", error);
        throw error;
    }
}
