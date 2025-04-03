const express = require('express');
const chatSchema = require("../schema/chatSchema")
const cors = require("cors")

const router = express();
router.use(express.json())

router.use(
    cors({
      origin: "http://localhost:3000", // Allow only your frontend
    })
  );
  
  router.get("/",(req,res)=>{
    res.send("Working fine")
  })

  router.post("/",async (req,res)=>{
    const {username,roomName,msgInput} = await req.body;
    console.log(username,roomName,msgInput);

    try {
        let chatRoom = await chatSchema.findOne({ roomName });
    
        if (!chatRoom) {
          chatRoom = new chatSchema({ roomName, msgInput: [] });
        }
        chatRoom.message.push({ username, msgInput });
        await chatRoom.save();
        res.status(200).json({ chatMessage: chatRoom.message });
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error saving message" });
      }
  })

  router.post("/gett", async (req, res) => {
    const { roomName } = req.body;
    console.log("Roomname is " + roomName);
  
    try {
      let chatRoom = await chatSchema.findOne({ roomName });
  
      if (!chatRoom) {
        return res.status(200).json({ chatMessage: [] }); // 🔥 Fix: Return empty array if room doesn't exist
      }
  
      res.status(200).json({ chatMessage: chatRoom.message });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error fetching messages" });
    }
  });
  
module.exports = router;