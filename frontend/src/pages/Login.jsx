import { useState, useEffect } from "react";
import axios from "axios";

function Login({ setUser, setActivePage }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    "Analyze your resume",
    "Improve your skills",
    "Stand out from others",
    "Get hired faster"
  ];

  // 🔥 rotating text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleAuth = async () => {
    try {
      const url = isSignup
        ? "https://resume-analyzer-wnyu.onrender.com/signup"
        : "https://resume-analyzer-wnyu.onrender.com/login";

      const res = await axios.post(url, { email, password });

      if (isSignup) {
        alert("Signup successful. Please login.");
        setIsSignup(false);
      } else {
        console.log("LOGIN RESPONSE:", res.data);
        setUser(res.data);
        setActivePage("dashboard");
      }

    } catch {
      alert(isSignup ? "Signup failed" : "Login failed");
    }
  };

  return (
   <div className="min-h-screen grid md:grid-cols-2 relative overflow-hidden bg-gradient-to-br from-green-100 via-white to-green-50">

      {/* 🔥 LEFT SIDE (BRANDING) */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-green-500 to-green-600 text-white p-10">

        {/* LOGO */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white text-green-600 flex items-center justify-center rounded-lg font-bold text-lg">
            R
          </div>
          <h1 className="text-2xl font-bold">ResumeAI</h1>
        </div>

        {/* ANIMATED TEXT */}
        <h2 className="text-xl font-semibold transition-all duration-500 text-center">
          {texts[textIndex]}
        </h2>

        <p className="text-sm opacity-80 mt-4 text-center max-w-xs">
          Build stronger resumes with smart insights and real feedback.
        </p>
      </div>

      {/* 🔥 RIGHT SIDE (LOGIN CARD) */}
      <div className="flex items-center justify-center bg-gray-100">

        <div className="bg-white p-8 rounded-2xl shadow-xl w-96 transform transition-all duration-500 hover:scale-[1.02]">

          <h1 className="text-2xl font-bold mb-6 text-center">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>

          {/* INPUTS */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg mb-3 focus:ring-2 focus:ring-green-400 outline-none transition"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg mb-5 focus:ring-2 focus:ring-green-400 outline-none transition"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* BUTTON */}
          <button
            onClick={handleAuth}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 hover:shadow-lg transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>

          {/* TOGGLE */}
          <p className="text-sm text-center mt-4 text-gray-500">
            {isSignup ? "Already have an account?" : "New here?"}{" "}
            <span
              onClick={() => setIsSignup(!isSignup)}
              className="text-green-600 cursor-pointer font-semibold hover:underline"
            >
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;