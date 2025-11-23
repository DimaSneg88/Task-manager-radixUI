export type Task = {
  id: number;
  task: string;
  type: string;
  title: string;
  status: string;
  priority: string;
};

function generateTasks(): string {
  const taskTypes: string[] = ["Documentation", "Bug", "Feature"];
  const statuses: string[] = [
    "In Progress",
    "Backlog",
    "Todo",
    "Canceled",
    "Done",
  ];
  const priorities: string[] = ["Low", "Medium", "High"];

  const tasks: Task[] = [];

  for (let i = 1; i <= 100; i++) {
    const task: Task = {
      id: i,
      task: `TASK-${1000 + i}`,
      type: taskTypes[Math.floor(Math.random() * taskTypes.length)],
      title: `Описание задачи ${i}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
    };
    tasks.push(task);
  }

  return JSON.stringify(tasks, null, 4);
}

export default generateTasks;
