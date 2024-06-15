// index.js
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { app } from './server.js';

dotenv.config();

const PORT = process.env.PORT || 3318;

const server = createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173", // Ensure this matches your frontend URL
    methods: ["GET", "POST"]
  }
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on("addNewUser", (userId) => {
    if (!onlineUsers.some(user => user.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id });
    }

    io.emit("getOnlineUsers", onlineUsers);
  });

/*   socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
    console.log('user disconnected', socket.id);
  }); */

  console.log("onlineUsers", onlineUsers);
});

// Start the combined server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
