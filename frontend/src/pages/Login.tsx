import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface GoogleJwt {
  email: string;
  name: string;
  sub: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill in all fields");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

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
        alert("Google login failed");
      }
    }
  };

  const handleGoogleError = () => alert("Google Login Failed");

  return (
    <>
      <Header />
      <div className="min-h-screen py-24 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Sign in to your account to continue
          </p>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold text-white transition 
              ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
            `}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          <div className="flex items-center justify-center my-6">
            <div className="border-t border-gray-300 w-1/3" />
            <span className="text-gray-500 text-sm mx-2">OR</span>
            <div className="border-t border-gray-300 w-1/3" />
          </div>

          <div className="flex justify-center">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
          </div>

          <p className="text-center text-gray-600 text-sm mt-8">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
