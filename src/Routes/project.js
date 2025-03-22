import { Router } from "express";
import { createProjectController, deleteProjectController, getProjectController, updateProjectController } from "../Controllers/projectControllers.js";

const projectRouter = Router();

projectRouter.get('/projects/:id' , getProjectController)
projectRouter.post('/projects' , createProjectController)
projectRouter.patch('/projects/:id' , updateProjectController)
projectRouter.delete('/projects/:id' , deleteProjectController)



export default projectRouter;
