import express from "express";
import { createEvent, getEvents, deleteEvent } from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

  router.get("/", getEvents);

  router.post("/", protect, requireRole("organizer"), createEvent);
  router.delete("/:id", protect, requireRole("organizer"), deleteEvent);

export default router;
