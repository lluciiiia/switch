"use client";

import React, { useState, useEffect } from "react";
import { employees } from "../../data/tasksData";
import TaskPopup from "./TaskPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

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

const getDepartmentColor = (department: string): string => {
  switch (department) {
    case "Housekeeping":
      return "text-orange-600";
    case "Security":
      return "text-green-600";
    case "Front Office":
      return "text-yellow-500";
    default:
      return "text-gray-700";
  }
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case "Pending":
      return "text-yellow-500";
    case "In Progress":
      return "text-blue-500";
    case "Completed":
      return "text-green-500";
    default:
      return "text-gray-700";
  }
};

// ReminderForm Component for setting reminders
const ReminderForm: React.FC<{
  task: Task;
  onSave: (taskId: number, reminderTime: string) => void;
  onClose: () => void;
}> = ({ task, onSave, onClose }) => {
  const [reminderTime, setReminderTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(task.taskId, reminderTime);
    onClose();
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Set Reminder for {task.description}</h3>
        <label className="block text-sm font-medium text-gray-700">
          Reminder Time:
          <input
            type="datetime-local"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
            required
          />
        </label>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-3 py-1 rounded-md"
          >
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-md">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const TaskHandover: React.FC = () => {
  const [employeeData, setEmployeeData] = useState(employees);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [reminders, setReminders] = useState<{ [taskId: number]: string }>({});
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [currentTaskForReminder, setCurrentTaskForReminder] = useState<Task | null>(null);
  const [timeOfDay, setTimeOfDay] = useState("Morning");

  const handleAddTask = (
    department: string,
    employeeId: number,
    newTask: Task
  ) => {
    setEmployeeData((prevData) =>
      prevData.map((employee) =>
        employee.id === employeeId && employee.department === department
          ? { ...employee, tasks: [...employee.tasks, newTask] }
          : employee
      )
    );
    setIsPopupOpen(false);
  };

  const startEditingTask = (task: Task) => {
    setEditingTask(task);
    setShowReminderForm(false); // Ensure reminder form is closed when editing
  };

  const handleTaskUpdate = (employeeId: number, department: string) => {
    if (!editingTask) return;

    setEmployeeData((prevData) =>
      prevData.map((employee) =>
        employee.id === employeeId && employee.department === department
          ? {
              ...employee,
              tasks: employee.tasks.map((task) =>
                task.taskId === editingTask.taskId ? editingTask : task
              ),
            }
          : employee
      )
    );
    setEditingTask(null);
    setSelectedTaskId(null);
  };

  const handleDeleteTask = (employeeId: number, department: string, taskId: number) => {
    setEmployeeData((prevData) =>
      prevData.map((employee) =>
        employee.id === employeeId && employee.department === department
          ? { ...employee, tasks: employee.tasks.filter((task) => task.taskId !== taskId) }
          : employee
      )
    );
    setSelectedTaskId(null);
  };

  const openReminderForm = (task: Task) => {
    setCurrentTaskForReminder(task);
    setShowReminderForm(true);
    setEditingTask(null); // Ensure edit mode is turned off when setting reminder
  };

  const saveReminder = (taskId: number, reminderTime: string) => {
    setReminders((prevReminders) => ({
      ...prevReminders,
      [taskId]: reminderTime,
    }));
  };

  const openPopup = (department: string) => {
    setSelectedDepartment(department);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedDepartment(null);
  };

  const departments = employeeData.reduce(
    (acc: { [key: string]: Employee[] }, employee: Employee) => {
      acc[employee.department] = acc[employee.department] || [];
      acc[employee.department].push(employee);
      return acc;
    },
    {}
  );

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      Object.entries(reminders).forEach(([taskId, reminderTime]) => {
        const reminderDate = new Date(reminderTime);
        if (reminderDate <= now) {
          alert(`Reminder: Task ID ${taskId} is due!`);
          setReminders((prevReminders) => {
            const updatedReminders = { ...prevReminders };
            delete updatedReminders[parseInt(taskId)];
            return updatedReminders;
          });
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [reminders]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
      {Object.keys(departments).map((department) => (
        
        <div key={department} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center">
            <h2
              className={`text-lg font-semibold ${getDepartmentColor(department)}`}
            >
              {department}
            </h2>
            <button
              onClick={() => openPopup(department)}
              className="w-8 p-1 bg-blue-500 text-white rounded-full"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <div className="space-y-4 mt-4">
            {departments[department].map((employee: Employee) => (
              <div
                key={employee.id}
                className="bg-gray-100 rounded-lg p-4 flex flex-col h-full"
              >
                <div className="flex items-center space-x-4 mb-2">
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-700">{employee.name}</h3>
                    <p className="text-sm text-gray-500">{employee.role}</p>
                  </div>
                </div>
                <div className="mt-2">
                  {employee.tasks.length > 0 ? (
                    <ul className="space-y-2">
                      {employee.tasks.map((task: Task) => (
                        <li
                          key={task.taskId}
                          className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm relative"
                        >
                          <div>
                            {editingTask && editingTask.taskId === task.taskId ? (
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  value={editingTask.description}
                                  onChange={(e) =>
                                    setEditingTask({ ...editingTask, description: e.target.value })
                                  }
                                  className="w-full p-1 border rounded-md"
                                />
                                <input
                                  type="date"
                                  value={editingTask.dueDate}
                                  onChange={(e) =>
                                    setEditingTask({ ...editingTask, dueDate: e.target.value })
                                  }
                                  className="w-full p-1 border rounded-md"
                                />
                                <select
                                  value={editingTask.status}
                                  onChange={(e) =>
                                    setEditingTask({ ...editingTask, status: e.target.value })
                                  }
                                  className="w-full p-1 border rounded-md"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Completed">Completed</option>
                                </select>
                                <button
                                  onClick={() => handleTaskUpdate(employee.id, department)}
                                  className="w-full mt-2 p-1 bg-green-500 text-white rounded-md"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingTask(null)}
                                  className="w-full mt-1 p-1 bg-red-500 text-white rounded-md"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <>
                                <p className="text-sm font-medium text-gray-700">
                                  Task: {task.description}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Due: {task.dueDate} | Status:{" "}
                                  <span className={`font-semibold ${getStatusColor(task.status)}`}>
                                    {task.status}
                                  </span>
                                </p>
                                {reminders[task.taskId] && (
                                  <p className="text-xs text-blue-500">
                                    Reminder set for: {reminders[task.taskId]}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                          <div className="relative">
                            <FontAwesomeIcon
                              icon={faEllipsisVertical}
                              className="px-2 cursor-pointer"
                              onClick={() =>
                                setSelectedTaskId(selectedTaskId === task.taskId ? null : task.taskId)
                              }
                            />
                            {selectedTaskId === task.taskId && !editingTask && (
                              <div
                                className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50"
                                style={{ position: "absolute", zIndex: 50 }}
                              >
                                <ul className="p-2 space-y-1">
                                  <li>
                                    <button
                                      onClick={() => startEditingTask(task)}
                                      className="w-full text-left text-sm text-gray-700 hover:bg-gray-100 p-2 rounded"
                                    >
                                      Edit
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      onClick={() => handleDeleteTask(employee.id, department, task.taskId)}
                                      className="w-full text-left text-sm text-gray-700 hover:bg-gray-100 p-2 rounded"
                                    >
                                      Delete
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      onClick={() => openReminderForm(task)}
                                      className="w-full text-left text-sm text-gray-700 hover:bg-gray-100 p-2 rounded"
                                    >
                                      Set Reminder
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                          
                        </li>
                      ))}
                    </ul>
                    
                  ) : (
                    <p className="text-sm text-gray-500">No tasks assigned.</p>
                  )}
                </div>
              </div>
            ))}


              {/* Render the dropdown only if the department is "Frontdesk" */}
          {department === "Front Office" && (
            <div>
              <select
                value={timeOfDay}
                onChange={(e) => setTimeOfDay(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Night">Night</option>
              </select>
            </div>
          )}
          </div>
        </div>
      ))}
      {isPopupOpen && selectedDepartment !== null && (
        <TaskPopup
          department={selectedDepartment}
          employees={departments[selectedDepartment]}
          onAddTask={handleAddTask}
          onClose={closePopup}
        />
      )}
      {showReminderForm && currentTaskForReminder && (
        <ReminderForm
          task={currentTaskForReminder}
          onSave={saveReminder}
          onClose={() => setShowReminderForm(false)}
        />
      )}
    </div>
  );
};

export default TaskHandover;
