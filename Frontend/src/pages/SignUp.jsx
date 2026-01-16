import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { validateEmail, validatePassword } from "../lib/config.js";
import Password from "../components/Password.jsx";
import AxiosInstance from "../lib/AxiosIntence.js";
import { toast } from "react-toastify";


const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!fullName.trim()) {
      setError("Please enter a valid full name");
      return;
    }
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
      const response = await AxiosInstance.post("/signup", {
        fullName,
        email,
        password,
      });


      localStorage.setItem("accessToken", response.data.accessToken);

      toast.success("Signup successful! Please login 🎉");

      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Signup failed. Please try again.";

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
          <h3 className="text-2xl mb-4">Sign Up</h3>

          <input
            type="text"
            placeholder="Enter your Full Name"
            className="input-box"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

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

          <button
            type="submit"
            className="btn"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}

        <p className="mt-2">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 font-medium underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
