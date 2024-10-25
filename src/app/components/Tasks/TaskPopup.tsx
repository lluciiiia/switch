import { useState } from "react";

interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  avatar: string;
  tasks: Task[];
}

interface Task {
  taskId: number;
  description: string;
  dueDate: string;
  status: string;
}

interface TaskPopupProps {
  department: string;
  employees: Employee[];
  onAddTask: (department: string, employeeId: number, newTask: Task) => void;
  onClose: () => void;
}

const TaskPopup: React.FC<TaskPopupProps> = ({
  department,
  employees,
  onAddTask,
  onClose,
}) => {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmployeeId === null) return;
    const newTask: Task = {
      taskId: Date.now(),
      description,
      dueDate,
      status,
    };
    onAddTask(department, selectedEmployeeId, newTask);
    setDescription("");
    setDueDate("");
    setStatus("Pending");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <select
            value={selectedEmployeeId || ""}
            onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="" disabled>
              Select Employee
            </option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskPopup;
