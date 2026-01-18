import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Search = ({ onChange, onClearSearch, value, handleSearch }) => {
  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-slate-100 flex items-center px-3 py-2 rounded-md gap-2">
      <input
        type="search"
        placeholder="Search any todo list"
        onChange={onChange}
        value={value}
        className="outline-none w-full text-sm sm:text-base"
      />
      {value && (
        <IoMdClose
          onClick={onClearSearch}
          className="text-xl text-slate-500 cursor-pointer hover:text-black"
        />
      )}
      <FaMagnifyingGlass
        onClick={handleSearch}
        className="text-slate-300 cursor-pointer hover:text-black"
      />
    </div>
  );
};

export default Search;
