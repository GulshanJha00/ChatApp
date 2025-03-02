"use client";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import "./chat.css";
import Navbar from "@/components/Navbar";

const Page = () => {
    const [username, setUsername] = useState("")
    const [roomName, setroomName] = useState("")
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io("http://localhost:3001");
    socket.current.connect();
    

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const handleEvent = (e:React.FormEvent)=>{
    e.preventDefault();
    console.log(username,roomName)
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <Navbar/>
      <div className="chatBox w-max h-max md:p-16 p-10 border-2 border-white bg-[#003b53]">
        <h1 className="text-center  text-4xl font-bold  text-yellow-500 mb-10">
          Join Room
        </h1>
        <form
          onSubmit={handleEvent}
          className="flex justify-center items-center flex-col gap-5"
        >
          <input
          value={username}
            type="text"
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="Enter Name"
            className="text-black bg-white px-4 py-2 rounded-2xl"
          />
          <input
            type="text"
          value={roomName}

            placeholder="Enter Room Id"
            onChange={(e)=>setroomName(e.target.value)}

            className="text-black bg-white px-4 py-2 rounded-2xl"
          />
          <button
            className="border-2 text-xl transition-all delay-100 cursor-pointer hover:text-black border-yellow-300 hover:bg-yellow-300 px-4 py-2"
            style={{ fontFamily: "Anton SC" }}
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
