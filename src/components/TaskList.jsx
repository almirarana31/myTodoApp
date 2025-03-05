import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="card mb-2 p-2">
          <h5>{task.title}</h5>
          <p>{task.description}</p>
          <small>{new Date(task.timestamp?.seconds * 1000).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
