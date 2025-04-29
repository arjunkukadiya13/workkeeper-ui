import React, { useState, useRef, useEffect } from "react";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete project documentation", completed: false },
    { id: 2, text: "Review pull requests", completed: false },
    { id: 3, text: "Attend team meeting", completed: false },
  ]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [selectedTask, setSelectedTask] = useState(null);

  const menuRef = useRef(null);

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    setMenuOpen(false);
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    setMenuOpen(false);
  };

  // Edit a task
  const editTask = (id) => {
    const newText = prompt("Edit task:");
    if (newText) {
      setTasks(tasks.map(task => (task.id === id ? { ...task, text: newText } : task)));
    }
    setMenuOpen(false);
  };

  // Open menu near the three-dot button
  const handleMenuOpen = (event, task) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ top: buttonRect.bottom + 5, left: buttonRect.left });
    setSelectedTask(task);
    setMenuOpen(true);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Add new task
  const addTask = () => {
    const newTaskText = prompt("Enter new task:");
    if (newTaskText) {
      const newTask = { id: tasks.length + 1, text: newTaskText, completed: false };
      setTasks([...tasks, newTask]);
    }
  };

  return (
    <div className="task-list">
        <h3>Today's Task</h3>
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <span className={task.completed ? "completed" : ""}>{task.text}</span>

          {/* Three-dot menu button */}
          <button className="menu-btn" onClick={(event) => handleMenuOpen(event, task)}>⋮</button>
        </div>
      ))}

      {/* Context Menu */}
      {menuOpen && selectedTask && (
        <div ref={menuRef} className="task-menu" style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}>
          <button onClick={() => toggleTask(selectedTask.id)}>✔ Mark Complete</button>
          <button onClick={() => editTask(selectedTask.id)}>✏ Edit</button>
          <button onClick={() => deleteTask(selectedTask.id)}>🗑 Delete</button>
        </div>
      )}

      {/* Add Task Section */}
      <div className="add-task-container">
        <span className="add-task-text">Add New Task</span>
        <button className="add-task-btn" onClick={addTask}>+</button>
      </div>
    </div>
  );
};

export default TaskList;
