import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import TaskList from "./components/TaskList.jsx";
import AddTaskModal from "./components/AddTaskModal.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <button className="btn btn-primary mb-3 w-100" onClick={() => setShowModal(true)}>
          Add Task
        </button>
        <TaskList />
        {showModal && <AddTaskModal onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
}

export default App;
