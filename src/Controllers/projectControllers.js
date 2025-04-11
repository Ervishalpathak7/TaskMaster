import taskRepo from "../repo/taskRepo.js";

// Create project
export async function createProjectController(req, res){
    try {
        // Check the project details
        const { title , description , status } = req.body;
        if(!title || !description ) throw new Error("missing project details");

        const userId = req.user.id;
        const project = await taskRepo.createTask(userId , { title , description , status});

        res.status(201).json({message : "Project Created Successfully", project })
        
    } catch (error) {
        res.status(401).json({message : error.message})
    }
}

// Delete project
export async function deleteProjectController(req , res){
    try {
        const taskId  = req.params.id;
        if(!taskId) throw new Error("missing projectId");
        const userId = req.user.id;
        await taskRepo.removeTask(userId , taskId);
        res.status(200).json({message : "project deleted successfully"});
    } catch (error) {
        res.status(401).json({message : error.message})
    }
}

// Get project by id
export async function getProjectController(req , res){
    try {
        const taskId  = req.params.id;
        if(!taskId) throw new Error ("missing project details");
        const userId = req.user.id;
        const task = await taskRepo.getTaskInfo(userId , taskId);
        res.status(200).json({task});
    } catch (error){
        res.status(201).json({message : error.message})
    }
}

// Update project
export async function updateProjectController(req , res){
    try {
        const taskId = req.params.id;
        const { title , description , status } = req.body;
        if(!title || !description) throw new Error("missing project details");
        const userId = req.user.id;
        const project = await taskRepo.updateTask(userId , taskId , { title , description, status });
        res.status(201).json({message : "Project Updated Successfully", project })
    } catch (error) {
        res.status(401).json({message : error.message})
    }
}

// Get all project of logged in user
export async function getLoggedInUserProjectController(req , res){
    try {
        const userId = req.user.id;
        const projects = await taskRepo.getLoggedInUserProjects(userId);
        res.status(200).json({message : "projects fetched successfully" , projects});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}
