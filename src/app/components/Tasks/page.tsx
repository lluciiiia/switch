import React, { useState } from "react";
import { employees } from "../../data/tasksData";
import TaskPopup from "./TaskPopup";
import EditTaskPopup from "./EditTaskPopup";
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

const TaskHandover: React.FC = () => {
  const [employeeData, setEmployeeData] = useState(employees);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [selectedTask, setSelectedTask] = useState<{
    department: string;
    employeeId: number;
    task: Task;
  } | null>(null);

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

  const handleEditTask = (
    department: string,
    employeeId: number,
    updatedTask: Task
  ) => {
    setEmployeeData((prevData) =>
      prevData.map((employee) =>
        employee.id === employeeId && employee.department === department
          ? {
              ...employee,
              tasks: employee.tasks.map((task) =>
                task.taskId === updatedTask.taskId ? updatedTask : task
              ),
            }
          : employee
      )
    );
    setIsEditPopupOpen(false);
  };

  const openPopup = (department: string) => {
    setSelectedDepartment(department);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedDepartment(null);
  };

  const openEditPopup = (
    department: string,
    employeeId: number,
    task: Task
  ) => {
    setSelectedTask({ department, employeeId, task });
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    setSelectedTask(null);
  };

  const departments = employeeData.reduce(
    (acc: { [key: string]: Employee[] }, employee: Employee) => {
      acc[employee.department] = acc[employee.department] || [];
      acc[employee.department].push(employee);
      return acc;
    },
    {}
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
      {Object.keys(departments).map((department) => (
        <div key={department} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center">
            <h2
              className={`text-lg font-semibold ${getDepartmentColor(
                department
              )}`}
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
                    <h3 className="font-semibold text-gray-700">
                      {employee.name}
                    </h3>
                    <p className="text-sm text-gray-500">{employee.role}</p>
                  </div>
                </div>
                <div className="mt-2">
                  {employee.tasks.length > 0 ? (
                    <ul className="space-y-2">
                      {employee.tasks.map((task: Task) => (
                        <li
                          key={task.taskId}
                          className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Task: {task.description}
                            </p>
                            <p className="text-xs text-gray-500">
                              Due: {task.dueDate} | Status:{" "}
                              <span
                                className={`font-semibold ${getStatusColor(
                                  task.status
                                )}`}
                              >
                                {task.status}
                              </span>
                            </p>
                          </div>
                          <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            className="px-2 cursor-pointer"
                            onClick={() =>
                              openEditPopup(department, employee.id, task)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No tasks assigned.</p>
                  )}
                </div>
              </div>
            ))}
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
      {isEditPopupOpen && selectedTask !== null && (
        <EditTaskPopup
          department={selectedTask.department}
          employeeId={selectedTask.employeeId}
          task={selectedTask.task}
          onEditTask={handleEditTask}
          onClose={closeEditPopup}
        />
      )}
    </div>
  );
};

export default TaskHandover;
