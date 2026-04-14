import express from "express"
import * as middleware from "../middleware/auth.middleware.js"
import * as tasksController from "./tasks.controller.js"

const router = express.Router();

router.get("/", middleware.authentication, tasksController.getAllTasks);

router.get("/:id", middleware.authentication, tasksController.getTask);

router.post("/", middleware.authentication, tasksController.addTask);
router.put("/:id", middleware.authentication, tasksController.updateTask);
router.delete("/:id", middleware.authentication, tasksController.deleteTask);

export default router;