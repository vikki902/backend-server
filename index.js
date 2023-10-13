const express = require('express');
const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});



// Mount the tasks router
const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
