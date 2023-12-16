// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  // Get existing tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Add the new task
  const newTask = taskInput.value.trim();
  if (newTask !== "") {
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Update the UI
    displayTasks();
  }

  // Clear the input field
  taskInput.value = "";
}

// Function to display tasks on the UI
function displayTasks() {
  const taskList = document.getElementById("taskList");

  // Clear the existing list
  taskList.innerHTML = "";

  // Get tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Display each task with a removal option
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<span>${task}</span><button class="remove-task-btn" onclick="removeTask(${index})">&#10006;</button>`;
    taskList.appendChild(listItem);
  });
}

// Function to remove a task
function removeTask(index) {
  // Get tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Remove the task at the specified index
  tasks.splice(index, 1);

  // Update localStorage with the modified task list
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Call displayTasks on page load
  displayTasks();
}
