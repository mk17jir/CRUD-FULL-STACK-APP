import React, { useState } from "react";
import InputTags from "../components/InputTags";
import AxiosInstance from "../lib/AxiosIntence";
import { toast } from "react-toastify";

const AddEditTodo = ({ type, GetAllTodos, Data, onSuccess }) => {
  const [title, setTitle] = useState(Data?.title || "");
  const [content, setContent] = useState(Data?.content || "");
  const [error, setError] = useState("");
  const [tags, setTags] = useState(Data?.tags || []);

  // Add new task function
  const addNote = async () => {
    try {
      const response = await AxiosInstance.post("/create-todolist", {
        title,
        content,
        tags,
      });

      toast.success(response.data.message);

      // Update dashboard instantly
      if (onSuccess && response.data.newTodo) {
        onSuccess(response.data.newTodo);
      } else {
        // fallback to original GetAllTodos
        GetAllTodos();
      }

      setTitle("");
      setContent("");
      setTags([]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Edit task function
  const editNote = async () => {
    try {
      const id = Data._id;
      const response = await AxiosInstance.put(`/update-todolist/${id}`, {
        title,
        content,
        tags,
      });

      toast.success(response.data.message);

      // Update dashboard instantly
      if (onSuccess && response.data.updatedTodo) {
        onSuccess(response.data.updatedTodo);
      } else {
        // fallback
        GetAllTodos();
      }

      setTitle("");
      setContent("");
      setTags([]);
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  // Handle form validation and submission
  const handleAddNote = () => {
    if (!title) {
      setError("Title is required");
      return;
    }

    if (!content) {
      setError("Content is required");
      return;
    }

    setError("");

    if (type === "Add") {
      addNote();
    } else {
      editNote();
    }
  };

  return (
    <div className="w-[400px] p-5 border-[1px] border-slate-300 rounded-lg mt-10 mx-auto flex flex-col gap-5 bg-white absolute top-[-40%] right-[25%] translate-x-[50%] translate-y-[50%]">
      <div className="flex flex-col gap-3">
        <label className="input-label">Todo list title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your todo title"
          className="text-sm text-slate-700 outline-none border-[1px] border-black px-4 p-4 rounded-md"
        />
      </div>
      <div className="flex flex-col gap-3">
        <label className="input-label">Todo list content</label>
        <textarea
          type="text"
          value={content}
          rows={6}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your todo content"
          className="resize-none text-sm text-slate-700 outline-none border-[1px] border-black px-4 p-4 rounded-md"
        ></textarea>
      </div>
      <div className="mt-2">
        <label className="input-label">Tags</label>
        <InputTags tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button className="btn mt-5 p-3" onClick={handleAddNote}>
        {type === "Add" ? "Add Todo" : "Edit Todo"}
      </button>
    </div>
  );
};

export default AddEditTodo;
