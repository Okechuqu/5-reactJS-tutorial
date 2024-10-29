import TodoCard from "./TodoCard";

const TodoList = (props) => {
  const { todos } = props;

  return (
    <ol className="main">
      {todos.map((todo, index) => (
        <TodoCard {...props} key={index} index={index}>
          <p>{todo}</p>
        </TodoCard>
      ))}
    </ol>
  );
};

export default TodoList;
