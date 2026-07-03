// src/socket.js
import { io } from "socket.io-client";

// Connect to your backend server
const socket = io("https://real-time-chat-application-7o0s.onrender.com", {
  transports: ["websocket"], // ensures WebSocket is used
  reconnection: true,        // auto-reconnect if connection drops
});

export default socket;
