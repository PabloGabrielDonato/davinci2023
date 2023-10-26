import { Router } from "express";
import * as ProjectController from "../../controllers/api/project.controller.js";

const projectApiRouter = Router();

projectApiRouter.get('/', ProjectController.getAllProjects)
projectApiRouter.get("/detail/:id", ProjectController.detailProject);
projectApiRouter.get("/:section", ProjectController.getAllProjectsBySection);
projectApiRouter.post("/", ProjectController.storeProject);
projectApiRouter.put("/:id", ProjectController.modifyProject);
projectApiRouter.delete("/:id", ProjectController.removeProject);

export {projectApiRouter}