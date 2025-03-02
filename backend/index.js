const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require("cors")

const app = express();

app.use(
    cors({
      origin: "http://localhost:3000", // Allow only your frontend
    })
  );
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
    }
});
app.get("/",(req,res)=>{
    res.send("Yo")
})
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("sending",(data)=>{
    console.log(data);
    socket.broadcast.emit("receiving",`${data}`)
  })
});

server.listen(3001, () => {
  console.log('server running at http://localhost:3001');
});
