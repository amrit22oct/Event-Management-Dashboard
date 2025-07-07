import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, organizerId: req.user.id });
    res.status(201).json(event);
  } catch {
    res.status(500).json({ error: "Failed to create event" });
  }
};

export const getEvents = async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
};

export const deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
};
