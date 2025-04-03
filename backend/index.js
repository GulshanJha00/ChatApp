const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require("cors")
const router = require("./routes/routes")
const app = express();
require("dotenv").config();
app.use(
    cors({
      origin: "https://ponex.vercel.app/", // Allow only your frontend
    })
  );
app.use(router)
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:"https://ponex.vercel.app/",
    }
});



io.on('connection', (socket) => {
    console.log('a user connected');



    socket.on("join_room",async (data,callback)=>{ //event for getting login data
         socket.join(data.roomName) //event for joining into room
         console.log(data.roomName+data.username)
         setTimeout(() => {
             io.to(data.roomName).emit("joined_room",`${data.username} Joined room`)         
             console.log("Joined Room")
        }, 1000);
        if (callback)(
            callback(`message: "Hellow"`)
        )
    })

    socket.on("send_message",(data)=>{
        console.log(`${data.username}: ${data.msgInput}`)

        io.to(data.roomName).emit("received_message",data)
    })
});

server.listen(process.env.PORT, () => {
  console.log(`server running at http://localhost:${process.env.PORT}`);
});