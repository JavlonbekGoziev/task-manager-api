const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());

const tasksDataPath = path.join(__dirname, "data", "tasks.json");

const initializeTasksFile = () => {
  if (!fs.existsSync(tasksDataPath)) {
    fs.writeFileSync(tasksDataPath, JSON.stringify([]));
  }
};

const getTasks = () => {
  initializeTasksFile();
  const data = fs.readFileSync(tasksDataPath, "utf-8");
  return JSON.parse(data);
};

const saveTasks = (tasks) => {
  fs.writeFileSync(tasksDataPath, JSON.stringify(tasks, null, 2), "utf-8");
};

app.get("/tasks", (req, res) => {
  const tasks = getTasks();
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
});

app.post("/tasks", (req, res) => {
  const { title, description, status, dueDate } = req.body;

  if (!title || !description || !status || !dueDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newTask = {
    id: Math.random().toString(36).substring(2, 9),
    title,
    description,
    status,
    dueDate,
  };

  const tasks = getTasks();
  tasks.push(newTask);
  saveTasks(tasks);

  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, status, dueDate } = req.body;

  const tasks = getTasks();
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description || tasks[taskIndex].description,
    status: status || tasks[taskIndex].status,
    dueDate: dueDate || tasks[taskIndex].dueDate,
  };

  tasks[taskIndex] = updatedTask;
  saveTasks(tasks);

  res.json(updatedTask);
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const tasks = getTasks();
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  saveTasks(tasks);

  res.status(200).json({ message: "Task deleted successfully" });
});

app.listen(port, () => {
  console.log(`Task Manager API running at http://localhost:${port}`);
});
