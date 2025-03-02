"use client"
import React, { useEffect, useRef } from 'react'
import {io,Socket} from "socket.io-client"

const page = () => {
const socket = useRef<Socket | null>(null)
 

useEffect(() => {
    socket.current = io("http://localhost:3001")
    socket.current.connect();

  return () => {
    socket.current?.disconnect();
  }
}, [])

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='w-max h-max p-10 border-2 border-white'>
        <h1>Join Room</h1>
      </div>
    </div>
  )
}

export default page
