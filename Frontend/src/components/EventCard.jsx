import React from "react";
import API from "../services/api";
import { toast } from "react-hot-toast";

function EventCard({ event, showRegisterButton = true, user, onDelete }) {
  const isOwner = user && user.role === "organizer" && user._id === event.organizer;

  const register = async () => {
    try {
      await API.post(`/registrations/${event._id}`);
      toast.success("✅ Registered successfully!");
    } catch (err) {
      toast.error(err.response?.data?.error || "❌ Failed to register");
    }
  };

  const deleteEvent = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await API.delete(`/events/${event._id}`);
        toast.success("🗑️ Event deleted");
        onDelete?.(); // refresh event list
      } catch (err) {
        toast.error(err.response?.data?.error || "❌ Failed to delete event");
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300 mb-6">
      <h3 className="text-xl font-semibold text-indigo-700 mb-2">{event.title}</h3>
      <p className="text-gray-700 mb-4">{event.description}</p>

      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <span>📍 <strong>Location:</strong> {event.location}</span>
        <span>📅 <strong>Date:</strong> {new Date(event.date).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
          Capacity: {event.capacity}
        </span>

        {isOwner ? (
          <button
            onClick={deleteEvent}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Delete
          </button>
        ) : showRegisterButton ? (
          <button
            onClick={register}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
          >
            Register
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default EventCard;
