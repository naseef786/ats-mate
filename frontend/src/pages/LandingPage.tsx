import React from "react";
import { CheckCircle, FileText, Zap, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const InteractiveLandingPage: React.FC = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-all cursor-pointer">ATS-Mate</div>
          <ul className="hidden md:flex space-x-6 font-medium">
            <li><a href="#features" className="hover:text-blue-600 transition duration-300">Features</a></li>
            <li><a href="#demo" className="hover:text-blue-600 transition duration-300">Demo</a></li>
            <li><a href="#signup" className="hover:text-blue-600 transition duration-300">Sign Up</a></li>
          </ul>
          <Link
            to="/login"
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex items-center pt-24 overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full opacity-30 animate-pulse -translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full opacity-20 animate-pulse translate-x-20 translate-y-20"></div>

        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 z-10">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-700 leading-tight">
              Make Your Resume <span className="text-gradient bg-gradient-to-r from-green-400 to-blue-600 text-transparent bg-clip-text">ATS-Ready</span> in Minutes
            </h1>
            <p className="text-gray-700 text-lg md:text-xl">
              ATS-Mate is a free AI-powered resume analyzer that helps you identify weak sections, missing keywords, and improve your chances of getting hired.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/register"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              >
                Try Free Demo
              </Link>
              <Link
                to="#features"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
            <img src="/images/resume-hero.png" alt="Resume AI" className="w-full max-w-md animate-float" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-16">
            Why Choose ATS-Mate
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="bg-gradient-to-tr from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg transform hover:scale-105 transition duration-500 hover:shadow-2xl">
              <FileText className="w-12 h-12 mx-auto text-blue-600 mb-4 animate-bounce" />
              <h3 className="text-xl font-semibold mb-2">Resume Upload</h3>
              <p className="text-gray-600">
                Upload your resume in PDF or DOCX format and get instant AI-powered feedback to make it stronger.
              </p>
            </div>
            <div className="bg-gradient-to-tr from-green-50 to-green-100 rounded-xl p-8 shadow-lg transform hover:scale-105 transition duration-500 hover:shadow-2xl">
              <Zap className="w-12 h-12 mx-auto text-green-600 mb-4 animate-bounce" />
              <h3 className="text-xl font-semibold mb-2">Weak Sections Analysis</h3>
              <p className="text-gray-600">
                Identify gaps in your resume including missing skills, certifications, and other important sections.
              </p>
            </div>
            <div className="bg-gradient-to-tr from-purple-50 to-purple-100 rounded-xl p-8 shadow-lg transform hover:scale-105 transition duration-500 hover:shadow-2xl">
              <CheckCircle className="w-12 h-12 mx-auto text-purple-600 mb-4 animate-bounce" />
              <h3 className="text-xl font-semibold mb-2">Keyword Checker</h3>
              <p className="text-gray-600">
                Compare your resume with any job description and see which important keywords you are missing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Demo Section */}
      <section id="demo" className="py-24 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">Completely Free</h2>
          <p className="text-gray-700 mb-10 text-lg md:text-xl">
            ATS-Mate is entirely free. Upload and analyze unlimited resumes, get insights and keyword suggestions without paying anything.
          </p>
          <Link
            to="/register"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            Sign Up for Free Demo
          </Link>
        </div>
      </section>

      {/* Signup Call-to-Action */}
      <section id="signup" className="py-24 bg-white relative">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">Get Started Today</h2>
          <p className="text-gray-700 mb-6 text-lg md:text-xl">
            Create an account to start uploading resumes, checking keywords, and improving your chances of landing your dream job.
          </p>
          <Link
            to="/register"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-8 mt-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 ATS-Mate. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-blue-300 transition">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InteractiveLandingPage;
