import Registration from "../models/Registration.js";
import Event from "../models/Event.js";
import { getIO } from "../socket.js"; 


// reginstering the user for the event 
export const registerForEvent = async (req, res) => {
  const userId = req.user.id;
  const { eventId } = req.params;

  const alreadyRegistered = await Registration.findOne({ userId, eventId });
  if (alreadyRegistered) return res.status(400).json({ error: "Already registered" });

  const event = await Event.findById(eventId);
  const count = await Registration.countDocuments({ eventId });

  if (count >= event.capacity)
    return res.status(400).json({ error: "Event full" });

  const registration = await Registration.create({ userId, eventId });

  
  const io = getIO();
  io.to(eventId).emit("registrationUpdated", { eventId });

  res.status(201).json(registration);
};
