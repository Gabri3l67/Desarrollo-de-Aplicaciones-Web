document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const messageDiv = document.getElementById('message');

    taskForm.addEventListener('submit', addTask);

    function addTask(e) {
        e.preventDefault();

        const taskName = document.getElementById('task-name').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        const taskOwner = document.getElementById('task-owner').value;

        if (new Date(endDate) < new Date(startDate)) {
            alert('La fecha de fin no puede ser menor que la fecha de inicio');
            return;
        }

        const task = {
            name: taskName,
            startDate: startDate,
            endDate: endDate,
            owner: taskOwner,
            resolved: false
        };

        saveTask(task);
        renderTasks();
        taskForm.reset();

        showMessage(`La tarea "${taskName}" ha sido asignada a ${taskOwner}.`, 'success');
    }

    function saveTask(task) {
        let tasks = getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function getTasks() {
        return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    }

    function renderTasks() {
        taskList.innerHTML = '';
        const tasks = getTasks();
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('list-group-item');
            
            // Determinar la clase según el estado de la tarea
            if (task.resolved) {
                taskItem.classList.add('completed-task');
            } else if (new Date(task.endDate) < new Date()) {
                taskItem.classList.add('expired-task');
            } else {
                taskItem.classList.add('pending-task');
            }

            taskItem.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5>${task.name}</h5>
                        <p>Responsable: ${task.owner}</p>
                        <p>Inicio: ${task.startDate}</p>
                        <p>Fin: ${task.endDate}</p>
                    </div>
                    <div class="btn-container">
                        ${!task.resolved && new Date(task.endDate) >= new Date() ? `<button class="btn btn-success btn-sm" onclick="resolveTask(${index})">Resolver</button>` : ''}
                        ${task.resolved ? `<button class="btn btn-secondary btn-sm" onclick="unresolveTask(${index})">Desmarcar</button>` : ''}
                        <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Eliminar</button>
                    </div>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
        applyDarkMode();
    }

    function showMessage(message, type) {
        messageDiv.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
        setTimeout(() => {
            messageDiv.innerHTML = '';
        }, 3000);
    }

    window.resolveTask = (index) => {
        let tasks = getTasks();
        tasks[index].resolved = true;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    window.unresolveTask = (index) => {
        let tasks = getTasks();
        tasks[index].resolved = false;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    window.deleteTask = (index) => {
        let tasks = getTasks();
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    renderTasks();

    function applyDarkMode() {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    // Escuchar cambios en el modo del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyDarkMode);
});
