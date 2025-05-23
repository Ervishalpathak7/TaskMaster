import prismaClient from "../prisma/client.js";

async function validateProjectOwnership(userId, projectId) {
    const project = await prismaClient.project.findFirst({
        where: {
            id: projectId,
            users: {
                some: {
                    id: userId
                }
            }
        }
    });
    if (!project) throw new Error("Project not found or access denied");
    return project;
}

export async function getTasks(userId, projectId) {
    try {
        await validateProjectOwnership(userId, projectId);
        return await prismaClient.task.findMany({
            where: {
                projectId
            }
        });
    } catch (error) {
        console.error("Error fetching tasks", error);
        throw error;
    }
}


export async function createTask(projectId, userId, name, description, deadline, assignees) {
    try {
        await validateProjectOwnership(userId, projectId);

        return await prismaClient.task.create({
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

        await prismaClient.task.findFirstOrThrow({
            where: {
                id: taskId,
                projectId
            }
        });

        return await prismaClient.task.delete({
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

        const task = await prismaClient.task.findFirst({
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
