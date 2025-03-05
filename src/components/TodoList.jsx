import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Button, Form, ListGroup, Container, Row, Col } from "react-bootstrap";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const taskList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTasks(taskList);
  };

  const addTask = async () => {
    if (newTask.trim() === "") return;
    await addDoc(collection(db, "tasks"), { text: newTask, completed: false });
    setNewTask("");
    fetchTasks();
  };

  const toggleComplete = async (id, completed) => {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, { completed: !completed });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    fetchTasks();
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8} className="mx-auto">
          <h2 className="text-center">Todo List</h2>
          <Form className="d-flex">
            <Form.Control
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter a new task"
            />
            <Button variant="primary" onClick={addTask} className="ms-2">
              Add Task
            </Button>
          </Form>
          <ListGroup className="mt-3">
            {tasks.map((task) => (
              <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
                <Form.Check
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id, task.completed)}
                  label={task.text}
                  className={task.completed ? "text-decoration-line-through" : ""}
                />
                <Button variant="danger" size="sm" onClick={() => deleteTask(task.id)}>
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoList;
