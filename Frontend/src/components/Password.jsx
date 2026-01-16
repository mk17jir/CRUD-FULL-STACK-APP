import React, { useState } from "react";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Password = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(true);
  const toggle = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex items-center bg-transparent px-6 rounded mb-3 border border-gray-300 ">
      <input
        type={showPassword ? "password" : "text"}
        placeholder="Enter your Password"
        className="w-full py-3 bg-transparent outline-none mr-3 text-sm rounded "
        onChange={onChange}
        value={value}
      />

      {!showPassword ? (
        <FaRegEye
          size={23}
          className="text-blue-500 cursor-pointer"
          onClick={() => toggle()}
        />
      ) : (
        <FaRegEyeSlash
          size={23}
          className="text-blue-500 cursor-pointer"
          onClick={() => toggle()}
        />
      )}
    </div>
  );
};

export default Password;
