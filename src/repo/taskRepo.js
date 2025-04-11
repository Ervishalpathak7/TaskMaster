import Task from "../models/taskSchema.js";


const createTask = async (userId , task) => { 
    try {
    // Check if userId is provided
    if(!userId) throw new Error("Please provide an userId");

    // Check if task is provided
    if(!task) throw new Error("Please provide a task");

    // Create a new task
    const newTask = await Task.create({
        title: task.title,
        description: task.description,
        status: task.status,
        createdBy: userId
    });

    return newTask;
        
    } catch (error) {
        console.error(`Error creating task: ${error.message}`);
        throw new Error(error.message);
    }
}

const removeTask = async (userId , taskId) => {

    try {
        // Check if userId is provided
        if(!userId) throw new Error("Please provide an userId");

        // Check if taskId is provided
        if(!taskId) throw new Error("Please provide a taskId");

        // Delete the task
        const deletedTask = await Task.findOneAndDelete({ _id: taskId, createdBy: userId });
        if (!deletedTask) throw new Error("Task not found ");

        return deletedTask;
        
    } catch (error) {
        console.error(`Error deleting task: ${error.message}`);
        throw new Error(error.message);
    }
}

const getTaskInfo = async (userId , taskId) => {
    try {
        // Check if userId is provided
        if(!userId) throw new Error("Please provide an userId");

        // Check if taskId is provided
        if(!taskId) throw new Error("Please provide a taskId");

        // Get the task info
        const task = await Task.findOne({ _id: taskId, createdBy: userId });
        if (!task) throw new Error("Task not found ");

        return task;
        
    } catch (error) {
        console.error(`Error getting task info: ${error.message}`);
        throw new Error(error.message);
    }
}

const updateTask = async (userId , taskId , task) => {
    try {
        // Check if userId is provided
        if(!userId) throw new Error("Please provide an userId");

        // Check if taskId is provided
        if(!taskId) throw new Error("Please provide a taskId");

        // Check if task is provided
        if(!task) throw new Error("Please provide a task");

        // Update the task
        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, createdBy: userId },
            { $set: task },
            { new: true }
        );
        if (!updatedTask) throw new Error("Task not found ");

        return updatedTask;
        
    } catch (error) {
        console.error(`Error updating task: ${error.message}`);
        throw new Error(error.message);
    }
}

const getLoggedInUserProjects = async (userId) => {
    try {
        // Check if userId is provided
        if(!userId) throw new Error("Please provide an userId");

        // Get all projects of the logged in user
        const projects = await Task.find({ createdBy: userId });
        if (!projects) throw new Error("No projects found for this user");

        return projects;
        
    } catch (error) {
        console.error(`Error getting logged in user projects: ${error.message}`);
        throw new Error(error.message);
    }
}

const taskRepo = {
    createTask,
    removeTask,
    getTaskInfo,
    updateTask,
    getLoggedInUserProjects
}

export default taskRepo;