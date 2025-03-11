import React, { useState, useEffect } from "react";
import { collection, addDoc, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "../styles/HomeStyles.css"; // Import styles

Modal.setAppElement("#root"); // Required for accessibility

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let taskList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskList);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      await addDoc(collection(db, "tasks"), {
        title: newTaskTitle,
        description: newTaskDescription,
        completed: false,
        timestamp: new Date(),
      });
      setNewTaskTitle("");
      setNewTaskDescription("");
      setModalOpen(false);
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const toggleComplete = async (taskId, completed) => {
    try {
      await updateDoc(doc(db, "tasks", taskId), { completed: !completed });
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout Failed:", error.message);
    }
  };

  return (
    <div className="home-container">
      <h1>Your Tasks</h1>

      <button className="open-modal-button" onClick={() => setModalOpen(true)}>+ Add Task</button>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Add a New Task</h2>
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Task Title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Task Description"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
          <div className="modal-buttons">
            <button type="submit">Add Task</button>
            <button type="button" className="cancel-button" onClick={() => setModalOpen(false)}>Cancel</button>
          </div>
        </form>
      </Modal>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
            <span onClick={() => toggleComplete(task.id, task.completed)}>
              {task.completed ? "✅" : "⬜"} {task.title}
            </span>
            <button className="delete-button" onClick={() => handleDeleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>

      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
