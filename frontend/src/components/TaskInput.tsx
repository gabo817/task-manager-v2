import "../assets/styles/TaskInput.css";
import { useState } from "react";

type TaskInputProps = {
  onAddTask: (text: string) => void;
};

function TaskInput(props: TaskInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return;
    props.onAddTask(text);
    setText("");
  };

  return (
    <form className="premium-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="standalone-input"
          placeholder="¿Cuál es la siguiente tarea?"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <span className="input-highlight-line"></span>
      </div>
      
      <div className="action-row">
        <button type="submit" className={`standalone-btn ${text.trim() ? "has-content" : ""}`}>
          <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Añadir tarea</span>
        </button>
      </div>
    </form>
  );
}

export default TaskInput;