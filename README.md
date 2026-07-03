Real-Time Chat Application

A simple real-time chat application built with **React (frontend)** and **Express + Socket.io (backend)**.  
It supports multiple rooms, instant messaging, and typing indicators using WebSockets.

---

 Features
- Join chat rooms with a username
- Real-time messaging powered by WebSockets
- Typing indicators for active users
- Responsive chat UI (sender vs receiver styling)
- Backend deployed on **Render**
- Frontend deployed on **Vercel**

---

Tech Stack
- **Frontend**: React (Vite or CRA)
- **Backend**: Node.js, Express, Socket.io
- **Deployment**: Vercel (frontend), Render (backend)

---
 Project Structure
```
root/
 ├── server.js        # Express + Socket.io backend
 ├── package.json     # Backend dependencies
 ├── frontend/        # React app
 │   ├── src/
 │   │   ├── socket.js   # Socket.io client setup
 │   │   ├── ChatRoom.jsx
 │   │   └── App.jsx
 │   └── package.json    # Frontend dependencies
```

---

 Setup Instructions

 Backend (Express + Socket.io)
```bash
# Navigate to root folder
cd root

# Install dependencies
npm install

# Run backend locally
node server.js
```

 Frontend (React)
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Run frontend locally
npm run dev
```

---

Deployment

Backend (Render)
1. Push code to GitHub.
2. Create a new **Web Service** on Render.
3. Root Directory → leave blank (backend is in root).
4. Build Command → `npm install`
5. Start Command → `node server.js`
6. Render will give you a URL like:  
   ```
   https://your-app.onrender.com
   ```

 Frontend (Vercel)
1. Push frontend code to GitHub.
2. Create a new project on Vercel.
3. Root Directory → `frontend`
4. Build Command → `npm run build`
5. Output Directory → `dist` (Vite) or `build` (CRA)
6. Vercel will give you a URL like:  
   ```
   https://your-frontend.vercel.app
   ```

---

 Connecting Frontend to Backend
Update `frontend/src/socket.js`:
```js
import { io } from "socket.io-client";

const socket = io("https://real-time-chat-application-7o0s.onrender.com"); // Render backend URL

export default socket;
```

---

 Future Improvements
- Save chat history in MongoDB Atlas
- User authentication
- Persistent rooms
- File sharing support

---

here is the deployed url
https://real-time-chat-application-chi-five.vercel.app/
