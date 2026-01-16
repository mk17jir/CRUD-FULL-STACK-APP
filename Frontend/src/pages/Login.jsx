import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ react-router-dom
import { validateEmail, validatePassword } from "../lib/config.js";
import Password from "../components/Password.jsx";
import AxiosInstance from "../lib/AxiosIntence.js";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext.jsx"; // ✅ use context

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext); // ✅ reactive login
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!validatePassword(password)) {
      setError("Please enter a valid password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await AxiosInstance.post("/login", { email, password });
      const token = response.data.accessToken;

      login(token); // ✅ update AuthContext state
      toast.success("Login successful 🎉");

      navigate("/dashboard", { replace: true }); // ✅ instant redirect
    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="bg-white w-96 border border-gray-300 rounded-md px-7 py-10">
        <form onSubmit={handleSubmit}>
          <h3 className="text-2xl mb-4">Login</h3>

          <input
            type="text"
            placeholder="Enter your Email"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <p className="mt-2">
          Not Registered Yet?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-medium underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
