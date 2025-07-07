import React from "react";
import { useEffect, useState } from "react";
import API from "../services/api";
import socket from "../socket";
import EventCard from "../components/EventCard";

function Dashboard() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const { data } = await API.get("/events");
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
    socket.on("registrationUpdated", fetchEvents);

    return () => {
      socket.off("registrationUpdated", fetchEvents);
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Dashboard Events</h2>
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

export default Dashboard;
