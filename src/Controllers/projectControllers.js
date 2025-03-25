import { deleteAllProjects, getAllProjects, getLoggedInUserProjects, getprojectInfo, removeProject, saveProject, updateProject } from "../repositories/projectRepo.js";

// Create project
export async function createProjectController(req, res){
    try {
        const { name , description} = req.body;
        if(!name || !description) throw new Error("missing project details");
        const userId = req.user.id;
        const project = await saveProject(name, description, userId);
        res.status(201).json({message : "Project Created Successfully", project })
    } catch (error) {
        res.status(401).json({message : error.message})
    }
}

// Delete project
export async function deleteProjectController(req , res){
    try {
        const projectId  = Number(req.params.id);
        if(!projectId) throw new Error("missing projectId");
        const userId = req.user.id;
        await removeProject(projectId , userId);
        res.status(200).json({message : "project deleted successfully"});
    } catch (error) {
        res.status(401).json({message : error.message})
    }
}

// Get project by id
export async function getProjectController(req , res){
    try {
        const projectId  = Number(req.params.id);
        if(!projectId) throw new Error ("missing project details");
        const userId = req.user.id;
        const project = await getprojectInfo(projectId , userId);
        res.status(200).json({project});
    } catch (error){
        res.status(201).json({message : error.message})
    }
}

// Update project
export async function updateProjectController(req , res){
    try {
        const projectId = Number(req.params.id);
        const { name , description } = req.body;
        if(!name || !description) throw new Error("missing project details");
        const userId = req.user.id;
        const project = await updateProject(projectId ,name , description, userId);
        res.status(201).json({message : "Project Updated Successfully", project })
    } catch (error) {
        res.status(401).json({message : error.message})
    }
}

// Get all project of logged in user
export async function getLoggedInUserProjectController(req , res){
    try {
        const userId = req.user.id;
        const projects = await getLoggedInUserProjects(userId);
        res.status(200).json({message : "projects fetched successfully" , projects});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

// Get all projects
export async function getAllProjectController(req , res){
    try {
        const projects = await getAllProjects();
        res.status(200).json({message : "projects fetched successfully" , projects});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

// delete all projects
export async function deleteAllProjectsController(req , res){
    try {
        await deleteAllProjects();
        res.status(200).json({message : "All projects deleted successfully"});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}
