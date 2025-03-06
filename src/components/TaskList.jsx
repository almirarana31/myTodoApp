import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let taskList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 🔹 Sort: Incomplete tasks first, completed tasks last
      taskList.sort((a, b) => a.completed - b.completed);

      setTasks(taskList);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Toggle Task Completion
  const toggleComplete = async (taskId, currentStatus) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, { completed: !currentStatus });
    } catch (error) {
      console.error("Error updating task status: ", error);
    }
  };

  // ✅ Update Task
  const handleUpdate = async (taskId) => {
    if (!editedTitle.trim()) return;

    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, {
        title: editedTitle,
        description: editedDescription,
      });

      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  // ✅ Delete Task
  const handleDelete = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  return (
    <div>
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            layout
            transition={{ duration: 0.3 }}
            className={`card mb-2 p-3 shadow-sm ${task.completed ? "bg-light text-muted" : ""}`}
          >
            <div className="d-flex justify-content-between align-items-center">
              {/* ✅ Checkbox */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id, task.completed)}
                className="form-check-input me-2"
              />

              {editingTask === task.id ? (
                // ✏️ Edit Mode
                <div className="w-100">
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  <textarea
                    className="form-control mb-2"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                  <button className="btn btn-success btn-sm me-2" onClick={() => handleUpdate(task.id)}>
                    Save
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setEditingTask(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                // 📌 View Mode
                <div className="w-100">
                  <h5 className={`fw-bold ${task.completed ? "text-decoration-line-through" : ""}`} style={{ color: "#ff1493" }}>
                    {task.title}
                  </h5>
                  <p>{task.description}</p>
                  <small>{new Date(task.timestamp?.seconds * 1000).toLocaleString()}</small>
                  <div className="mt-2 d-flex justify-content-between">
                    <button className="btn btn-warning btn-sm me-2" onClick={() => {
                      setEditingTask(task.id);
                      setEditedTitle(task.title);
                      setEditedDescription(task.description);
                    }}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default TaskList;
