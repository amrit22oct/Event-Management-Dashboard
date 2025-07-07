import React, { useEffect, useState, useContext } from "react";
import API from "../services/api";
import socket from "../socket";
import EventCard from "../components/EventCard";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchEvents = async () => {
    try {
      const { data } = await API.get("/events");
      setEvents(data);
    } catch (err) {
      toast.error("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
    socket.on("registrationUpdated", fetchEvents);

    return () => {
      socket.off("registrationUpdated", fetchEvents);
    };
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        🎯 Your Dashboard Events
      </h2>
      {events.length === 0 ? (
        <p className="text-gray-500 text-center">No events created yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              user={user}
              onDelete={fetchEvents}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
