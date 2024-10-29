import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const persistData = (newList) => {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  };

  const addTodos = (newTodo) => {
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  };

  const deleteTodo = (index) => {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    });

    persistData(newTodoList)
    setTodos(newTodoList);
  };

  const editTodo = (index) => {
    const updateTodo = todos[index];
    // Update the todo in the todos array
    setTodoValue(updateTodo);
    deleteTodo(index);
  };

  useEffect(() => {
    if (!localStorage) {
      return;
    }

    let storedTodo = localStorage.getItem("todos");
    if (!storedTodo) {
      return;
    }
    storedTodo = JSON.parse(storedTodo).todos;
    setTodos(storedTodo);
  }, []);

  return (
    <>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        addTodos={addTodos}
      />
      <TodoList editTodo={editTodo} deleteTodo={deleteTodo} todos={todos} />
    </>
  );
};

export default App;
