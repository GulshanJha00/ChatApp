"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { io, Socket } from "socket.io-client";

const ChatPage = () => {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const roomNameRef = useRef(""); // 🔥 Holds latest room name

  const [messages, setMessages] = useState<
    { username: string; message: string }[]
  >([]);
  const [msgInput, setMsgInput] = useState("");
  const [isSubmit, setisSubmit] = useState(true);

  const socket = useRef<Socket | null>(null);

  // ✅ Sync `roomNameRef` with `roomName` state
  useEffect(() => {
    roomNameRef.current = roomName;
  }, [roomName]);

  // ✅ Initialize socket connection
  useEffect(() => {
    socket.current = io("http://localhost:3001");

    socket.current?.on("joined_room", (message: string) => {
      console.log(message);
      toast.success(message)
    });

    socket.current?.on("received_message", async () => {
      try {
        const response = await axios.post("http://localhost:3001/gett", {
          roomName: roomNameRef.current,
        });

        response.data.chatMessage.map(
          () => {
            setMessages(
              response.data.chatMessage.map((ele:{username: string,msgInput:string}) => ({
                username: ele.username,
                message: ele.msgInput,
              }))
            );
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const handleMessageInput = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !roomName || !msgInput) return;

    try {
      await axios.post("http://localhost:3001/", {
        username,
        roomName,
        msgInput,
      });
    } catch (error) {
      console.log("Error while sending message to backend"+ error);
    }

    setMessages((prev) => [...prev, { username, message: msgInput }]);
    socket.current?.emit("send_message", { username, msgInput, roomName });
    setMsgInput("");
  };

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !roomName) return;

    socket.current?.emit(
      "join_room",
      { username, roomName },
      (response: string) => {
        console.log(username, roomName);
        console.log(response);
        setisSubmit(false);
      }
    );
    try {
      const res = await axios.post("http://localhost:3001/gett", {
        roomName: roomName,
      });

      setMessages(
        res.data.chatMessage.map(
          (ele: { username: string; msgInput: string }) => ({
            username: ele.username,
            message: ele.msgInput,
          })
        )
      );
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  return (
    <>
      {isSubmit ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="chatBox w-max h-max md:p-16 p-10 border-2 border-white bg-[#003b53]">
            <h1 className="text-center text-4xl font-bold text-yellow-500 mb-10">
              Join Room
            </h1>
            <form onSubmit={handleJoinRoom} className="flex flex-col gap-5">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Name"
                className="text-black bg-white px-4 py-2 rounded-2xl"
              />
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter Room Id"
                className="text-black bg-white px-4 py-2 rounded-2xl"
              />
              <button className="border-2 text-xl hover:text-black border-yellow-300 hover:bg-yellow-300 px-4 py-2">
                Enter
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="w-full h-full border-2 border-black bg-white shadow-lg rounded-lg p-4">
            <div className="h-[600px] overflow-y-auto border-b border-gray-800 mb-4 p-2">
              {messages?.map((msg, index) =>
                msg.username === username ? (
                  <div
                    key={index}
                    className="p-2 text-black bg-blue-200 rounded my-1"
                  >
                    <h1>
                      {msg.username} : {msg.message}
                    </h1>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="p-2 text-black bg-gray-200 rounded my-1"
                  >
                    <h1>
                      {msg.username} : {msg.message}
                    </h1>
                  </div>
                )
              )}
            </div>
            <div className="flex gap-2">
              <form className="w-full" onSubmit={handleMessageInput}>
                <input
                  type="text"
                  className="flex-1 w-[90%] p-2 text-black border rounded"
                  placeholder="Type a message..."
                  value={msgInput}
                  onChange={(e) => setMsgInput(e.target.value)}
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
       <ToastContainer />
    </>
  );
};

export default ChatPage;
