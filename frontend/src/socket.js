// src/socket.js
import { io } from "socket.io-client";

// Connect to your backend server
const socket = io("http://localhost:3000", {
  transports: ["websocket"], // ensures WebSocket is used
  reconnection: true,        // auto-reconnect if connection drops
});

export default socket;
