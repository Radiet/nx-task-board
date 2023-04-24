import "./app.module.css";
import { useState } from "react";
import TaskItem from "./task-item/task-item";

const Dashboard = () => {
  const [task, setTask] = useState<string>('');
  const [taskItems, setTaskItems] = useState<string[]>([]);

  const addTask = () => {
    setTaskItems([...taskItems, task])
    setTask('');
  };

  const completeTask = (index: number) => {
    const itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  };

  return (
    <div className="Dashboard">
      <h1>Today's task</h1>
      <div className="input-wrapper">
        <input
          type="text"
          name="todo"
          value={task}
          placeholder="Write a task"
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>

      {taskItems?.length > 0 ? (
        <ul className="todo-list">
          {taskItems.map((task: string, index: number) => (
            <TaskItem task={task} index={index} onComplete={completeTask} />
          ))}
        </ul>
      ) : (
        <div className="empty">
          <p>No task found</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
