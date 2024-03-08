import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const port = 3000;
const app = express();
const server = new createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("hello world");
});

io.on("connection", (socket) => {
  console.log("user connected ","Id:", socket.id);
  socket.broadcast.emit("welcome",` ${socket.id} joined the server `)
  socket.emit("welcome","welcome to the server");
  socket.on("message",({room,message})=>{
    
    io.to(room).emit("newmessage",message)
  })
  socket.on("disconnect",()=>{
    console.log("use disconnected",socket.id)  })
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
