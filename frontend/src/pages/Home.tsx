import React from "react";
import { Link } from "react-router-dom";
import ResumeUpload from "../components/ResumeUpload";
import KeywordChecker from "../components/KeywordChecker";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Header />
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">

          <ul className="hidden md:flex space-x-6 font-medium">
            <li>
              <a href="#upload" className="hover:text-blue-600 transition">
                Upload Resume
              </a>
            </li>
            <li>
              <a href="#keywords" className="hover:text-blue-600 transition">
                Keyword Checker
              </a>
            </li>
          </ul>
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-28 container mx-auto px-6 space-y-16">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
            Welcome to ATS-Mate
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            Upload your resume, analyze it with AI, and check missing keywords to boost your chances of landing your dream job.
          </p>
        </header>

        {/* Resume Upload Section */}
        <section id="upload">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
            Upload Your Resume
          </h2>
          <ResumeUpload />
        </section>

        {/* Keyword Checker Section */}
        <section id="keywords">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
            Keyword Checker
          </h2>
          <KeywordChecker />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
