import './app.module.css';

import { useState } from 'react';
import { TaskItemEntity } from '@nx-act-2/models';
import { addTask, completeTask } from '@nx-act-2/task-board/controllers';
import TaskItem from './task-item/task-item';

const App = () => {
  const [taskName, setTaskName] = useState<string>('');
  const [taskItems, setTaskItems] = useState<TaskItemEntity[]>([]);

  const onAddTask = () => {
    addTask(taskName, (updatedTaskItems: TaskItemEntity) => {
      setTaskItems([...taskItems, updatedTaskItems]);
      setTaskName('');
    })
  };

  const onCompleteTask = (title: string) => {
    const updatedTaskItems = completeTask(taskItems, title);

    setTaskItems(updatedTaskItems);
  };

  return (
    <div className='Dashboard'>
      <img src={'/assets/logo.png'} />
      <h1>Today's task</h1>
      <div className='input-wrapper'>
        <input
          type='text'
          name='todo'
          value={taskName}
          placeholder='Write a task'
          onChange={(e) => {
            setTaskName(e.target.value);
          }}
        />
        <button className='add-button' onClick={onAddTask}>
          Add
        </button>
      </div>

      {taskItems?.length > 0 ? (
        <ul className='todo-list'>
          {taskItems.map((taskItem: TaskItemEntity, index: number) => (
            <TaskItem
              taskItem={taskItem}
              onComplete={() => { onCompleteTask(taskItem.title) }}
              key={index}
            />
          ))}
        </ul>
      ) : (
        <div className='empty'>
          <p>No task found</p>
        </div>
      )}
    </div>
  );
};

export default App;
