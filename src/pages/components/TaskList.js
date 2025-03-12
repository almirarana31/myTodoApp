import React from "react";
import "./TaskList.css";

const TaskList = ({ tasks, onDelete, onToggleComplete, onEdit }) => {
  // Sort tasks: completed tasks at the bottom
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <div className="task-list-container mx-auto">
      {sortedTasks.length === 0 ? (
        <div className="empty-task-message">
          <p>No tasks yet. Add a task to get started!</p>
        </div>
      ) : (
        sortedTasks.map((task) => (
          <div 
            key={task.id} 
            className={`task-card ${task.completed ? "completed-task" : ""}`}
          >
            <div className="task-content">
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-3"
                  checked={task.completed}
                  onChange={() => onToggleComplete(task.id, task.completed)}
                />
                <div>
                  <h5 className={`task-title ${task.completed ? "text-muted text-decoration-line-through" : ""}`}>
                    {task.title}
                  </h5>
                  <p className="task-description">{task.description}</p>
                  <small className="task-date">
                    {task.timestamp ? new Date(task.timestamp).toLocaleString() : new Date().toLocaleString()}
                  </small>
                </div>
              </div>
              <div className="task-buttons">
                <button 
                  className="edit-btn" 
                  onClick={() => onEdit(task)}
                  disabled={task.completed}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn" 
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;