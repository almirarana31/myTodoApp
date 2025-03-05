import { useState } from "react";
import TaskList from "./components/TaskList.jsx";
import AddTaskModal from "./components/AddTaskModal.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Todo App</h1>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Add Task
      </button>
      <TaskList />
      {showModal && <AddTaskModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default App;
