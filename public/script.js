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
        li.className = task.status === "Completed" ? 'completed' : '';
        li.innerHTML = `
            <span>
                <strong class="task-title">${task.title}</strong><br>
                ${task.description ? `<span class="field-label">Descripción:</span> <span class="field-value">${task.description}</span><br>` : ''}
                ${task.dueDate ? `<span class="field-label">Fecha límite:</span> <span class="field-value">${task.dueDate}</span><br>` : ''}
                <span class="field-label">Prioridad:</span> <span class="field-value priority-${task.priority}">${task.priority}</span><br>
                <span class="field-label">Estado:</span> <span class="field-value status-${task.status}">${task.status}</span>
            </span>
            <div class="button-group"></div>
        `;
        const buttonGroup = li.querySelector('.button-group');

        // Botón Editar
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.onclick = () => showEditModal(task);

        // Botón Completar/Desmarcar
        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.status === 'Completed' ? 'Desmarcar' : 'Completar';
        completeBtn.onclick = () => toggleComplete(task.id, task.status === 'Completed' ? 'Pending' : 'Completed');

        // Botón Eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.onclick = () => deleteTask(task.id);

        buttonGroup.appendChild(editBtn);
        buttonGroup.appendChild(completeBtn);
        buttonGroup.appendChild(deleteBtn);

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
async function showEditModal(task) {
    editingId = task.id;
    document.getElementById('editTitle').value = task.title;
    document.getElementById('editDescription').value = task.description || '';
    document.getElementById('editDueDate').value = task.dueDate || '';
    document.getElementById('editPriority').value = task.priority || 'Low';
    document.getElementById('editStatus').value = task.status || 'Pending';
    document.getElementById('editModal').style.display = 'flex';
    document.getElementById('editTitle').focus();
}

// Guarda los cambios desde el modal:
document.getElementById('saveEdit').onclick = async function() {
    const title = document.getElementById('editTitle').value;
    const description = document.getElementById('editDescription').value;
    const dueDate = document.getElementById('editDueDate').value;
    const priority = document.getElementById('editPriority').value;
    const status = document.getElementById('editStatus').value;
    await fetch(`/tasks/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, dueDate, priority, status })
    });
    editingId = null;
    document.getElementById('editModal').style.display = 'none';
    fetchTasks();
};

document.getElementById('cancelEdit').onclick = function() {
    editingId = null;
    document.getElementById('editModal').style.display = 'none';
};

// Función para marcar como completada
async function toggleComplete(id, newStatus) {
    await fetch(`/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
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