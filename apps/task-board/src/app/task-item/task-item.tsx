import './task-item.module.css';

import { TaskItemEntity } from '@nx-act-2/models'

export interface TaskItemProps {
  taskItem: TaskItemEntity
  onComplete: (index: number) => void
}

export function TaskItem({ taskItem, onComplete }: TaskItemProps) {
  const { title, id } = taskItem

  return (
    <div className='todo'>
      <li key={id}> {title} </li>
      <button
        className='delete-button'
        onClick={() => { onComplete(id); }}
      >
        Complete
      </button>
    </div>
  );
}

export default TaskItem;
