const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

document.addEventListener('DOMContentLoaded', loadTasks);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const task = input.value.trim();
  if (task) {
    addTask(task);
    input.value = '';
  }
});

function addTask(taskText) {
  const li = document.createElement('li');
  li.textContent = taskText;

  // Complete toggle
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  // Delete button
  const delBtn = document.createElement('button');
  delBtn.textContent = '🗑';
  delBtn.onclick = () => {
    li.remove();
    saveTasks();
  };
  li.appendChild(delBtn);

  list.appendChild(li);
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  list.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const stored = JSON.parse(localStorage.getItem('tasks')) || [];
  stored.forEach(t => {
    addTask(t.text);
    if (t.completed) {
      list.lastChild.classList.add('completed');
    }
  });
}