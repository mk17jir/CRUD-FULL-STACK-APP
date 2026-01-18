import React, { useState, useEffect } from "react";
import InputTags from "../components/InputTags";
import AxiosInstance from "../lib/AxiosIntence";
import { toast } from "react-toastify";

const AddEditTodo = ({ type, GetAllTodos, Data, onSuccess }) => {
  const [title, setTitle] = useState(Data?.title || "");
  const [content, setContent] = useState(Data?.content || "");
  const [tags, setTags] = useState(Data?.tags || []);
  const [error, setError] = useState("");

  useEffect(() => {
    if (type === "Edit" && Data) {
      setTitle(Data.title || "");
      setContent(Data.content || "");
      setTags(Data.tags || []);
    }
  }, [type, Data]);

  const addNote = async () => {
    try {
      const response = await AxiosInstance.post("/create-todolist", {
        title,
        content,
        tags,
      });

      toast.success(response.data.message);

      if (onSuccess && response.data.newTodo) {
        onSuccess(response.data.newTodo);
      } else {
        GetAllTodos();
      }

      setTitle("");
      setContent("");
      setTags([]);
    } catch (error) {
      console.error("Error adding todo:", error);
      toast.error("Failed to add todo");
    }
  };

  const editNote = async () => {
    try {
      const response = await AxiosInstance.put(`/update-todolist/${Data._id}`, {
        title,
        content,
        tags,
      });

      toast.success(response.data.message);

      if (onSuccess && response.data.updatedTodo) {
        onSuccess(response.data.updatedTodo);
      } else {
        GetAllTodos();
      }

      setTitle("");
      setContent("");
      setTags([]);
    } catch (error) {
      console.error("Error editing todo:", error);
      toast.error("Failed to update todo");
    }
  };

  const handleAddNote = () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!content.trim()) {
      setError("Content is required");
      return;
    }
    setError("");
    type === "Add" ? addNote() : editNote();
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl p-5 sm:p-6 bg-white border-[1px] border-slate-300 rounded-lg 
                    mt-10 mx-auto flex flex-col gap-5
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    xs:relative xs:top-auto xs:left-auto xs:translate-x-0 xs:translate-y-0">
      {/* Title */}
      <div className="flex flex-col gap-3">
        <label className="input-label text-sm sm:text-base md:text-lg font-medium">
          Todo list title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your todo title"
          className="outline-none border-[1px] border-black px-3 py-2 sm:px-4 sm:py-3 md:px-4 md:py-4 rounded-md text-sm sm:text-base md:text-lg w-full"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3">
        <label className="input-label text-sm sm:text-base md:text-lg font-medium">
          Todo list content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          placeholder="Enter your todo content"
          className="resize-none outline-none border-[1px] border-black px-3 py-2 sm:px-4 sm:py-3 md:px-4 md:py-4 rounded-md text-sm sm:text-base md:text-lg w-full"
        ></textarea>
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-2">
        <label className="input-label text-sm sm:text-base md:text-lg font-medium">
          Tags
        </label>
        <InputTags tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-sm sm:text-base">{error}</p>}

      <button
        className="btn w-full sm:w-auto py-2 sm:py-3 md:py-4 px-4 text-sm sm:text-base md:text-lg"
        onClick={handleAddNote}
      >
        {type === "Add" ? "Add Todo" : "Edit Todo"}
      </button>
    </div>
  );
};

export default AddEditTodo;
