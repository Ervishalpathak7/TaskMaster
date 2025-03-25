import { Router } from "express";
import { addUsersToProjectController, createProjectController, deleteProjectController, getAllProjectController, getLoggedInUserProjectController, getProjectController, updateProjectController } from "../Controllers/projectControllers.js";

const projectRouter = Router();


// Create project
projectRouter.post('/' , createProjectController);

// Get all project of logged in user
projectRouter.get('/me' , getLoggedInUserProjectController);

// Get all projects
projectRouter.get('/all' , getAllProjectController);

// Delete all projects
projectRouter.delete('/all' , deleteProjectController)

// Get project by id
projectRouter.get('/:id' , getProjectController);

// Update project
projectRouter.patch('/:id' , updateProjectController)

// Delete project
projectRouter.delete('/:id' , deleteProjectController)

// Add member to project
projectRouter.post('/:id/addMember' , addUsersToProjectController)


export default projectRouter;
