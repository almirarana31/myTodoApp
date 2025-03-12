import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import AddTaskModal from "./components/AddTaskModal";
import EditTaskModal from "./components/EditTaskModal";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/HomeStyles.css";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksQuery = query(
          collection(db, "tasks"), 
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(tasksQuery);
        
        const tasksData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          
          // Convert Firestore timestamp to JavaScript Date
          return {
            id: doc.id,
            ...data,
            // Check if timestamp exists before converting
            timestamp: data.timestamp ? data.timestamp.toDate() : null
          };
        });
        
        setTasks(tasksData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, []);

  // Add task to Firestore
  const addTask = async (task) => {
    try {
      const taskWithTimestamp = {
        ...task,
        timestamp: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, "tasks"), taskWithTimestamp);
      
      // Use the client timestamp for immediate UI update
      setTasks([
        {
          ...task,
          id: docRef.id
        },
        ...tasks
      ]);
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  // Delete task from Firestore
  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  // Toggle task completion
  const toggleComplete = async (taskId, currentStatus) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, { 
        completed: !currentStatus 
      });
      
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed } 
          : task
      ));
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task status. Please try again.");
    }
  };

  // Update task
  const updateTask = async (updatedTask) => {
    try {
      const taskRef = doc(db, "tasks", updatedTask.id);
      await updateDoc(taskRef, {
        title: updatedTask.title,
        description: updatedTask.description
      });
      
      setTasks(tasks.map(task => 
        task.id === updatedTask.id 
          ? { ...task, ...updatedTask } 
          : task
      ));
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  // Handle edit task
  const handleEditTask = (task) => {
    setCurrentTask(task);
    setEditModalOpen(true);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-light" style={{ backgroundColor: "#ff69b4", padding: "15px" }}>
        <div className="container">
          <span className="navbar-brand mb-0 h1 text-white">
            <img
              src="https://cdn-icons-png.flaticon.com/128/9536/9536870.png"
              alt="Logo"
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
            />
            Ally's To-do App
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container my-4">
        <div className="d-flex justify-content-center">
          <button 
            className="btn btn-primary mb-4 add-task-btn" 
            onClick={() => setAddModalOpen(true)}
          >
            Add Task
          </button>
        </div>
        
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading tasks...</p>
          </div>
        ) : (
          <TaskList 
            tasks={tasks} 
            onDelete={deleteTask} 
            onToggleComplete={toggleComplete}
            onEdit={handleEditTask}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-white py-3 mt-auto" style={{ backgroundColor: "#ff69b4" }}>
        <p className="mb-0">© 2025 Ally's To-do App. All Rights Reserved.</p>
      </footer>

      {/* Modals */}
      <AddTaskModal 
        isOpen={addModalOpen} 
        onClose={() => setAddModalOpen(false)} 
        onAddTask={addTask} 
      />
      
      <EditTaskModal 
        isOpen={editModalOpen} 
        onClose={() => setEditModalOpen(false)} 
        onUpdateTask={updateTask}
        task={currentTask}
      />
    </div>
  );
};

export default HomePage;