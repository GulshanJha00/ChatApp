import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./app.css"
import Footer from "@/components/Footer";
import Features from "@/components/Features";
const page = () => {
  return (
    <div className=" w-full h-screen">
      <video
        src="/video.mp4"
        className="w-full h-full blur-xs absolute z-[-2]"
        autoPlay
        muted
        loop
      ></video>
      <div className="absolute inset-0 h-full w-full bg-black  opacity-60 z-[-1]"></div>
      <div className="flex flex-col justify-center items-center w-full h-screen bg-transparent">
        <Image
          src={"/icon.png"}
          height={100}
          width={100}
          className="mb-10"
          alt="icon"
        ></Image>
        <h1
          style={{
            fontFamily: "Anton SC",
            fontWeight: 900,
            fontStyle: 'italic',
          }}
          className="ponexText text-6xl"
        >
          PONEX
        </h1>

        <h1 className="mb-4 text-lg">Connect. Chat. Repeat.</h1>

        <div className="flex gap-5 justify-center items-center">
          <Link
            className="p-4 text-lg rounded-lg bg-yellow-300 text-black italic font-bold"
            style={{ fontFamily: "Allan" }}
            href={"/chat"}
          >
            Text Chat{" "}
          </Link>
          <h1
            style={{
              fontFamily: "Allan",
              fontWeight: 800,
              fontStyle: "italic",
            }}
          >
            OR
          </h1>
          <Link
            className="p-4 text-lg rounded-lg bg-yellow-300 text-black italic font-bold"
            style={{ fontFamily: "Allan" }}
            href={"/video"}
          >
            Video Chat{" "}
          </Link>
        </div>
      </div>
      <Features/>
      <Footer/>
    </div>
  );
};

export default page;
