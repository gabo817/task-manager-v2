import { useEffect, useState } from "react";
import Header from "./Header";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import Footer from "./Footer";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type TaskManagerProps = {
  token: string;
  onLogout: () => void;
};

export default function TaskManager({ token, onLogout }: TaskManagerProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const BACKEND_URL = `${API_URL}/tasks`;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(BACKEND_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 401 || response.status === 403) {
          onLogout();
          return;
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    };
    fetchTasks();
  }, [token, onLogout,BACKEND_URL]);

  const addTask = async (text: string) => {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
  };

  const toggleTasks = async (id: number) => {
    const taskFound = tasks.find((task) => task.id === id);
    if (!taskFound) return;

    const response = await fetch(`${BACKEND_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...taskFound, completed: !taskFound.completed }),
    });
    const updatedTask = await response.json();
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`${BACKEND_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Error al eliminar la tarea");
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error("Error en deleteTask:", error);
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="app-viewport">
      <main className="app-container">
        <div className="app-utility-bar">
          <button
            onClick={onLogout}
            className="logout-btn"
            title="Cerrar Sesión"
          >
            <span>Salir</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>

        <Header />
        <TaskInput onAddTask={addTask} />
        <TaskList
          tasks={tasks}
          onDeleteTask={deleteTask}
          onToogleTask={toggleTasks}
        />
        <Footer
          total={tasks.length}
          completed={completedTasks}
          pending={pendingTasks}
        />
      </main>
    </div>
  );
}
