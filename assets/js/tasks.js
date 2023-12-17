// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");

  // Get existing tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Add the new task
  const newTask = taskInput.value.trim();
  if (newTask !== "") {
    tasks.push({ task: newTask, completed: false });
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

  // Display each task with a checkbox, marked as completed or not, and a removal option
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("me-2");
    checkbox.title = "Mark as completed";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
      tasks[index].completed = this.checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    });

    const taskText = document.createElement("span");
    taskText.textContent = task.task;
    if (task.completed) {
      taskText.style.textDecoration = "line-through";
    }

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-task-btn");
    removeButton.textContent = "❌";
    removeButton.title = "Remove task";
    removeButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(removeButton);
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

// Display tasks on page load
displayTasks();
