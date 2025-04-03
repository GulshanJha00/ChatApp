const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ponex");
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