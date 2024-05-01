const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let taskIdCounter = 3; // Start the ID counter from the last ID in the default tasks array

let tasks = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Task 1 details',
    completed: false,
    priority: 'low',
    createdAt: new Date().toISOString() // Add createdAt property
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Task 2 explanation',
    completed: false,
    priority: 'medium',
    createdAt: new Date().toISOString() 
  },
  {
    id: 3,
    title: 'Task 3',
    description: 'Task 3 deep dive',
    completed: false,
    priority: 'high',
    createdAt: new Date().toISOString() 
  },
];

app.use(express.json());

function validateTask(task) {
  return task.title && task.description && task.priority && task.completed !== undefined && typeof task.completed === 'boolean'; // Check completed is boolean
}
// get all tasks, "completed" task filter and sort filter through key = "createdAt"
app.get('/tasks', (req, res) => {
  let filteredTasks = tasks;

  if (req.query.completed) {
    filteredTasks = filteredTasks.filter(task => task.completed === (req.query.completed === 'true'));
  }

  if (req.query.sort === 'createdAt') {
    filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  res.json(filteredTasks);
});
// post new task
app.post('/tasks', (req, res) => {
  const { title, description, completed, priority } = req.body;
  if (!validateTask(req.body)) {
    return res.status(400).json({ message: 'Invalid task data' });
  }
  const createdAt = new Date().toISOString();
  const newTask = { id: ++taskIdCounter, title, description, completed, priority, createdAt };
  tasks.push(newTask);
  res.status(201).json(newTask);
});
// update existing task
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (!validateTask(req.body)) {
    return res.status(400).json({ message: 'Invalid task data' });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body, createdAt: tasks[taskIndex].createdAt }; // Preserve createdAt property
  res.json(tasks[taskIndex]);
});
// delete task
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
  
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }
  
    tasks = tasks.filter(task => task.id !== id);
    res.json({ message: 'Task deleted successfully' });
  });
// reset existing tasks
app.delete('/tasks/reset', (req, res) => {
  tasks = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Task 1 details',
      completed: false,
      priority: 'low',
      createdAt: new Date().toISOString() 
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Task 2 explanation',
      completed: false,
      priority: 'medium',
      createdAt: new Date().toISOString() 
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Task 3 deep dive',
      completed: false,
      priority: 'high',
      createdAt: new Date().toISOString()
    },
  ];
  taskIdCounter = 3;
  res.json({ message: 'Tasks reset successfully' });
});
// priority filter
app.get('/tasks/priority/:level', (req, res) => {
  const level = req.params.level;
  const filteredTasks = tasks.filter(task => task.priority === level);
  res.json(filteredTasks);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  

module.exports = app;
