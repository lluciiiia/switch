import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onCheckboxChange: (id: number) => void;
  onAddTodo: (text: string) => void;
  onRemoveTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onCheckboxChange,
  onAddTodo,
  onRemoveTodo,
}) => {
  return (
    <div className="text-center text-sm text-black">
      <div className="w-64 h-full bg-white rounded-md p-2">
        <ul className="w-full">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between mt-2"
            >
              <div>
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 rounded border-gray-300"
                  checked={todo.completed}
                  onChange={() => onCheckboxChange(todo.id)}
                />
                <span>{todo.text}</span>
              </div>
              <button>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="text-red-500"
                  onClick={() => onRemoveTodo(todo.id)}
                />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-2">
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-2 py-1"
            placeholder="Add a new task"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onAddTodo(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoList;
