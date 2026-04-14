import express from "express"
import * as UserController from './user.controller.js';

const router = express.Router();


//get full list of user
router.get("/", UserController.getUsers);

router.get("/:id", UserController.getUserByID);
router.post("/", UserController.createUser);
router.delete("/:id", UserController.deleteUser);
router.put("/:id", UserController.updateUser);

export default router;