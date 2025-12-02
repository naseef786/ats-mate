import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface GoogleJwt {
  email: string;
  name: string;
  sub: string;
}

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) return alert("Please fill in all fields");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Signup
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        const decoded: GoogleJwt = jwtDecode(credentialResponse.credential);
        const res = await axios.post("http://localhost:4000/api/auth/google-login", {
          tokenId: credentialResponse.credential,
        });
        localStorage.setItem("token", res.data.token);
        setTimeout(() => window.location.reload(), 100);
        navigate("/home");
      } catch (error: any) {
        console.error(error);
        alert("Google sign up failed");
      }
    }
  };

  const handleGoogleError = () => {
    alert("Google Sign Up Failed");
  };

  return (
    <>
      <Header />
      <main>

        <div className="py-24 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
          <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 sm:p-10">
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
              Create Account ✨
            </h2>
            <p className="text-gray-500 text-center mb-8">
              Join us to get personalized resume insights
            </p>

            {/* Email Registration Form */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <button
                onClick={handleRegister}
                disabled={loading}
                className={`w-full py-2 rounded-lg font-semibold text-white transition 
              ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
            `}
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center my-6">
              <div className="border-t border-gray-300 w-1/3" />
              <span className="text-gray-500 text-sm mx-2">OR</span>
              <div className="border-t border-gray-300 w-1/3" />
            </div>

            {/* Google Sign Up */}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div>

            <p className="text-center text-gray-600 text-sm mt-8">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/")}
                className="text-blue-600 font-semibold hover:underline"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Register;
