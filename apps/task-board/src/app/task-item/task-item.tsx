import './task-item.module.css';

export interface TaskItemProps {
  task: string
  index: number
  onComplete: (index: number) => void
}

export function TaskItem({ index, task, onComplete }: TaskItemProps) {
  return (
    <div className="todo" key={index}>
      <li key={index}> {task} </li>
      <button
        className="delete-button"
        onClick={() => { onComplete(index); }}
      >
        Complete
      </button>
    </div>
  );
}

export default TaskItem;
