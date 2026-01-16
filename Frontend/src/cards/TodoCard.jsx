import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import AxiosInstance from '../lib/AxiosIntence.js';

const TodoCard = ({
  title,
  date,
  content,
  tag,
  isPinned,
  onDelete,
  onEdit,
  id,
  onPinToggle,
}) => {

  const updatedPinned = async () => {
    try {
      await AxiosInstance.put(`/update-pin/${id}`, {
        isPinned: !isPinned,
      });

      // 🔹 update UI instantly
      onPinToggle(id);
    } catch (error) {
      console.error("Error updating pin status:", error);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
      <div className='flex justify-between items-center mb-2'>
        {/* title and date */}
        <div>
          <h4 className='text-xl font-medium mb-2'>{title}</h4>
          <span className='text-sm text-gray-600'>{date}</span>
        </div>

        <MdOutlinePushPin
          onClick={updatedPinned}
          className={`icon-btn text-2xl ${
            isPinned ? 'text-blue-400' : 'text-gray-400'
          }`}
        />
      </div>

      {/* content */}
      <div>
        <p className='text-slate-500 mt-5 mb-5'>
          {content.slice(0, 50)}
        </p>
      </div>

      {/* tag & actions */}
      <div className='flex justify-between items-center'>
        <div className='text-slate-400'>
          {tag && <span className="mr-3">Tags:</span>} {tag?.join(", ")}
        </div>
        <div className='flex gap-4 text-2xl'>
          <MdCreate onClick={onEdit} className='icon-btn text-green-500' />
          <MdDelete onClick={onDelete} className='icon-btn text-red-500' />
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
