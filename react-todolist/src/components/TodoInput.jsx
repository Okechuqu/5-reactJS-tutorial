
const TodoInput = (props) => {
    const {addTodos, todoValue, setTodoValue} = props

  return (
    <header>
      <input value={todoValue} onChange={(e)=>{
        setTodoValue(e.target.value)
      }} type="text" placeholder="Add a new todo..." />
      <button onClick={()=>{
        addTodos(todoValue)
        setTodoValue('')
      }}>Add</button>
    </header>
  );
};

export default TodoInput;
