import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md';

const InputTags = ({ tags, setTags }) => {
    // input state
  const [input, setInput] = useState("");
    // add new tag function
 const AddNewTag = () => {
    if(input.trim() !== "") {
        setTags([...tags, input.trim()]);
        setInput("");
    }
    
    }
    // delete tag function
    const deleteTag = (tagName) => {
        setTags(tags.filter((tag) => tag !== tagName));
    }
  return (
    <div>
        <div className='flex flex-wrap items-center mt-2 mb-2 gap-2 ' > 
             {tags.map((tag, index) => (
               
                <span className='gap-2 text-slate-400 flex items-center bg-slate-200 text-sm px-1 py-1' key={index} >
                 #{tag}
                <button onClick={()=> {
                    deleteTag(tag)
                }}>
                    <MdClose className='cursor-pointer'/>
                </button>
                </span>
                
              ))}
        </div>
        <div className='flex items-center gap-2'>
            <input className='input-box w-[70%] flex justify-center items-center mt-3' type="text" placeholder='Enter a tag' onChange={(e)=> setInput(e.target.value)} value={input}/>
            <button onClick={AddNewTag} className='w-12 h-11 flex justify-center items-center rounded bg-blue-500 hover:bg-blue-700 text-white text-lg'><MdAdd /></button>
        </div>
    </div>
  )
 };
 

export default InputTags