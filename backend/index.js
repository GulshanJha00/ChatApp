const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require("cors")

app.use(
    cors({
      origin: "https://poo-nex.vercel.app", // Allow only your frontend
      methods: ["GET", "POST"],
      credentials: true, // Allow cookies if needed
    })
  );
const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:"https://poo-nex.vercel.app/"
    }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("sending",(data)=>{
    console.log(data);
    io.emit("receiving",`${data}`)
  })
});

server.listen(3001, () => {
  console.log('server running at http://localhost:3001');
});
