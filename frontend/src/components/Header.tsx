import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-all">
          ATS-Mate
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 font-medium">
          <li>
            <a href="#features" className="hover:text-blue-600 transition duration-300">
              Features
            </a>
          </li>
          <li>
            <a href="#demo" className="hover:text-blue-600 transition duration-300">
              Demo
            </a>
          </li>
          <li>
            <a href="#signup" className="hover:text-blue-600 transition duration-300">
              Sign Up
            </a>
          </li>
        </ul>

        {/* Actions */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? <X className="w-6 h-6 text-blue-600" /> : <Menu className="w-6 h-6 text-blue-600" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <a href="#features" className="text-blue-600 font-medium hover:text-blue-800 transition">
                Features
              </a>
            </li>
            <li>
              <a href="#demo" className="text-blue-600 font-medium hover:text-blue-800 transition">
                Demo
              </a>
            </li>
            <li>
              <a href="#signup" className="text-blue-600 font-medium hover:text-blue-800 transition">
                Sign Up
              </a>
            </li>
            <li>
              <Link
                to="/login"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
