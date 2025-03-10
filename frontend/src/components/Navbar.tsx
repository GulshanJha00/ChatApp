"use client"
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute  bg-[#006d77] text-white h-20 flex flex-col justify-center items-center  w-screen top-0 shadow-md z-50">
      <div className=" px-6 py-4 w-full flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide">
          Ponex
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg">
          <li>
            <Link href="/" className="hover:text-blue-400 transition">Home</Link>
          </li>
          <li>
            <Link href="/features" className="hover:text-blue-400 transition">Features</Link>
          </li>
          <li>
            <Link href="/pricing" className="hover:text-blue-400 transition">Pricing</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 py-6 text-center absolute w-full left-0">
          <ul className="space-y-4 text-lg">
            <li>
              <Link href="/" className="hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li>
              <Link href="/features" className="hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>Features</Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>Pricing</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>Contact</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
