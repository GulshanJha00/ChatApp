const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database Connection failed");
  }
};
connection();
const chatSchema = mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  message: [
    {
      username: { type: String, required: true },
      msgInput: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
  
},{timestamps: true});

module.exports = mongoose.model("Chat", chatSchema);