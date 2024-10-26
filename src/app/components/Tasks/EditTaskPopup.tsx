import React, { useState } from "react";

interface Task {
  taskId: number;
  description: string;
  dueDate: string;
  status: string;
}

interface EditTaskPopupProps {
  department: string;
  employeeId: number;
  task: Task;
  onEditTask: (
    department: string,
    employeeId: number,
    updatedTask: Task
  ) => void;
  onClose: () => void;
}

const EditTaskPopup: React.FC<EditTaskPopupProps> = ({
  department,
  employeeId,
  task,
  onEditTask,
  onClose,
}) => {
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask: Task = {
      ...task,
      description,
      dueDate,
      status,
    };
    onEditTask(department, employeeId, updatedTask);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="p-2 bg-orange-600 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskPopup;
