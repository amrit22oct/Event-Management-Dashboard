import express from "express";
import { registerForEvent } from "../controllers/registrationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:eventId", protect, registerForEvent);

export default router;
