import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";


function App() {
  const token = localStorage.getItem("token");

  return (

    <Router>
      <Routes>

        <Route path="/" element={token ? <Navigate to="/home" /> : <LandingPage />} />
        <Route path="/register" element={token ? <Navigate to="/home" /> : <Register />} />
        <Route path="/home" element={token ? <Home /> : <Navigate to="/" />} />
        <Route path="/login" element={token ? <Navigate to="/home" /> : <Login />} />
      </Routes>

    </Router>

  );
}

export default App;
