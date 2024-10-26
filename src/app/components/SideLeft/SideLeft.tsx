import React, { useState } from "react";
import Image from "next/image";
import { initialTodos } from "../../data/todoData";
import ProgressCircle from "../ToDo/ProgressCircle";
import TodoList from "../ToDo/ToDoList";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const SideLeft = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [percent, setPercent] = useState(0);

  const handleCheckboxChange = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    calculatePercent(updatedTodos);
  };

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      text,
      completed: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    calculatePercent(updatedTodos);
  };

  const handleRemoveTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    calculatePercent(updatedTodos);
  };

  const calculatePercent = (todos: Todo[]) => {
    const completedTasks = todos.filter((todo) => todo.completed).length;
    const totalTasks = todos.length;
    const percentCompleted = Math.round((completedTasks / totalTasks) * 100);
    setPercent(percentCompleted);
  };

  return (
    <div className="bg-[#FE856F] p-5 h-full flex flex-col items-center gap-7 text-white">
      <div className="text-center">
        <div>
          <Image src="/images/lyfdesk.png" width={80} height={80} alt="logo" />
        </div>
      </div>
      <div className="text-center">
        <div>
          <Image
            src="/images/profile.png"
            width={75}
            height={75}
            alt="arrow"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <p className="font-bold my-2">Hyejin Kim</p>
        <p className="text-sm">Front Office</p>
      </div>
      <div className="border-b-2 border-white w-full"></div>
      <ProgressCircle percent={percent} />
      <div className="border-b-2 border-white w-full"></div>
      <TodoList
        todos={todos}
        onCheckboxChange={handleCheckboxChange}
        onAddTodo={handleAddTodo}
        onRemoveTodo={handleRemoveTodo}
      />
    </div>
  );
};

export default SideLeft;
