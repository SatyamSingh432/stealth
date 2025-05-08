import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/TaskManager.css";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Dummy data for testing
    const dummyTasks = [
      {
        id: uuidv4(),
        title: "Sample Task 1",
        description: "This is a test task",
        priority: "Medium",
        status: "incomplete",
        creationDate: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        title: "Completed Task",
        description: "This task is done",
        priority: "High",
        status: "complete",
        creationDate: new Date().toISOString(),
      },
    ];
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || dummyTasks;
    setTasks(storedTasks);
    localStorage.setItem("tasks", JSON.stringify([...storedTasks]));
  }, []);

  const saveTasks = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            status: task.status === "complete" ? "incomplete" : "complete",
          }
        : task
    );
    saveTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    saveTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    return filter === "Completed"
      ? task.status === "complete"
      : task.status === "incomplete";
  });

  return (
    <div className="task-container">
      <h1 className="task-title">Task Manager</h1>

      <div className="task-controls">
        <button onClick={() => setIsModalOpen(true)}>Add Task</button>
      </div>

      <div className="task-filters">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Active")}>Active</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            <div className="task-info">
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>Priority: {task.priority}</p>
              <p className="task-date">
                Created: {new Date(task.creationDate).toLocaleString()}
              </p>
            </div>
            <div className="task-actions">
              <button
                onClick={() => toggleTaskStatus(task.id)}
                className={
                  task.status === "complete" ? "btn-complete" : "btn-incomplete"
                }
              >
                {task.status === "complete"
                  ? "Mark Incomplete"
                  : "Mark Complete"}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
