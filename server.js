const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173",
    methods: ["GET", "POST"] } });

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Session identity: store username
  socket.on("join", (username) => {
    socket.username = username;
    console.log(`${username} joined`);
  });

  socket.on("joinRoom", (room, username) => {
    socket.username = username;
    console.log(`${username} joined room ${room}`);
  });

  // Chat messages with identity
  socket.on("chatMessage", (payload) => {
    const username = socket.username || payload.username || "Unknown";
    io.emit("message", { username, text: payload.text });
  });

  // Typing indicator
  socket.on("typing", (user) => {
    socket.broadcast.emit("typing", user);
  });
});


server.listen(3000, () => console.log("Server running on http://localhost:3000"));
