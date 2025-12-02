import React from "react";
import { Linkedin, Twitter, Github } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-700 text-white py-12 ">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">ATS-Mate</h2>
          <p className="text-gray-200">
            © 2025 ATS-Mate. All rights reserved.
          </p>
        </div>

        {/* Center Links */}
        <div className="flex space-x-8 mb-6 md:mb-0">
          <a href="#features" className="hover:text-blue-300 transition">Features</a>
          <a href="#demo" className="hover:text-blue-300 transition">Demo</a>
          <a href="#signup" className="hover:text-blue-300 transition">Sign Up</a>
          <a href="#" className="hover:text-blue-300 transition">Privacy</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300 transition"><Linkedin className="w-5 h-5" /></a>
          <a href="#" className="hover:text-gray-300 transition"><Twitter className="w-5 h-5" /></a>
          <a href="#" className="hover:text-gray-300 transition"><Github className="w-5 h-5" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
