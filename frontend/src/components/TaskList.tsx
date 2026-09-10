import "../assets/styles/TaskList.css";
import EmptyState from "./EmptyState";
import TaskCard from "./TaskCard";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
  onToogleTask: (id: number) => void;
};

function TaskList(props: TaskListProps) {
  if (props.tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="task-list-wrapper">
      <div className="list-meta-header">
        <span className="meta-title">Tus tareas</span>
        <span className="meta-counter">{props.tasks.length}</span>
      </div>

      <ul className="cards-grid-layout">
        {props.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDeleteTask={props.onDeleteTask}
            onToogleTask={props.onToogleTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
