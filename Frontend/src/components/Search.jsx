import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Search = ({ onChange, onClearSearch, value, handleSearch}) => {

  return (
    <div className='w-80 bg-slate-100 flex items-center px-3 py-2 rounded-md gap-2'>
        <input type="search" placeholder='search any todo list' onChange={onChange} value={value} className='outline-none w-full' />
        {value && <IoMdClose onClick={onClearSearch} className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3'/>}
        <FaMagnifyingGlass onClick={handleSearch} className='text-slate-300 cursor-pointer hover:text-black'/>
    </div>
  )
}

export default Search