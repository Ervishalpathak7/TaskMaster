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


const taskRepo = {
    createTask,
}

export default taskRepo;