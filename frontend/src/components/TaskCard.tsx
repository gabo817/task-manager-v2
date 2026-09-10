import "../assets/styles/TaskCard.css";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type TaskCardProps = {
  task: Task;
  onDeleteTask: (id: number) => void;
  onToogleTask: (id: number) => void;
};

function TaskCard(props: TaskCardProps) {
  return (
    <li className={`premium-task-card ${props.task.completed ? "is-completed" : ""}`}>
      {/* Contenedor del Checkbox*/}
      <label className="custom-checkbox-container">
        <input
          type="checkbox"
          checked={props.task.completed}
          onChange={() => props.onToogleTask(props.task.id)}
        />
        <span className="checkbox-checkmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
      </label>

      {/* Texto de la tarea */}
      <span className="task-card-text">{props.task.text}</span>

      {/* Botón de eliminación */}
      <button 
        className="delete-task-btn" 
        onClick={() => props.onDeleteTask(props.task.id)}
        title="Eliminar tarea"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    </li>
  );
}

export default TaskCard;