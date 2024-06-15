import { Server } from "socket.io";

const io = new Server({ cors: "http://localhost:5173" });

let onlineUsers = []
io.on("connection", (socket) => {
  console.log("new connection",socket.id)

  //listen to a connection

  socket.on("addNewUser", (userId)=>{

    if(!onlineUsers.some(user => user.userId  === userId )){
        onlineUsers.push({userId, socketId: socket.id})

    }

    io.emit("getOnlineUsers", onlineUsers)
  });

  console.log("onlineUser",onlineUsers)
});

io.listen(3000);