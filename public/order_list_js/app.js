let tasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  taskInput.value = '';

  const task = {
    id: Date.now(),
    text: taskText,
  };

  tasks.push(task);
  updateTaskList();
}

function updateTaskList() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${task.text}</span>
      <button onclick="moveUp(${task.id})" ${tasks.indexOf(task) === 0 ? 'disabled' : ''}>Move Up</button>
      <button onclick="moveDown(${task.id})" ${tasks.indexOf(task) === tasks.length - 1 ? 'disabled' : ''}>Move Down</button>
      <button onclick="removeTask(${task.id})">Remove</button>
    `;
    taskList.appendChild(listItem);
  });
}

function moveUp(id) {
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex > 0) {
    const temp = tasks[taskIndex - 1];
    tasks[taskIndex - 1] = tasks[taskIndex];
    tasks[taskIndex] = temp;
    updateTaskList();
  }
}

function moveDown(id) {
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex < tasks.length - 1) {
    const temp = tasks[taskIndex + 1];
    tasks[taskIndex + 1] = tasks[taskIndex];
    tasks[taskIndex] = temp;
    updateTaskList();
  }
}

function removeTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  updateTaskList();
}

function saveOrder() {
  // You can add code here to save the order of tasks to a database or localStorage.
  // For this example, we'll just log the tasks to the console.
  localStorage.setItem('tasks', JSON.stringify(tasks));
  console.log(tasks);
}


function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
      updateTaskList();
    }
  }
  
  // Load tasks from local storage when the page loads
  window.addEventListener('load', loadTasksFromLocalStorage);