import { TaskItemEntity } from '@nx-act-2/models'

export const addTask = (taskName: string, callback: (taskItem: TaskItemEntity) => void) => {
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify({
      title: taskName,
      userId: 10029
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
    .then((response) => response.json())
    .then(callback);
};

export const completeTask = (taskItems: TaskItemEntity[], title: string) => {
  return taskItems.filter((i) => i.title !== title )
};

export const getTasks = (callback: (taskItems: TaskItemEntity[]) => void) => {
  fetch('https://jsonplaceholder.typicode.com/todos?userId=10029')
    .then(r => r.json())
    .then(callback);
}
