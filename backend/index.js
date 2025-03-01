const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require("cors")

app.use(
    cors({
      origin: "https://ponex.vercel.app", // Allow only your frontend
      methods: ["GET", "POST"],
      credentials: true, // Allow cookies if needed
    })
  );
const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:"https://ponex.vercel.app/",
        methods: ["GET", "POST"],
    }
});
app.get("/",(req,res)=>{
    res.send("Yo")
})
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
