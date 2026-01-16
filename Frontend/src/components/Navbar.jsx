import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import Profile from "../cards/profile.jsx";
import Search from "./Search.jsx";
import AxiosInstance from "../lib/AxiosIntence.js";
import { toast } from "react-toastify";
import { TodoContext } from "../context/TodoContex.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const { AllTodo, setAllTodo } = useContext(TodoContext);
  const { user } = useContext(AuthContext);

  // Clear search
  const onClearSearch = async () => {
    setSearchQuery("");
    // Reset todos after clearing search
    try {
      const response = await AxiosInstance.get("/get-all-todolist");
      if (response.status === 200) {
        setAllTodo(response.data.getTodos);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Search todos
  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      toast.error("Please enter a search query");
      return;
    }
    try {
      const response = await AxiosInstance.get(
        `/search-todos?query=${searchQuery}`
      );
      if (response.status === 200) {
        setAllTodo(response.data.searchTodos);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch user profile
  const GetUserData = async () => {
    try {
      const response = await AxiosInstance.get("/get-user");
      if (response.status === 200) setUserData(response.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) GetUserData();
  }, [user]); // 🔹 will refetch whenever user changes

  return (
    <div className="bg-white flex justify-between items-center sm:px-20 px-10 py-5 shadow-md drop-shadow">
      <h1 className="md:text-xl text-1xl font-medium cursor-pointer">
        <Link to="/dashboard">Todo List App</Link>
      </h1>

      <ul className="md:flex hidden gap-10 sm:text-lg">
        {user ? (
          <li className="hover:text-gray-400 font-normal">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        ) : (
          <>
            <li className="hover:text-gray-400 font-normal">
              <Link to="/signup">Signup</Link>
            </li>
            <li className="hover:text-gray-400 font-normal">
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>

      <div className="md:flex hidden">
        <Search
          onChange={(e) => setSearchQuery(e.target.value)}
          onClearSearch={onClearSearch}
          value={searchQuery}
          handleSearch={handleSearch}
        />
      </div>

      <div>
        <Profile userData={userData} />
      </div>
    </div>
  );
};

export default Navbar;
