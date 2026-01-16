import React, { useState, useContext, useEffect } from "react";
import TodoCard from "../cards/TodoCard";
import AddEditTodo from "../cards/addEditTodo";
import { MdAdd, MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { TodoContext } from "../context/TodoContex.jsx";
import AxiosInstance from "../lib/AxiosIntence.js";

const Dashboard = () => {
  const [openModal, setOpenModal] = useState({
    isShow: false,
    type: "Add",
    data: null,
  });

  const { AllTodo, setAllTodo } = useContext(TodoContext);

  // Fetch all todos from backend
  const GetAllTodos = async () => {
    try {
      const response = await AxiosInstance.get("/get-all-todolist");

      if (response.status === 200) {
        const fetchedTodos = response.data.getTodos;

        // ✅ sort pinned todos first
        const sortedTodos = fetchedTodos.sort(
          (firstTodo, secondTodo) => secondTodo.isPinned - firstTodo.isPinned
        );

        setAllTodo(sortedTodos);

        toast.success("Todos fetched successfully!", {
          toastId: "fetch-todos-toast",
        });
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    GetAllTodos();
  }, []);

  // Delete a todo
  const deleteTodo = async (todo) => {
    try {
      await AxiosInstance.delete(`/delete-todolist/${todo._id}`);

      const remainingTodos = AllTodo.filter(
        (existingTodo) => existingTodo._id !== todo._id
      );

      setAllTodo(remainingTodos);

      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Open edit modal
  const editTodo = (todoData) => {
    setOpenModal({
      isShow: true,
      type: "Edit",
      data: todoData,
    });
  };

  return (
    <div className="w-11/12 mx-auto mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AllTodo?.map((todoItem) => (
          <TodoCard
            key={todoItem._id}
            id={todoItem._id}
            title={todoItem.title}
            content={todoItem.content}
            date={todoItem.createdOn}
            tag={todoItem.tags}
            isPinned={todoItem.isPinned}
            onDelete={() => deleteTodo(todoItem)}
            onEdit={() => editTodo(todoItem)}
            onPinToggle={(todoId) => {
              const updatedTodos = AllTodo.map((currentTodo) => {
                if (currentTodo._id === todoId) {
                  return {
                    ...currentTodo,
                    isPinned: !currentTodo.isPinned,
                  };
                }
                return currentTodo;
              });

              // keep pinned todos at the top
              updatedTodos.sort(
                (firstTodo, secondTodo) =>
                  secondTodo.isPinned - firstTodo.isPinned
              );

              setAllTodo(updatedTodos);
            }}
          />
        ))}
      </div>

      {openModal.isShow && (
        <AddEditTodo
          type={openModal.type}
          Data={openModal.data}
          GetAllTodos={GetAllTodos}
          onSuccess={(updatedTodo) => {
            let updatedTodoList;

            if (openModal.type === "Add") {
              updatedTodoList = [updatedTodo, ...AllTodo];
            } else {
              updatedTodoList = AllTodo.map((existingTodo) =>
                existingTodo._id === updatedTodo._id
                  ? updatedTodo
                  : existingTodo
              );
            }

            // keep pinned order after add/edit
            updatedTodoList.sort(
              (firstTodo, secondTodo) =>
                secondTodo.isPinned - firstTodo.isPinned
            );

            setAllTodo(updatedTodoList);
            setOpenModal({ isShow: false, type: "Add", data: null });
          }}
        />
      )}

      <button className="bg-blue-500 w-16 h-16 flex items-center justify-center rounded-lg absolute bottom-2 right-20">
        {openModal.isShow ? (
          <MdClose
            className="cursor-pointer text-2xl font-bold text-white"
            onClick={() =>
              setOpenModal({ isShow: false, type: "Add", data: null })
            }
          />
        ) : (
          <MdAdd
            className="text-2xl font-bold text-white cursor-pointer"
            onClick={() =>
              setOpenModal({ isShow: true, type: "Add", data: null })
            }
          />
        )}
      </button>
    </div>
  );
};

export default Dashboard;
