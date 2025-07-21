const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Lista de tareas en memoria
let tasks = [];
let nextId = 1;

// GET /tasks - Obtener todas las tareas
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST /tasks - Crear una nueva tarea
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'El título es requerido.' });
    }
    const newTask = { id: nextId++, title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /tasks/:id - Actualizar una tarea
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada.' });
    }
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;
    res.json(task);
});

// DELETE /tasks/:id - Eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada.' });
    }
    tasks.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});