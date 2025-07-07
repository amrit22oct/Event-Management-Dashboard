import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Client connected");

    socket.on("joinEventRoom", (eventId) => {
      socket.join(eventId);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected");
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error("❗ Socket.IO not initialized");
  return io;
};
