const express = require('express');
const router = express.Router();

let tasks = [];
let taskId = 1;

// Middleware for basic validation
function validateTask(req, res, next) {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  next();
}

// GET /tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});

// POST /tasks
router.post('/', validateTask, (req, res) => {
  const { title, description } = req.body;
  const newTask = { id: taskId++, title, description };
  tasks.push(newTask);

  res.status(201).json(newTask);
  console.log(tasks);
});

// PUT /tasks/:id
router.put('/:id', validateTask, (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTask = req.body;
  let taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
  res.json(tasks[taskIndex]);
});

// DELETE /tasks/:id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.json({ message: 'Task deleted successfully' });
});

module.exports = router;
