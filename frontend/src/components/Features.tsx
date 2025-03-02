// pages/features.js
import "../app/app.css"
import { FaComments, FaVideo, FaLock, FaUserFriends, FaRocket, FaCloud } from "react-icons/fa";

const featuresList = [
  { title: "Instant Messaging", icon: <FaComments />, desc: "Real-time chat with lightning-fast delivery." },
  { title: "Seamless Video Calls", icon: <FaVideo />, desc: "Crystal-clear video & voice calls with no lag." },
  { title: "End-to-End Encryption", icon: <FaLock />, desc: "Your conversations stay private and secure." },
  { title: "Group Chats & Channels", icon: <FaUserFriends />, desc: "Engage with friends, teams, and communities." },
  { title: "AI-Powered Chatbot", icon: <FaRocket />, desc: "Smart AI assistant for automated responses." },
  { title: "Cloud Sync", icon: <FaCloud />, desc: "Access chats from any device with cloud sync." },
];

export default function Features() {
  return (
    <div className="bg-[#000e20] z-30">
        <div className="flex justify-center items-center ">
        <section className=" text-white p-10 pt-20 text-center w-full  ">
        <h1 className="feature-head text-4xl text-yellow-300 font-extrabold">Powerful Features That Keep You Connected</h1>
        <p className="feature-para text-lg mt-4 opacity-80">From instant messaging to video calls, Ponex has everything you need.</p>
      </section>
        </div>
      

      <section className=" mx-auto px-6 py-16 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuresList.map((feature, index) => (
            <div key={index} className="container bg-gray-100 p-6 rounded-lg shadow-md text-center hover:scale-105 transition-all">
              <div className="text-blue-600  text-4xl mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl text-yellow-300 font-semibold">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}
