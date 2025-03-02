// components/Footer.js
import { FaTwitter, FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 absolute w-full z-[-2] rounded-2xl">
      <div className=" mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo & Tagline */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold text-white">Ponex</h2>
          <p className="text-sm text-gray-400">Connect. Chat. Zoom.</p>
        </div>

        {/* Footer Links */}
        <div className="flex space-x-6 text-sm">
          <a href="/features" className="hover:text-white">Features</a>
          <a href="/pricing" className="hover:text-white">Pricing</a>
          <a href="/about" className="hover:text-white">About</a>
          <a href="/contact" className="hover:text-white">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://twitter.com" className="hover:text-white"><FaTwitter size={20} /></a>
          <a href="https://github.com" className="hover:text-white"><FaGithub size={20} /></a>
          <a href="https://linkedin.com" className="hover:text-white"><FaLinkedin size={20} /></a>
          <a href="https://discord.com" className="hover:text-white"><FaDiscord size={20} /></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-xs mt-6">
        © {new Date().getFullYear()} Ponex. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
