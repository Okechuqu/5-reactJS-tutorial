import { FaEdit, FaTrash } from "react-icons/fa";

export default function TodoCard(props) {
  const { children, deleteTodo, index, editTodo } = props;
  return (
    <li className="todoItem">
      {children}
      <div className="actionsContainer">
        <button onClick={() =>{
          editTodo(index)
        }}>
          <FaEdit />
        </button>
        <button onClick={()=>{
          deleteTodo(index)
        }}>
          <FaTrash />
        </button>
      </div>
    </li>
  );
}
