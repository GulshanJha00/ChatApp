"use client";
import React, { useEffect, useRef, useState } from "react";
import { io,Socket } from "socket.io-client";

const Page = () => {
  const [chat, setChat] = useState("")
  const [dark, setDark] = useState(true);
  const [receiving, setReceiving] = useState("")
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io("https://chatapp-1-ywkf.onrender.com", {
      transports: ["websocket", "polling"]
    });

    socket.current.on("connect", () => {
      socket.current?.emit("Yo", "YO");
      
    });
    socket.current.on("receiving",(data)=>{
      setReceiving(data);
    })

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    socket.current?.emit("sending",`${chat}`)
    console.log(chat)
  };
  return (
    <div
      className={`h-screen w-screen flex  flex-col items-center ${
        dark ? "bg-black" : "bg-white"
      }`}
    >
      <div
        className={`absolute top-10 right-10 cursor-pointer`}
        onClick={() => setDark(!dark)}
      >
        <h1 className="bg-blue-800 px-2 py-1 text-2xl rounded-lg">
          {dark ? "🌝 Light" : "🌚 Dark"}
        </h1>
      </div>

      <form
        className={`border-2 p-10 flex flex-col gap-10 ${
          dark ? "border-white text-white" : "border-black text-black"
        }`}
        onSubmit={handleSubmit}
      >
        <h1 className="text-blue-800 font-bold text-2xl text-center">
          Enter Your Message
        </h1>
        <input
          type="text"
          placeholder="Enter text"
          value={chat}
          onChange={(e)=>setChat(e.target.value)}
          className={`border-2 p-2 rounded-lg bg-white text-black`}
        />
        <button className="bg-red-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
      <div>
        <h1 className="bg-blue-700 px-2 py-1 mt-5 rounded-lg text-2xl text-white">{receiving}</h1>
      </div>
    </div>
  );
};

export default Page;
