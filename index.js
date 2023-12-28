// index.js

const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

// Create
app.post('/todos', async (req, res) => {
  const { title, completed } = req.body;
  const todo = await prisma.todo.create({ data: { title, completed } });
  res.json(todo);
});

// Read all
app.get('/todos', async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

// Read one
app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.findUnique({ where: { id: parseInt(id) } });
  res.json(todo);
});

// Update
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = await prisma.todo.update({
    where: { id: parseInt(id) },
    data: { title, completed },
  });
  res.json(todo);
});

// Delete
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.delete({ where: { id: parseInt(id) } });
  res.json(todo);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
