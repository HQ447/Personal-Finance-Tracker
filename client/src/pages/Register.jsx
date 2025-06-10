import { useState } from "react";
import {
  Eye,
  EyeOff,
  DollarSign,
  TrendingUp,
  PieChart,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Your existing register logic would go here
    const res = await fetch("http://localhost:9000/app/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);
    navigate("/login");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-16 right-20 animate-pulse">
          <TrendingUp size={70} className="text-white" />
        </div>
        <div className="absolute top-60 left-32 animate-bounce">
          <PieChart size={45} className="text-white" />
        </div>
        <div className="absolute bottom-40 right-16 animate-pulse">
          <BarChart3 size={55} className="text-white" />
        </div>
        <div className="absolute bottom-16 left-20 animate-bounce">
          <DollarSign size={40} className="text-white" />
        </div>
      </div>

      {/* Glassmorphism card */}
      <div className="max-w-md w-full backdrop-blur-lg bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20 relative z-10 transform hover:scale-105 transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg">
            <TrendingUp size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Join Us</h2>
          <p className="text-gray-200">Start tracking your finances today</p>
        </div>

        <div className="space-y-6">
          {/* Name field */}
          <div className="relative group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm"
              onChange={handleChange}
              required
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/0 to-pink-400/0 group-focus-within:from-purple-400/20 group-focus-within:to-pink-400/20 transition-all duration-300 pointer-events-none"></div>
          </div>

          {/* Email field */}
          <div className="relative group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm"
              onChange={handleChange}
              required
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/0 to-pink-400/0 group-focus-within:from-purple-400/20 group-focus-within:to-pink-400/20 transition-all duration-300 pointer-events-none"></div>
          </div>

          {/* Password field */}
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm pr-12"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/0 to-pink-400/0 group-focus-within:from-purple-400/20 group-focus-within:to-pink-400/20 transition-all duration-300 pointer-events-none"></div>
          </div>

          {/* Register button */}
          <button
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Login link */}
          <div className="text-center">
            <p className="text-gray-300 mb-2">Already have an account?</p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-purple-400 hover:text-purple-300 font-semibold hover:underline transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="mt-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl backdrop-blur-sm">
            <p className="text-center text-green-200 font-medium">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
