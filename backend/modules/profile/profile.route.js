import express from "express"
import * as profileController from "./profile.controller.js"
import * as authMiddleware from "../middleware/auth.middleware.js"

const router = express.Router();

router.get("/", authMiddleware.authentication,  profileController.getProfile);

export default router;