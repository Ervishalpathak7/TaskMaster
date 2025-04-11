import { Router } from "express";
import {createProjectController, deleteProjectController,  getLoggedInUserProjectController, getProjectController, updateProjectController } from "../Controllers/projectControllers.js";

const taskRouter = Router();


// Create project
taskRouter.post('/' , createProjectController);

// Get all project of logged in user
taskRouter.get('/me' , getLoggedInUserProjectController);

// Get project by id
taskRouter.get('/:id' , getProjectController);

// Update project
taskRouter.patch('/:id' , updateProjectController)

// Delete project
taskRouter.delete('/:id' , deleteProjectController)


export default taskRouter;
