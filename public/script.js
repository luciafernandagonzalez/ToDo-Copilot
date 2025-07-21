async function fetchTasks() {
    const res = await fetch('/tasks');
    const tasks = await res.json();
    renderTasks(tasks);
}

function renderTasks(tasks) {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.title}</span>
            <button onclick="editTask(${task.id}, '${task.title}')">Editar</button>
            <button onclick="toggleComplete(${task.id}, ${!task.completed})">
                ${task.completed ? 'Desmarcar' : 'Completar'}
            </button>
            <button onclick="deleteTask(${task.id})">Eliminar</button>
        `;
        list.appendChild(li);
    });
}

async function addTask(title) {
    await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });
    fetchTasks();
}

// Función para editar tarea
async function editTask(id, oldTitle) {
    const newTitle = prompt('Editar tarea:', oldTitle);
    if (newTitle !== null && newTitle.trim() !== '') {
        await fetch(`/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle })
        });
        fetchTasks();
    }
}

// Función para marcar como completada
async function toggleComplete(id, completed) {
    await fetch(`/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
    });
    fetchTasks();
}

// Función para eliminar tarea
async function deleteTask(id) {
    await fetch(`/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
}

// Llama a fetchTasks al cargar la página
window.onload = fetchTasks;