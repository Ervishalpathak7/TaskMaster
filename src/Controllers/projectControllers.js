import { getprojectInfo, removeProject, saveProject, updateProject } from "../repositories/projectRepo.js";

export async function createProjectController(req, res){
    try {
        const { name } = req.body;
        const description = req.body ? "" : "";
        if(!name) throw new Error("missing project details");
        const userId = req.user.id;
        const project = await saveProject(name , description, userId);
        res.status(201).json({message : "Project Created Successfully", project })
    } catch (error) {
        res.status(401).json({message : error.message})
    }
}

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