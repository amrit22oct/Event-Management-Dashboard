import React, { useEffect, useState } from "react";
import API from "../services/api";
import socket from "../socket";
import EventCard from "../components/EventCard";
import { Toaster, toast } from "react-hot-toast";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await API.get("/events");
      setEvents(res.data);

      res.data.forEach((event) => {
        socket.emit("joinEventRoom", event._id);
      });
    } catch (err) {
      console.error("Failed to fetch events", err);
      toast.error("Error fetching events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();

    socket.on("registrationUpdated", fetchEvents);

    
    socket.on("newEvent", (event) => {
      toast.success(` New Event Added: ${event.title}`);
      fetchEvents(); 
    });

    return () => {
      socket.off("registrationUpdated", fetchEvents);
      socket.off("newEvent");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">
          🚀 Upcoming Events
        </h2>

        {loading ? (
          <p className="text-center text-gray-400 text-lg">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No events available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
  <EventCard key={event._id} event={event} showRegisterButton={true} />

))}

          </div>
        )}
      </div>
    </div>
  );
}
