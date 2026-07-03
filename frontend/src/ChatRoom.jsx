import React, { useState, useEffect } from "react";
import socket from "./socket";
import "./ChatRoom.css"; 

function ChatRoom() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (!joined || !username || !room) return;

    socket.emit("join", username);

    socket.off("message");
    socket.off("typing");

    socket.on("message", (data) => setChat((prev) => [...prev, data]));
    socket.on("typing", (user) => {
      setTyping(`${user} is typing...`);
      setTimeout(() => setTyping(""), 2000);
    });
  }, [joined, username, room]);

  const handleJoin = () => {
    if (username.trim() && room.trim()) {
      setJoined(true);
    }
  };

  const sendMessage = () => {
    if (msg.trim() !== "") {
      socket.emit("chatMessage", { username, text: msg });
      setMsg("");
    }
  };

  return (
    <div className="chat-container">
      {!joined ? (
        <div className="join-form">
          <h2>Join a Room</h2>
          <input
            value={username}
            placeholder="Enter your name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            value={room}
            placeholder="Enter room name (e.g., General)"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={handleJoin}>Join</button>
        </div>
      ) : (
        <div className="chat-box">
          <header className="chat-header">Room: {room}</header>
          <div className="chat-messages">
            {chat.map((c, i) => {
              const isObject = typeof c === "object" && c !== null;
              const messageUsername = isObject ? c.username : c.split("]: ")[0].replace("[", "");
              const messageText = isObject ? c.text : (c.split("]: ")[1] || "");
              const isSender = messageUsername === username;

              return (
                <div
                  key={i}
                  className={`chat-message ${isSender ? "sender" : "receiver"}`}
                >
                  <div className="chat-username">{messageUsername}</div>
                  <div className="chat-text">{messageText}</div>
                </div>
              );
            })}
          </div>

          <footer className="chat-footer">
            <input
              value={msg}
              onChange={(e) => {
                setMsg(e.target.value);
                socket.emit("typing", username);
              }}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </footer>
          <p className="typing-indicator">{typing}</p>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
