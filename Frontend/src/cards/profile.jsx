import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext.jsx';
import AxiosInstance from '../lib/AxiosIntence.js';
import { getProfileName } from '../lib/profile.js'; // your original logic

const Profile = ({ userData: propUserData }) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); // reactive login/logout
  const [userData, setUserData] = useState(propUserData); // local state

  // Fetch user data whenever `user` changes (login/logout)
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setUserData(null); // hide profile when logged out
        return;
      }

      try {
        const response = await AxiosInstance.get("/get-user");
        if (response.status === 200) setUserData(response.data.user);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = () => {
    logout(); // reactive logout
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  if (!userData) return null; // hide profile if no user

  return (
    <div className='flex items-center gap-4'>
      {/* Use your original getProfileName logic */}
      <div className='bg-gray-800 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold'>
        {getProfileName(userData.fullName)}
      </div>
      <p className='md:text-xl font-medium'>{userData.fullName}</p>
      <button
        className='text-slate-800 underline cursor-pointer'
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
