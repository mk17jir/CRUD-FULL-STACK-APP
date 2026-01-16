import React, { createContext, useState } from "react";

export const TodoContext = createContext(null);

const TodoContextProvider = ({ children }) => {
  const [AllTodo, setAllTodo] = useState([]); // main todos state

  return (
    <TodoContext.Provider value={{ AllTodo, setAllTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
